import type { JourneyItem } from '@/components/ui/timeline';

export interface Experience {
  company: string;
  role: string;
  year: string;
}

export const experienceData: Experience[] = [
  {
    company: 'Bamboo Tech',
    role: 'Software Engineer Intern',
    year: 'Jun 2026 — Jul 2026',
  },
  {
    company: 'Purple Box AI',
    role: 'Frontend Developer Internship',
    year: 'Nov 2025 — Jan 2026',
  },
  {
    company: 'Anastasya',
    role: 'Full-Stack Developer ',
    year: 'Feb 2024 - Jul 2025',
  },
  {
    company: 'Polinema | SAU',
    role: 'CompSci Student',
    year: 'Aug 2023 - Now',
  },
];

export const experienceJourneyTop: JourneyItem[] = [
  {
    id: '2023-august',
    year: '2023',
    month: 'August',
    content: 'Polinema | SAU — CompSci Student focused on modern software engineering and systems architecture.',
  },
  {
    id: '2025-november',
    year: '2025',
    month: 'November',
    content: 'Purple Box AI — Frontend Developer Internship building AI-driven web apps and modern user interfaces.',
  },
];

export const experienceJourneyBottom: JourneyItem[] = [
  {
    id: '2024-february',
    year: '2024',
    month: 'February',
    content: 'Anastasya — Full-Stack Developer engineering scalable web applications, REST APIs, and digital platforms.',
  },
  {
    id: '2026-june',
    year: '2026',
    month: 'June',
    content: 'Bamboo Tech — Software Engineer Intern contributing to high-performance services and software solutions.',
  },
];