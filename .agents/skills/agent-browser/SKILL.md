---
name: agent-browser
description: Workflow for using browser automation tools to preview, test, and verify UI components and responsive layouts in real-time.
---

# Agent Browser Automation & UI Testing

Use this workflow to test and inspect the portfolio application in the browser.

## 1. Development Server Verification
1. Verify the Vite dev server is running (default `http://localhost:5173`).
2. Navigate to the local server URL using browser tools.

## 2. Visual & Functional Inspection Checklist
- **Responsive Layout**: Test standard breakpoints (Mobile: 375px, Tablet: 768px, Desktop: 1280px+).
- **Theme Toggling**: Verify light and dark mode classes apply correctly without hydration flicker.
- **Interactive States**: Test button hover, modal trigger clicks, project card expansion, and form submissions.
- **Console Errors**: Check console logs for React key warnings, hydration errors, or unhandled exceptions.
