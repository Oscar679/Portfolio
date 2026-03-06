# Oscar Ekberg — Portfolio

Personal portfolio website for Oscar Ekberg, a backend developer & DevOps engineer based in Växjö, Sweden. Built with React and Vite, featuring a dark glassmorphism design with a 3D Spline robot, HUD-style animations, and smooth scroll interactions.

## Live Site

[oscarekberg.com](https://oscarekberg.com)

## Features

- **3D Spline robot** in the hero with interactive mouse tracking
- **Scroll-locked hero** — chat bubbles reveal progressively as you scroll through
- **Floating ambient particles** in the hero (canvas-based, sine-wave pulsing)
- **HUD aesthetic** — corner brackets, glitch effect on name, one-time scan line
- **Text scramble** on section headings (IntersectionObserver triggered)
- **Typewriter** effect on hero subtitle
- **Staggered bubble reveals** — all section content slides in one-by-one on scroll
- **3D card tilt** on project cards (mouse tracking)
- **Click ripple** — water-drop splash effect on every click
- **Dot navigation** (desktop) with hover labels
- **Animated stat counters** with per-item IntersectionObserver
- **Skill tags** with brand icon colors, shimmer hover scan effect
- **Scroll progress bar** with cyan gradient
- **Active nav link** tracking via IntersectionObserver
- **Mobile hamburger menu** with blurred backdrop
- **Copy email to clipboard** with toast notification
- **Haptic feedback** on interactive elements
- **Page load animation**
- Fully responsive — mobile scroll lock skipped, chat bubbles hidden on xs

## Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS v4**
- **@splinetool/react-spline** — 3D robot scene
- **react-icons** — tech stack brand icons
- **framer-motion** (installed, available)

## Getting Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build   # outputs to dist/
```

Deploy to Vercel or Netlify:
- Build command: `npm run build`
- Publish directory: `dist`
