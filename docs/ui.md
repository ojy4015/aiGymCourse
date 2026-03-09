# UI Coding Standards

## Component Library

**ALL UI components must use [shadcn/ui](https://ui.shadcn.com/) exclusively.**

- Do **NOT** create custom components
- Do **NOT** use any other component library (MUI, Chakra, Radix directly, etc.)
- Every UI element — buttons, inputs, dialogs, cards, tables, badges, etc. — must come from shadcn/ui
- If a shadcn/ui component does not exist for a use case, compose using existing shadcn/ui primitives only

### Adding Components

Install shadcn/ui components via the CLI:

```bash
npx shadcn@latest add <component-name>
```

Components are added to `src/components/ui/`. Do not modify these generated files.

---

## Date Formatting

Use **[date-fns](https://date-fns.org/)** for all date formatting. No other date library should be used.

### Required Format

Dates must be displayed with an ordinal day suffix, abbreviated month, and 4-digit year:

```
1st Sep 2025
2nd Aug 2025
3rd Jan 2026
4th Jun 2024
```

### Implementation

```ts
import { format } from "date-fns";

function formatDate(date: Date): string {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${day}${suffix} ${format(date, "MMM yyyy")}`;
}
```

Usage:

```ts
formatDate(new Date("2025-09-01")); // "1st Sep 2025"
formatDate(new Date("2025-08-02")); // "2nd Aug 2025"
formatDate(new Date("2026-01-03")); // "3rd Jan 2026"
formatDate(new Date("2024-06-04")); // "4th Jun 2024"
```

Place this utility in `src/lib/format-date.ts` and import from there throughout the project.
