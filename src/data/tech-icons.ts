import React from 'react';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiPython,
  SiTensorflow,
  SiSupabase,
  SiClerk,
  SiZod,
  SiVite,
  SiRadixui,
  SiShopify,
  SiWordpress,
  SiOpenai,
  SiQuarkus,
  SiLivewire,
  SiCanva,
  SiFigma,
  SiLangchain,
} from 'react-icons/si';
import { 
  TbBrandRadixUi,
  TbApi,
  TbBrandTailwind,
  TbWorldWww,
  TbDatabase,
  TbTool,
  TbBrandCpp,
} from 'react-icons/tb';

interface TechIcon {
  name: string;
  icon: React.ComponentType<{ className: string }>;
}

const TECH_ICONS: { [key: string]: React.ComponentType<{ className: string }> } = {
  // Frontend Frameworks
  'Next.js': SiNextdotjs,
  'Next.js (App Router)': SiNextdotjs,
  'React': SiReact,
  'React 19': SiReact,
  'Vite': SiVite,
  
  // Language & Type
  'TypeScript': SiTypescript,
  'Python': SiPython,
  'PHP': SiPhp,
  'JavaScript': TbTool,
  'Java': TbBrandCpp,
  'HTML': TbWorldWww,
  'CSS': TbBrandTailwind,
  
  // Styling
  'Tailwind CSS': SiTailwindcss,
  'TailwindCSS': SiTailwindcss,
  
  // UI Libraries
  'shadcn/ui': TbBrandRadixUi,
  'Radix UI': SiRadixui,
  
  // Database
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'Supabase': SiSupabase,
  
  // Backend
  'Express.js': SiExpress,
  'Node.js': SiNodedotjs,
  'Laravel': SiLaravel,
  'Quarkus': SiQuarkus,
  'FastAPI': TbApi,
  
  // Other
  'LangChain': SiLangchain,
  'TensorFlow': SiTensorflow,
  'Clerk': SiClerk,
  'Zod': SiZod,
  'Shopify': SiShopify,
  'WordPress': SiWordpress,
  'OpenAI': SiOpenai,
  'lucide-react': TbTool,
  'motion': TbTool,
  'TanStack Form': TbApi,
  'TanStack Table': TbDatabase,
  'TanStack Query': TbApi,
  'Convex HTTP actions': TbDatabase,
  'Convex': TbDatabase,
  'Ollama': TbTool,
  'Liquid': TbTool,
  'WooCommerce': TbWorldWww,
  'Livewire': SiLivewire,
  'PrismaORM': TbDatabase,
  'JWT': TbApi,
  'Figma': SiFigma,
  'Canva': SiCanva,
  'Vapi': TbTool,
};

export function getTechIcon(techName: string): React.ComponentType<{ className: string }> | null {
  return TECH_ICONS[techName] || null;
}

export function getTechIcons(techStack: string[], limit: number = 8): TechIcon[] {
  return techStack
    .slice(0, limit)
    .map((tech) => ({
      name: tech,
      icon: getTechIcon(tech),
    }))
    .filter((item): item is TechIcon => item.icon !== null);
}

export default TECH_ICONS;
