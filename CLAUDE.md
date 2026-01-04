# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GrowthOS is a Next.js 16.1.1 application built with React 19, TypeScript, and Tailwind CSS v4. It uses the App Router pattern and includes a component library based on shadcn/ui with Radix UI primitives.

## Development Commands

```bash
# Development server
pnpm dev        # Start development server on http://localhost:3000

# Build and production
pnpm build      # Build for production
pnpm start      # Start production server

# Code quality
pnpm lint       # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16.1.1 with App Router
- **UI Components**: shadcn/ui with Radix UI primitives (@radix-ui/react-*)
- **Styling**: Tailwind CSS v4 with CSS variables
- **Theming**: next-themes with system/light/dark mode support
- **Icons**: lucide-react
- **Utilities**: clsx, tailwind-merge, class-variance-authority

### Project Structure
- `/src/app/` - Next.js app router pages and layouts
  - `layout.tsx` - Root layout with ThemeProvider, Navbar, and Footer
  - `page.tsx` - Homepage
  - `/builder/`, `/library/`, `/modules/` - Feature pages
- `/src/components/` - Reusable React components
  - `/ui/` - shadcn/ui component library
  - `navbar.tsx`, `footer.tsx`, `theme-toggle.tsx` - App components
- `/src/lib/` - Utility functions and helpers
- `/public/` - Static assets

### Component Patterns
- Uses shadcn/ui components stored in `/src/components/ui/`
- Components use Tailwind CSS classes with `cn()` utility for class merging
- Dark mode support via CSS variables and `next-themes`
- Import aliases configured: `@/components`, `@/lib`, `@/hooks`

### Key Files
- `components.json` - shadcn/ui configuration (New York style, Lucide icons)
- `tailwind.config.ts` - Tailwind v4 configuration with CSS variables
- `src/lib/utils.ts` - Contains `cn()` helper for className merging