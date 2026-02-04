export interface Experience {
  company: string;
  role: string;
  year: string;
  Image: string;
  location: string;
  Description: string;
}

export const experienceData: Experience[] = [
  {
    company: 'Purple Box AI',
    role: 'Frontend Engineer Internship',
    year: 'Nov 2025 — Jan 2026',
    Image: '/purplebox.png',
    location: 'Rome/Italy',
    Description: 'Actively involved in projects leveraging LangChain for AI workflows, TanStack Query for server-state management, and Zustand for scalable client-side state. Also responsible for Shopify and WordPress plugin integrations, ensuring performance and seamless user experience.'
  },
  {
    company: 'Anastasya Bouquet',
    role: 'Founder/Chief Technology Officer (CTO)',
    year: 'Feb 2024 — Aug 2025',
    Image: '/anastasya.jpg',
    location: 'Indonesia',
    Description: 'Founded and scaled an online bouquet business in Malang, serving 200+ customers. Led end-to-end operations as Administrator & CTO, managing order workflows, technical infrastructure, and Instagram-driven digital marketing to boost brand visibility, engagement, and repeat purchases.'
  },
  {
    company: 'Polinema',
    role: 'Entry Level Engineer',
    year: '2023',
    Image: '/polinema.png',
    location: 'Indonesia',
    Description: 'Started as an entry-level engineer, gaining foundational experience in software development and contributing to various projects within the organization.'
  }
];