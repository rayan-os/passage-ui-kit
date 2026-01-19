import type { Metadata } from "next"
import { Inter, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/passage/providers"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
})

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ["latin"],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: "Passage UI - Applications",
  description: "Passage admin dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${ibmPlexMono.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
