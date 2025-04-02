import React from 'react';
import styled from 'styled-components';
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
  margin: 0 auto;
  max-width: 1000px;
  padding: 100px 0;
`;

const StyledHeading = styled.h2`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0 40px;
  width: 100%;
  font-size: clamp(26px, 5vw, var(--fz-heading));
  color: var(--text-primary-color);
  white-space: nowrap;
  font-family: var(--font-sans);

  &:before {
    position: relative;
    bottom: 4px;
    content: '03.';
    margin-right: 10px;
    color: var(--accent-color);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
    font-weight: 400;

    @media (max-width: 480px) {
      margin-bottom: -3px;
      margin-right: 5px;
    }
  }

  &:after {
    content: '';
    display: block;
    position: relative;
    top: -5px;
    width: 300px;
    height: 1px;
    margin-left: 20px;
    background-color: var(--border-color);

    @media (max-width: 1080px) {
      width: 200px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      margin-left: 10px;
    }
  }
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
            <StyledHeading>My Skill Set</StyledHeading>
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
