
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

// Fix: Use correct initialization and direct access to process.env.API_KEY
export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Always use { apiKey: process.env.API_KEY } as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'X-AI', the personal assistant for Xavier, a Senior Full-Stack Engineer.
      
      Xavier's Profile:
      - Location: Global / Remote.
      - Expertise: Full-Stack Architecture, Scalable Systems, Product Design.
      - Key Skills: React, Next.js, Go, Node.js, PostgreSQL, Docker, Cloud-native apps.
      - Projects: Aetherial OS (web-based OS), Vertex Analytics (trading platform), Zenith Commerce (headless commerce).
      
      Tone: Professional, intelligent, concise, slightly futuristic. Use emojis like 🦾, 🌐, ⚛️, ⚡️.
      
      Goal: Help visitors understand Xavier's expertise, his technical philosophy, and how to hire or contact him.
      
      Keep responses under 60 words. Be helpful but confident.`,
    },
  });

  return chatSession;
};

// Fix: Use response.text getter correctly and follow chat guidelines
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    // Use .text property directly, do not call as a function
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    // Graceful fallback for API errors
    return "Signal lost. Xavier is currently focused on deep work.";
  }
};
