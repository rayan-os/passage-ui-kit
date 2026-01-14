# Passage UI Template

A modern admin dashboard built with Next.js 15, React 19, Tailwind CSS, and Shadcn UI components.

## Features

- **Sidebar Navigation**: Icon-based navigation with tooltips and active states
- **Process Panel**: Collapsible accordion sections with tabs for organizing workflows
- **Data Table**: Feature-rich table with sorting, filtering, and selection capabilities
- **Dark Mode Ready**: Built with CSS variables for easy theme switching
- **Responsive Design**: Optimized for desktop admin workflows

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4
- **Components**: Shadcn UI (Radix UI primitives)
- **Icons**: Lucide React
- **Table**: @tanstack/react-table

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main applications page
├── components/
│   ├── ui/                  # Shadcn UI components
│   │   ├── accordion.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── checkbox.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── tabs.tsx
│   ├── applications-table.tsx  # Main data table
│   ├── process-panel.tsx       # Left process sidebar
│   └── sidebar-nav.tsx         # Icon navigation sidebar
├── lib/
│   └── utils.ts             # Utility functions
└── public/
    └── images/              # Static images
```

## Customization

### Colors

Edit the CSS variables in `app/globals.css` to customize the color scheme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}
```

### Components

All UI components are in `components/ui/` and can be customized using the `className` prop and Tailwind utilities.

## License

MIT
