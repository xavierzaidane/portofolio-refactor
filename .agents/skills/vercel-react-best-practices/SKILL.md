---
name: vercel-react-best-practices
description: Best practices for React 19, Vite, and component composition patterns for fast rendering and clean code architecture.
---

# React & Vercel Composition Best Practices

Guidelines for high-performance React application development in this repository.

## 1. Component Composition
- **Avoid Prop Drilling**: Use context providers or compound component patterns for deeply nested state.
- **Single Responsibility**: Separate UI display components (`src/components/`) from domain-specific features or views (`src/pages/` or `src/features/`).
- **Co-locate Types & Constants**: Keep component-specific types close to their implementation unless reused across multiple views.

## 2. Rendering & Performance Optimization
- **Lazy Loading**: Use `React.lazy()` and `Suspense` for heavy modal sheets, 3D canvases, or route entry points.
- **Memoization Rules**: Only use `useMemo` and `useCallback` when passing callbacks to memoized children or doing expensive data transforms.
- **Event Handlers**: Keep inline arrow functions minimal within render loops of large lists; pass stable identifiers.

## 3. Clean Code & TypeScript Standards
- Never use `any`. Always create strict types or interfaces.
- Prefer explicit return types for custom hooks.
- Use async/await for asynchronous actions and handle loading / error states explicitly in the UI.
