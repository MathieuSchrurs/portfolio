import React from 'react';
import {
  FaJsSquare, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDocker,
  FaGitAlt, FaGithub, FaDatabase, FaServer, FaAngular, FaFigma, FaMicrosoft,
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiDotnet, SiPostgresql, SiAmazon, SiVite, SiBlazor,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

export interface Skill {
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// The full categorised skill set, rendered as-is by the Skills section grid.
export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'C#', Icon: SiDotnet, color: '#512BD4' },
      { name: 'JavaScript', Icon: FaJsSquare, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
      { name: 'CSS3 / SCSS', Icon: FaCss3Alt, color: '#1572B6' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', Icon: FaReact, color: '#61DAFB' },
      { name: 'Next.js', Icon: TbBrandNextjs },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Blazor', Icon: SiBlazor, color: '#512BD4' },
      { name: 'Angular', Icon: FaAngular, color: '#DD0031' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: '.NET (Core / Framework)', Icon: SiDotnet, color: '#512BD4' },
      { name: 'Node.js', Icon: FaNodeJs, color: '#339933' },
      { name: 'REST APIs', Icon: FaServer },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'SQL Server', Icon: FaDatabase, color: '#CC2927' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'Entity Framework', Icon: FaDatabase },
    ],
  },
  {
    category: 'Cloud / DevOps',
    skills: [
      { name: 'Docker', Icon: FaDocker, color: '#2496ED' },
      { name: 'Azure', Icon: FaMicrosoft, color: '#0078D4' },
      { name: 'AWS', Icon: SiAmazon, color: '#FF9900' },
      { name: 'CI/CD (GitHub Actions)', Icon: FaGithub, color: '#181717' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git / GitHub', Icon: FaGitAlt, color: '#F05032' },
      { name: 'Vite', Icon: SiVite, color: '#646CFF' },
      { name: 'Figma', Icon: FaFigma, color: '#F24E1E' },
    ],
  },
];

// Flat view of every skill, used to look up entries by name (e.g. for the
// curated "Current Tech Stack" subset shown in the About section).
export const skills: Skill[] = skillCategories.flatMap(({ skills }) => skills);
