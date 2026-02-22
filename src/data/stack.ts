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

} from 'react-icons/si';

interface StackItem {
  name: string;
  icon: React.ComponentType<{ className: string }>;
}

export const STACK_DATA: StackItem[] = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React.js', icon: SiReact },
  { name: 'Figma', icon: SiFigma },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Express.js', icon: SiExpress },
  { name: 'Typescript', icon: SiTypescript },
  { name: 'Javascript', icon: SiJavascript },
  { name: 'Laravel', icon: SiLaravel },
];