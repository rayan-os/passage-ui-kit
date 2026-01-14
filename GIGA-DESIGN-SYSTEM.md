# Giga Design System

A dark enterprise UI design system inspired by Palantir/Vercel aesthetics. This document provides detailed CSS properties, colors, and component patterns for building consistent interfaces.

---

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Border Radius](#border-radius)
6. [Shadows & Effects](#shadows--effects)
7. [Component Patterns](#component-patterns)
8. [The UI Window Component](#the-ui-window-component)
9. [Buttons](#buttons)
10. [Badges & Tags](#badges--tags)
11. [Cards](#cards)
12. [Forms](#forms)
13. [Animations](#animations)

---

## Design Tokens

### CSS Variables (Root)

```css
:root {
  /* Background Colors */
  --bg: #0a0a0a;
  --panel: #121212;
  --panel-2: #161616;
  --bg-card: #141414;
  --bg-card-hover: #1a1a1a;
  
  /* Text Colors */
  --text: #ffffff;
  --muted: rgba(255, 255, 255, 0.72);
  --muted-2: rgba(255, 255, 255, 0.55);
  --text-gray: rgba(255, 255, 255, 0.6);
  
  /* Border Colors */
  --border: rgba(255, 255, 255, 0.12);
  --border-2: rgba(255, 255, 255, 0.08);
  --border-subtle: rgba(255, 255, 255, 0.10);
  --border-hover: rgba(255, 255, 255, 0.14);
  
  /* Accent Colors */
  --accent: #c5ccc3;           /* Sage green - primary accent */
  --accent-2: #a8b0a5;         /* Sage green darker */
  --accent-blue: #3b82f6;
  --accent-teal: #14b8a6;
  --accent-orange: #ff6b35;
  --accent-yellow: #fbbf24;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.25);
  
  /* Layout */
  --max-width: 1320px;
  --padding: 40px;
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-medium: 0.3s ease;
  --transition-slow: 0.5s ease;
  
  /* Typography */
  --font-sans: 'Alliance No. 2', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Emilio', Georgia, 'Times New Roman', serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```

---

## Color Palette

### Background Hierarchy

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0a0a0a` | Page background, darkest |
| `--panel` | `#121212` | Card backgrounds, overlays |
| `--panel-2` | `#161616` | Elevated card sections |
| `--bg-card` | `#141414` | Standard card background |
| `--bg-card-hover` | `#1a1a1a` | Card hover state |

### Text Opacity Levels

```css
/* Primary text */
color: #ffffff;                        /* 100% - Headlines, important */

/* Secondary text */
color: rgba(255, 255, 255, 0.9);       /* 90% - Body text */

/* Muted text */
color: rgba(255, 255, 255, 0.72);      /* 72% - Descriptions */

/* Subtle text */
color: rgba(255, 255, 255, 0.55);      /* 55% - Labels, captions */

/* Disabled/placeholder */
color: rgba(255, 255, 255, 0.35);      /* 35% - Disabled states */
```

### Border Opacity Levels

```css
/* Standard border */
border: 1px solid rgba(255, 255, 255, 0.12);

/* Subtle border */
border: 1px solid rgba(255, 255, 255, 0.08);

/* Hover border */
border: 1px solid rgba(255, 255, 255, 0.14);

/* Active/focus border */
border: 1px solid rgba(255, 255, 255, 0.20);
```

### Accent Colors with Opacity

```css
/* Sage green accent - primary brand */
background: rgba(197, 204, 195, 0.12);    /* Subtle bg */
background: rgba(197, 204, 195, 0.16);    /* Badge bg */
border: 1px solid rgba(197, 204, 195, 0.20);
color: rgba(197, 204, 195, 0.95);         /* Text on dark */

/* Blue accent */
background: rgba(59, 130, 246, 0.2);
color: #3b82f6;

/* Teal accent */
color: #14b8a6;

/* Orange accent */
color: #ff6b35;
```

---

## Typography

### Font Stack

```css
/* Sans-serif (UI text) */
font-family: 'Alliance No. 2', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Display (Headlines) */
font-family: 'Emilio', Georgia, 'Times New Roman', serif;

/* Monospace (Code, data) */
font-family: 'IBM Plex Mono', monospace;
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Display XL | `clamp(40px, 7vw, 82px)` | 300 | 1.08 | -0.03em |
| Display L | `clamp(36px, 5vw, 56px)` | 300 | 1.12 | -0.02em |
| Display M | `clamp(34px, 4vw, 54px)` | 300 | 1.12 | -0.02em |
| Heading | `22px - 24px` | 700 | 1.3 | 0.01em |
| Body | `16px` | 400 | 1.6 | 0 |
| Body Small | `14px` | 400-500 | 1.5-1.6 | 0 |
| Caption | `13px` | 400-500 | 1.5 | 0 |
| Label | `11px` | 600-800 | 1.2 | 0.12em - 0.14em |
| Micro | `10px` | 600-700 | 1.2 | 0.05em |

### Label/Badge Typography

```css
/* Uppercase labels */
font-size: 11px;
font-weight: 700;
letter-spacing: 0.12em;
text-transform: uppercase;
color: rgba(255, 255, 255, 0.55);
```

---

## Spacing & Layout

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | `4px` | Tight spacing, tag padding |
| `sm` | `8px` | Icon gaps, small padding |
| `md` | `12px` | Standard gaps |
| `lg` | `16px` | Section padding |
| `xl` | `20px` | Card padding |
| `2xl` | `24px` | Large gaps |
| `3xl` | `32px` | Section margins |
| `4xl` | `40px` | Page padding |

### Container Widths

```css
.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 1024px) {
  .container {
    padding: 0 24px;
  }
}
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `8px` | Tags, small badges |
| `--radius-md` | `12px` | Buttons, inputs |
| `--radius-lg` | `20px` | Cards, modals |
| `--radius-xl` | `24px` | Large cards |
| `--radius-full` | `9999px` | Pills, avatars |

---

## Shadows & Effects

### Box Shadows

```css
/* Large shadow - Cards, modals */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);

/* Medium shadow */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

/* Small shadow */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
```

### Backdrop Blur

```css
/* Glass effect */
background: rgba(18, 18, 18, 0.92);
backdrop-filter: blur(18px);
-webkit-backdrop-filter: blur(18px);

/* Lighter glass */
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);

/* Navbar scrolled */
background: rgba(10, 10, 10, 0.72);
backdrop-filter: blur(18px);
```

### Gradients

```css
/* Subtle card gradient */
background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));

/* Avatar gradient */
background: radial-gradient(circle at 30% 30%, rgba(197, 204, 195, 0.95), rgba(168, 176, 165, 0.35));

/* Page section gradient */
background: linear-gradient(180deg, #070707 0%, #0d0d0d 40%, #0a0a0a 100%);
```

---

## Component Patterns

### Glass Card Pattern

```css
.glass-card {
  background: rgba(18, 18, 18, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  overflow: hidden;
}
```

### Elevated Card Pattern

```css
.elevated-card {
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}
```

### Interactive Card

```css
.interactive-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 28px;
  transition: transform 150ms ease, border-color 150ms ease;
}

.interactive-card:hover {
  transform: translateY(-2px);
  border-color: rgba(197, 204, 195, 0.22);
}
```

---

## The UI Window Component

This is the specific component style from the screenshot - a floating window/modal with header, content sections, and action items.

### Complete UI Window CSS

```css
/* Container */
.ui-window {
  width: min(620px, 100%);
  background: rgba(18, 18, 18, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

/* Header */
.ui-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
}

/* Header avatar */
.ui-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(197, 204, 195, 0.95), rgba(168, 176, 165, 0.35));
}

/* Header badges */
.ui-badge,
.ui-tag {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.72);
}

/* Header action button */
.ui-btn-deploy {
  margin-left: auto;
  padding: 6px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.92);
  color: #0a0a0a;
  font-size: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
}

/* Content area */
.ui-content {
  padding: 18px;
  font-size: 13px;
}

.ui-content h4 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 14px;
  color: #ffffff;
}

/* List items */
.scenario-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
}

.scenario-num {
  color: rgba(255, 255, 255, 0.55);
}

/* User badge (pill with highlight) */
.user-badge {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(197, 204, 195, 0.12);
  border: 1px solid rgba(197, 204, 195, 0.20);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
}

.user-badge .editing {
  color: #c5ccc3;  /* Sage accent */
}

/* Detail/expansion section */
.scenario-detail {
  padding: 10px 0 12px 22px;
  border-left: 1px dashed rgba(255, 255, 255, 0.18);
  margin-left: 5px;
}

/* Label row */
.say-row {
  display: flex;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
}

.say-label {
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  font-size: 11px;
}

.say-text {
  font-style: italic;
}

/* Action row */
.action-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 12px;
}

/* Tags */
.tag {
  padding: 2px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 11px;
}

.tag.blue {
  background: rgba(197, 204, 195, 0.14);
  color: rgba(197, 204, 195, 0.95);
}
```

### HTML Structure

```html
<div class="ui-window">
  <div class="ui-header">
    <div class="ui-avatar"></div>
    <span>Application queue</span>
    <span class="ui-badge">SLA-aware</span>
    <span class="ui-tag">Exceptions</span>
    <button class="ui-btn-deploy">Review</button>
  </div>
  <div class="ui-content">
    <h4>International verification</h4>
    
    <div class="scenario-item">
      <span class="scenario-num">○</span>
      <span>Missing transcript page</span>
      <span class="user-badge">Escalate <span class="editing">Queue</span></span>
    </div>
    
    <div class="scenario-detail">
      <div class="say-row">
        <span class="say-label">Evidence</span>
        <span class="say-text">"Document set incomplete — request missing page."</span>
      </div>
      <div class="action-row">
        <span class="arrow">↳</span>
        <span>Route to</span>
        <span class="tag blue">@human_review</span>
        <span>with</span>
        <span class="tag">audit log entry</span>
      </div>
    </div>
    
    <div class="scenario-item">
      <span class="scenario-num">○</span>
      <span>Name mismatch across documents</span>
    </div>
    
    <div class="scenario-item">
      <span class="scenario-num">○</span>
      <span>Policy override requested</span>
    </div>
  </div>
</div>
```

---

## Buttons

### Primary Button (White)

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: #ffffff;
  color: #0a0a0a;
  border: 1px solid #ffffff;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: opacity 150ms ease, transform 150ms ease;
  white-space: nowrap;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.92;
}

.btn-primary:active {
  transform: translateY(1px);
}
```

### Secondary Button (Ghost)

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 150ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
}
```

### Small Action Button

```css
.btn-action {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.92);
  color: #0a0a0a;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
```

---

## Badges & Tags

### Status Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.72);
}
```

### Announcement Badge (Pill)

```css
.announcement-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px 8px 12px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #ffffff;
}

/* Dot indicator */
.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c5ccc3;
  box-shadow: 0 0 0 3px rgba(197, 204, 195, 0.16);
}
```

### Accent Tag

```css
.tag-accent {
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(197, 204, 195, 0.12);
  border: 1px solid rgba(197, 204, 195, 0.20);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
}

.tag-accent .highlight {
  color: #c5ccc3;
}
```

---

## Cards

### Feature Card

```css
.feature-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 28px;
  transition: transform 150ms ease, border-color 150ms ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  border-color: rgba(197, 204, 195, 0.22);
}
```

### Icon Container

```css
.icon-container {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.25);
  color: #ffffff;
}
```

---

## Forms

### Input Field

```css
.input {
  width: 100%;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 8px;
  color: #ffffff;
  font-size: 13px;
  font-family: inherit;
  transition: border-color 150ms ease;
}

.input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.20);
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}
```

### Form Label

```css
.label {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 8px;
}
```

---

## Animations

### Fade In Up

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
```

### Pulse (for indicators)

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
```

### Hover Lift

```css
.hover-lift {
  transition: transform 150ms ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
```

---

## Quick Reference Cheat Sheet

### Most Used Values

```css
/* Backgrounds */
#0a0a0a          /* Page bg */
#121212          /* Card bg */
rgba(18, 18, 18, 0.92)  /* Glass bg */

/* Borders */
rgba(255, 255, 255, 0.12)  /* Standard */
rgba(255, 255, 255, 0.08)  /* Subtle */
rgba(255, 255, 255, 0.14)  /* Hover */

/* Text */
#ffffff                     /* Primary */
rgba(255, 255, 255, 0.72)  /* Secondary */
rgba(255, 255, 255, 0.55)  /* Muted */

/* Accent */
#c5ccc3                    /* Sage green */
rgba(197, 204, 195, 0.12)  /* Sage bg */

/* Radius */
8px   /* Small */
12px  /* Medium */
20px  /* Large */
9999px /* Full/pill */

/* Blur */
backdrop-filter: blur(18px);
```

---

## Usage Guidelines

1. **Contrast**: Always maintain readable contrast. Use `rgba(255, 255, 255, 0.72)` minimum for body text.

2. **Borders**: Keep borders subtle. `0.12` opacity is the sweet spot for definition without heaviness.

3. **Glass Effects**: Reserve heavy blur (`18px`) for floating/overlay elements. Use `10px` for inline elements.

4. **Accent Sparingly**: Use sage green (`#c5ccc3`) for highlights, not large areas.

5. **Typography**: Use display font (`Emilio`) only for headlines. Sans-serif for everything else.

6. **Spacing**: Maintain generous whitespace. Minimum `16px` padding in cards, `24px+` preferred.

7. **Hover States**: Subtle transforms (`translateY(-2px)`) and border color changes, not dramatic animations.

---

*Generated from the Giga Style Landing Page - Passage AI*
