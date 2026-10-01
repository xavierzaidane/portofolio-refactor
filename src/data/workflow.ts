import React from 'react';
import type { IconName } from 'tech-stack-icons';
import {
  SiJetbrains,
  SiGooglecloud,
  SiLaragon,
  SiXampp,
  SiFastapi,
  SiReddit,
} from 'react-icons/si';
import { Globe, Route } from 'lucide-react';

export interface WorkflowItem {
  name: string;
  stackIcon?: IconName;
  icon?: React.ComponentType<{ className: string }>;
}

export interface WorkflowData {
  [key: string]: WorkflowItem[];
}

const WORKFLOW_DATA: WorkflowData = {
  development: [
    { name: 'VSCode', stackIcon: 'vscode' },
        { name: 'Antigravity', stackIcon: 'antigravity' },
    { name: 'GitHub', stackIcon: 'github' },
    { name: 'Git', stackIcon: 'git' },
    { name: 'Docker', stackIcon: 'docker' },
    { name: 'Cloudflare', stackIcon: 'cloudflare' },
    { name: 'Vercel', stackIcon: 'vercel' },
    { name: 'Supabase', stackIcon: 'supabase' },
    { name: 'Jetbrains', icon: SiJetbrains },
    { name: 'Google Cloud', stackIcon: 'gcloud' },
    { name: 'ngrok', stackIcon: 'ngrok' },
    { name: 'FastAPI', icon: SiFastapi },
    { name: 'LangChain', stackIcon: 'langchain' },
    { name: 'powershell', stackIcon: 'powershell' },
    { name: 'Laragon', icon: SiLaragon },

    
    { name: 'XAMPP', icon: SiXampp },
    { name: 'Github Copilot', stackIcon: 'copilotgithub' },
    { name: 'n8n', stackIcon: 'n8n' },
    { name: 'huggingface', stackIcon: 'huggingface' },
    { name: 'Sentry', stackIcon: 'sentry' },
  ],
  design: [
    { name: 'Figma', stackIcon: 'figma' },
    { name: 'Canva', stackIcon: 'canva' },
    { name: 'Google Stich', stackIcon: 'google' },
  ],
  productivity: [
    { name: 'Notion', stackIcon: 'notion' },
    { name: 'Gemini', stackIcon: 'gemini' },
    { name: 'ChatGPT', stackIcon: 'openai' },
    { name: 'Claude', stackIcon: 'claude' },
    { name: 'ClickUp', stackIcon: 'clickup' },
    { name: 'reddit', icon: SiReddit },
  ],
  testing: [
    { name: 'Postman', stackIcon: 'postman' },
    { name: 'Cypress', stackIcon: 'cypress' },
    { name: 'Playwright', stackIcon: 'playwright' },
  ],
};

export default WORKFLOW_DATA;
