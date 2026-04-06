import React from 'react';
import { 
  SiNextdotjs, 
  SiReact, 
  SiExpress, 
  SiTailwindcss, 
  SiTypescript,
  SiJavascript,
  SiLaravel,
  SiFigma,
  SiVite,
  SiPostgresql,
  SiPrisma,

} from 'react-icons/si';

interface StackItem {
  name: string;
  icon: React.ComponentType<{ className: string }>;
}

export const STACK_DATA: StackItem[] = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React.js', icon: SiReact },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Express.js', icon: SiExpress },
  { name: 'Typescript', icon: SiTypescript },
  { name: 'Prisma', icon: SiPrisma },
  { name: 'Vite', icon: SiVite },
];