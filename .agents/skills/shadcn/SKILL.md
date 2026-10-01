---
name: shadcn
description: Guidelines and workflows for installing, customizing, and structuring shadcn/ui and Radix UI components with Tailwind CSS in this project.
---

# shadcn/ui Guidelines & Workflows

This skill provides best practices for managing and adding shadcn/ui components in this Vite + React 19 + Tailwind CSS setup.

## 1. Component Architecture
- Components are located in `src/components/ui/`.
- Use `cn()` from `src/lib/utils.ts` (combining `clsx` and `tailwind-merge`) for conditional class concatenation.
- Always use accessible primitives from `@radix-ui/*`.

## 2. Component Design Principles
- **Composition over duplication**: Prefer wrapping existing primitives (`Dialog`, `ScrollArea`, `Slot`) rather than writing raw DOM overlays.
- **Variant Pattern**: Use `class-variance-authority` (cva) for button states, card styles, and badge variants.
- **Theme Awareness**: Use CSS variables with semantic Tailwind classes (`bg-background`, `text-foreground`, `border-border`) to ensure dark/light mode compatibility via `next-themes`.

## 3. Adding New UI Components
When creating or generating new components:
1. Keep the primitive in `src/components/ui/<component-name>.tsx`.
2. Export both the named component and any subcomponents (e.g., `DialogTrigger`, `DialogContent`).
3. Ensure TypeScript interfaces extend `React.HTMLAttributes<HTMLDivElement>` or the relevant Radix primitive props.
