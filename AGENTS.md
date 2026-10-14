# Project Agent Guidelines: Portfolio Refactor

Project-specific guidelines, discovered build/test commands, architecture conventions, and agent delegation rules for `xavier-portofolio/portofolio-refactor`.

> **Rule Precedence**: The project rules below override any conflicting global directives. For universal standards not specified here, refer to the machine's global baseline rules (`~/.gemini/GEMINI.md` / `~/.agents/rules/universal-rules.md`).

---

## 1. Discovered Commands & Quality Gates

Run commands directly via terminal; do not guess syntax:
- **Typecheck**: `npm run typecheck` (`tsc --noEmit`)
- **Unit & Component Tests**: `npm test` (`jest`) / `npm test -- --passWithNoTests`
- **Production Build**: `npm run build` (`vite build`)
- **Dev Server**: `npm run dev` (`vite`)

Before marking any functional code changes complete, both `npm run typecheck` and `npm test` must pass with zero errors.

---

## 2. Technology Stack & Architecture Conventions

- **Core Framework**: React 19 (`react`, `react-dom`), TypeScript (`~5.8.2`), Vite (`^6.2.0`).
- **Styling & UI**: Tailwind CSS v4 (`@tailwindcss/vite`), Radix UI primitives (`@radix-ui/*`), shadcn/ui component patterns, Lucide / Tabler icons.
- **Animations & Motion**: Framer Motion (`framer-motion`, `motion`), GSAP (`gsap` ScrollTrigger), Lenis smooth scroll (`lenis`).
- **AI Integrations**: Google GenAI SDK (`@google/genai`).
- **Code Style**:
  - Maintain clean component modularity (single-responsibility components).
  - Enforce strict TypeScript types (no unjustified `any`, strict null checks).
  - Preserve all existing code comments and docstrings.
  - No unapproved external dependencies (keep bundle lean).

---

## 3. Core Specialized Agents & Subagents

Defined under [`.antigravity/manifest.json`](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/manifest.json):

1. **`plan`** ([manifest](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/plan.json) | [instructions](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/plan.md))
   - **Role**: Read-only architect (`mode: sandbox`).
   - **Task**: Executes design-tree grilling, ingests codebase and requirements, outputs implementation plans for explicit user approval before writing code.
2. **`build`** ([manifest](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/build.json) | [instructions](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/build.md))
   - **Role**: TDD implementer (`mode: auto`).
   - **Task**: Implements narrow vertical slices at interface seams. Enforces Red-Green TDD, invoking `advisor` and `tester` subagents before completion.
3. **`surgical`** ([manifest](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/surgical.json) | [instructions](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/surgical.md))
   - **Role**: Minimal-diff bug fixer (`mode: sandbox`).
   - **Task**: Diagnoses root causes and applies fixes using the smallest possible diff under the Circuit Breaker cap (~10%). No opportunistic refactoring.
4. **`advisor`** ([manifest](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/advisor.json) | [instructions](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/advisor.md))
   - **Role**: Two-axis code reviewer (`mode: subagent-only`, sandbox).
   - **Task**: Reviews changes along Spec Compliance & Standards Compliance. Outputs structured severity ratings (`P1`, `P2`, `P3`) with exact line references (`file#L<line>`).
5. **`tester`** ([manifest](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/tester.json) | [instructions](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/tester.md))
   - **Role**: Automated test runner & regression verifier (`mode: auto`, subagent-only; `file_write: false`).
   - **Task**: Executes test commands (`npm test`, `npm run typecheck`, `npm run build`), reporting raw exit codes and telemetry without fabrication. Forbidden from editing source code.
6. **`hunter`** ([manifest](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/hunter.json) | [instructions](file:///home/xavierzaidane/projects/xavier-portofolio/portofolio-refactor/.antigravity/agents/hunter.md))
   - **Role**: Whole-codebase static auditor (`mode: subagent-only`, sandbox).
   - **Task**: Sweeps codebase for dead code, unhandled async errors, leaks, and anti-patterns with impact maps.

---

## 4. Git & Branch Safety

- **Protected Branches**: Never commit or push directly to `main` or protected branches.
- **Change Scope**: All changes must be made on discrete feature/fix branches with clean commit history.
