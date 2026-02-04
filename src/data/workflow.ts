import React from 'react';
import {
  SiGoogleanalytics,
  SiGithub,
  SiJetbrains,
  SiDocker,
  SiCloudflare,
  SiVercel,
  SiSupabase,
  SiGooglecloud,
  SiFirebase,
  SiFigma,
  SiCanva,
  SiNotion,
  SiOpenai,
  SiClaude,
  SiPostman,
  SiBiome,
  SiLaragon,
  SiGooglegemini,
  SiClickup,
  SiGithubcopilot,
  SiXampp,
  SiGooglecolab,

} from 'react-icons/si';

import { VscVscode } from "react-icons/vsc";

import { Mail, Globe, Route } from 'lucide-react';

interface WorkflowItem {
  name: string;
  icon: React.ComponentType<{ className: string }>;
}

interface WorkflowData {
  [key: string]: WorkflowItem[];
}

const WORKFLOW_DATA: WorkflowData = {
  development: [
    { name: 'VSCode', icon: VscVscode },
    { name: 'Google Analytics', icon: SiGoogleanalytics },
    { name: 'GitHub', icon: SiGithub },
    { name: 'JetBrains', icon: SiJetbrains },
    { name: 'Docker', icon: SiDocker },
    { name: 'Cloudflare', icon: SiCloudflare },
    { name: 'Vercel', icon: SiVercel },
    { name: 'Supabase', icon: SiSupabase },
    { name: 'Google Cloud Platform', icon: SiGooglecloud },
    { name: 'Firebase', icon: SiFirebase },
    { name: 'Resend', icon: Mail },
    { name: 'Laragon', icon: SiLaragon },
    { name: 'XAMPP', icon: SiXampp },
    { name: 'Github Copilot', icon: SiGithubcopilot },
  ],
  design: [
    { name: 'Figma', icon: SiFigma },
    { name: 'Canva', icon: SiCanva },
    { name: 'Google AI Studio', icon: SiGooglegemini },
  ],
  productivity: [
    { name: 'Notion', icon: SiNotion },
    { name: 'GeminiAI', icon: SiGooglegemini },
    { name: 'OpenAI', icon: SiOpenai },
    { name: 'Claude', icon: SiClaude },
    { name: 'ClickUp', icon: SiClickup },
    { name: 'Google Collab', icon: SiGooglecolab },
  ],
  testing: [
    { name: 'Postman', icon: SiPostman },
    { name: 'Httpie', icon: Globe },
    { name: 'Biome', icon: SiBiome },
    { name: 'OpenRouter', icon: Route },
  ],
};

export default WORKFLOW_DATA;