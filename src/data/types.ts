
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string[];
  description: string;
  tech: string[];

  fullDescription?: string;
  link?: string;
  github?: string;
  youtube?: string;
  deployment?: string;
  year?: string;
  role?: string;
  problem?: string;
  solution?: string;
  scope?: string;
  development?: string;
  developmentDuration?: string;
  galleryImages?: Array<{
    src: string;
    alt: string;
  }>;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  category: string;
  items: string[];
}

// Fix: Added Artist interface to satisfy imports in ArtistCard.tsx
export interface Artist {
  name: string;
  image: string;
  day: string;
  genre: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
