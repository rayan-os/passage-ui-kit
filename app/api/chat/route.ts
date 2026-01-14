import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Mock streaming for demo (when no API key)
function createMockStream(messages: any[]) {
  const lastMessage = messages[messages.length - 1]
  const userMessage = lastMessage?.content || ""
  
  // Generate contextual response based on user input
  let response = ""
  
  if (userMessage.toLowerCase().includes("program") || userMessage.toLowerCase().includes("course")) {
    response = `I found several programs that might interest you! Here are some top recommendations:

**Computer Science Programs:**
- Computer Programming at Niagara College (2 years, Diploma)
- Computer Science BSc at Vancouver Island University (4 years)
- Bachelor of Computer Science at Seneca Polytechnic (3 years)

Would you like more details about any of these programs? I can help you with admission requirements, tuition fees, or application deadlines.`
  } else if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
    response = `Hello! 👋 I'm Jackie, your AI assistant for finding the perfect educational program.

I can help you with:
- Finding programs that match your interests
- Comparing different schools and options
- Understanding admission requirements
- Application guidance

What are you looking to study?`
  } else if (userMessage.toLowerCase().includes("help")) {
    response = `I'm here to help you find the right educational program! Here's what I can assist with:

1. **Program Search** - Find programs based on your interests and qualifications
2. **School Comparisons** - Compare different institutions
3. **Requirements** - Understand admission criteria
4. **Applications** - Guide you through the process

Just tell me what subjects interest you, and I'll find matching programs!`
  } else {
    response = `Thanks for sharing! Based on what you've told me, I can help you find programs that match your interests.

Could you tell me more about:
- What subjects do you enjoy most?
- What's your highest level of education?
- Do you have a preferred location or study format?

This will help me find the best programs for you!`
  }

  // Create a readable stream that simulates typing
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      // Stream the response character by character with small delays
      const words = response.split(" ")
      for (let i = 0; i < words.length; i++) {
        const word = words[i] + (i < words.length - 1 ? " " : "")
        // Format as SSE data event for AI SDK
        const chunk = `0:${JSON.stringify(word)}\n`
        controller.enqueue(encoder.encode(chunk))
        await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 20))
      }
      // Send finish event
      controller.enqueue(encoder.encode(`e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Check if we have an OpenAI API key
  const hasApiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 0

  if (!hasApiKey) {
    // Return mock streaming response for demo
    return createMockStream(messages)
  }

  // Use real OpenAI streaming
  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: `You are Jackie, a helpful AI assistant for Passage, an educational program finder platform. 
You help students find the right educational programs based on their interests, qualifications, and goals.
Be friendly, concise, and helpful. When recommending programs, include relevant details like duration, school, and program type.
Format your responses with markdown when appropriate for readability.`,
    messages,
  })

  return result.toTextStreamResponse()
}
