# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Documentation First

**Before generating any code, Claude Code MUST first consult the relevant documentation files in the `/docs` directory.** All implementation decisions, component usage, API patterns, and architectural choices must align with what is specified in those docs. If a relevant doc exists for the feature or area being worked on, it takes precedence over general knowledge or assumptions.

- /docs/ui.md
- /docs/data-fetching.md

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (configured via `@tailwindcss/postcss`)
- **Geist** font family (sans + mono) via `next/font/google`

## Architecture

This is a fresh Next.js App Router project. The entry point is `src/app/page.tsx`. Global styles are in `src/app/globals.css`, and the root layout (fonts, metadata) is in `src/app/layout.tsx`.

New routes are added as folders under `src/app/` following Next.js App Router conventions (e.g., `src/app/about/page.tsx`).
