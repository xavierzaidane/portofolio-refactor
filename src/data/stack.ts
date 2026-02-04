import React from 'react';
import { 
  SiNextdotjs, 
  SiReact, 
  SiExpress, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiMongodb,
  SiTypescript,
  SiJavascript,
} from 'react-icons/si';

interface StackItem {
  name: string;
  icon: React.ComponentType<{ className: string }>;
}

export const STACK_DATA: StackItem[] = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React.js', icon: SiReact },
  { name: 'Express.js', icon: SiExpress },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Typescript', icon: SiTypescript },
  { name: 'Javascript', icon: SiJavascript },
  { name: 'MongoDB', icon: SiMongodb },
];