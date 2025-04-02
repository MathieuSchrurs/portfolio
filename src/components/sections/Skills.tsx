import React from 'react';
import styled from 'styled-components';
import SectionHeading from '../ui/SectionHeading'; // Import the shared component

import {
    FaJsSquare,
    FaHtml5,
    FaCss3Alt,
    FaReact,
    FaNodeJs,
    FaDocker,
    FaGitAlt,
    FaGithub,
    FaDatabase,
    FaServer,
    FaAngular,
    FaFigma,
    FaMicrosoft,
} from 'react-icons/fa';
import {
    SiTypescript,
    SiTailwindcss,
    SiDotnet,
    SiPostgresql,
    SiAmazon,
    SiVite,
    SiBlazor,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

interface Skill {
    name: string;
    Icon: React.ComponentType<any>;
    color?: string;
}

const StyledSkillsSection = styled.section`
  margin: 80px auto;
  max-width: 1000px;
  padding: 40px 0;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px 40px;
  margin-top: 40px;
`;

const SkillCategory = styled.div`
  h3 {
    color: var(--text-primary-color);
    font-family: var(--font-sans);
    font-size: var(--fz-xl);
    margin-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 5px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    color: var(--text-secondary-color);

    li {
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      svg {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
  }
`;


const Skills = () => {
    const skillData: Record<string, Skill[]> = {
        languages: [
            { name: 'C#', Icon: SiDotnet, color: '#512BD4' },
            { name: 'JavaScript', Icon: FaJsSquare, color: '#F7DF1E' },
            { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
            { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
            { name: 'CSS3 / SCSS', Icon: FaCss3Alt, color: '#1572B6' },
        ],
        frontend: [
            { name: 'React', Icon: FaReact, color: '#61DAFB' },
            { name: 'Next.js', Icon: TbBrandNextjs, color: '#000000' },
            { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
            { name: 'Blazor', Icon: SiBlazor, color: '#512BD4' },
            { name: 'Angular', Icon: FaAngular, color: '#DD0031' },
        ],
        backend: [
            { name: '.NET (Core / Framework)', Icon: SiDotnet, color: '#512BD4' },
            { name: 'Node.js', Icon: FaNodeJs, color: '#339933' },
            { name: 'REST APIs', Icon: FaServer },
        ],
        databases: [
            { name: 'SQL Server', Icon: FaDatabase, color: '#CC2927' },
            { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
            { name: 'Entity Framework', Icon: FaDatabase },
        ],
        cloudDevOps: [
            { name: 'Docker', Icon: FaDocker, color: '#2496ED' },
            { name: 'Azure (Basic)', Icon: FaMicrosoft, color: '#0078D4' },
            { name: 'AWS (Basic)', Icon: SiAmazon, color: '#FF9900' },
            { name: 'CI/CD (GitHub Actions)', Icon: FaGithub, color: '#181717' },
        ],
        tools: [
            { name: 'Git / GitHub', Icon: FaGitAlt, color: '#F05032' },
            { name: 'Vite', Icon: SiVite, color: '#646CFF' },
            { name: 'Figma (Basic)', Icon: FaFigma, color: '#F24E1E' },
        ],
    };

    const formatCategoryTitle = (key: string): string => {
        const title = key.replace(/([A-Z])/g, ' $1');
        return title.charAt(0).toUpperCase() + title.slice(1);
    };

    return (
        <StyledSkillsSection id="skills">
            <SectionHeading sectionNumber="3">My Skill Set</SectionHeading>
            <SkillsGrid>
                {Object.entries(skillData).map(([categoryKey, skills]) => (
                    <SkillCategory key={categoryKey}>
                        <h3>{formatCategoryTitle(categoryKey)}</h3>
                        <ul>
                            {skills.map((skill) => (
                                <li key={skill.name}>
                                    <skill.Icon
                                        aria-hidden="true"
                                        color={skill.color}
                                    />
                                    <span>{skill.name}</span>
                                </li>
                            ))}
                        </ul>
                    </SkillCategory>
                ))}
            </SkillsGrid>
        </StyledSkillsSection>
    );
};

export default Skills;