---
name: gemini-ai
description: Workflows for implementing and calling the Google GenAI SDK (@google/genai) for portfolio AI features and chat assistants.
---

# Google GenAI Integration Guidelines

This repository includes `@google/genai` for AI features and chat assistants.

## 1. SDK Initialization
- Initialize the Google GenAI client securely:
  ```typescript
  import { GoogleGenAI } from '@google/genai';

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  ```

## 2. Best Practices
- Never hardcode API keys in source files; always read from environment variables (`.env.local`).
- Use streaming responses (`generateContentStream`) for interactive chat UI to minimize perceived latency.
- Handle rate limits (HTTP 429) gracefully with exponential backoff or user-friendly status toasts.
