---
name: portfolio-animations
description: Animation patterns and integration rules for Framer Motion, GSAP, and Lenis smooth scrolling in this portfolio.
---

# Portfolio Animation Guidelines

This repository uses **Framer Motion**, **GSAP**, and **Lenis** for rich interactive UI and smooth scrolling.

## 1. Lenis Smooth Scroll Integration
- Initialize Lenis once at root provider level.
- Ensure Lenis syncs with GSAP ScrollTrigger if ScrollTrigger is used:
  ```typescript
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  ```

## 2. Framer Motion Best Practices
- Use `motion.div` for micro-interactions, page transitions, and hover effects.
- Standard transition curve: `transition={{ type: "spring", stiffness: 300, damping: 30 }}`.
- Use `AnimatePresence` with `mode="wait"` for smooth page route or modal transitions.
- Respect user preferences: check `useReducedMotion()` and bypass layout animations when requested.

## 3. GSAP Timeline Rules
- Clean up animations in React lifecycle hooks:
  ```typescript
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // gsap animations here
    }, containerRef);
    return () => ctx.revert(); // essential to prevent memory leaks in React 19
  }, []);
  ```
