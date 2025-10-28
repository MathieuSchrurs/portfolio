import React from 'react';
import styled from 'styled-components';
import SectionHeading from '../ui/SectionHeading';
import {
  FaJsSquare, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDocker,
  FaGitAlt, FaGithub, FaDatabase, FaServer, FaAngular, FaFigma, FaMicrosoft,
} from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiDotnet, SiPostgresql, SiAmazon, SiVite, SiBlazor,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import ChromeCard from '../ui/ChromeCard';

interface Skill {
  name: string;
  Icon: React.ComponentType<any>;
  color?: string;
}

const StyledSkillsSection = styled.section`
  margin: 0 auto;
  max-width: 1100px;
  padding: 100px 0;
  position: relative;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const CategoryCard = styled(ChromeCard).attrs({
  padding: '2rem 1.75rem',
  radius: '0.5rem',
  popoutOnHover: true,
})``;

const CategoryTitle = styled.h3`
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: var(--fz-sm);
  color: var(--text-primary-color);
  opacity: 0.9;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1.2rem;
`;

const SkillList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SkillItem = styled.li<{ color?: string }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary-color);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  opacity: 0.95;
  transition: opacity 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
    color: ${({ color }) => color || 'var(--text-secondary-color)'};
    opacity: 0.9;
    flex-shrink: 0;
  }

  &:hover { opacity: 1; }
`;

const Skills = () => {
  const skillData: Record<string, Skill[]> = {
    Languages: [
      { name: 'C#', Icon: SiDotnet, color: '#512BD4' },
      { name: 'JavaScript', Icon: FaJsSquare, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'HTML5', Icon: FaHtml5, color: '#E34F26' },
      { name: 'CSS3 / SCSS', Icon: FaCss3Alt, color: '#1572B6' },
    ],
    Frontend: [
      { name: 'React', Icon: FaReact, color: '#61DAFB' },
      { name: 'Next.js', Icon: TbBrandNextjs },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Blazor', Icon: SiBlazor, color: '#512BD4' },
      { name: 'Angular', Icon: FaAngular, color: '#DD0031' },
    ],
    Backend: [
      { name: '.NET (Core / Framework)', Icon: SiDotnet, color: '#512BD4' },
      { name: 'Node.js', Icon: FaNodeJs, color: '#339933' },
      { name: 'REST APIs', Icon: FaServer },
    ],
    Databases: [
      { name: 'SQL Server', Icon: FaDatabase, color: '#CC2927' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'Entity Framework', Icon: FaDatabase },
    ],
    'Cloud / DevOps': [
      { name: 'Docker', Icon: FaDocker, color: '#2496ED' },
      { name: 'Azure', Icon: FaMicrosoft, color: '#0078D4' },
      { name: 'AWS', Icon: SiAmazon, color: '#FF9900' },
      { name: 'CI/CD (GitHub Actions)', Icon: FaGithub, color: '#181717' },
    ],
    Tools: [
      { name: 'Git / GitHub', Icon: FaGitAlt, color: '#F05032' },
      { name: 'Vite', Icon: SiVite, color: '#646CFF' },
      { name: 'Figma', Icon: FaFigma, color: '#F24E1E' },
    ],
  };

  return (
    <StyledSkillsSection id="skills">
      <SectionHeading sectionNumber="3">My Skill Set</SectionHeading>
      <SkillsGrid>
        {Object.entries(skillData).map(([category, skills]) => (
          <CategoryCard key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            <SkillList>
              {skills.map((skill) => (
                <SkillItem key={skill.name} color={skill.color}>
                  <skill.Icon />
                  {skill.name}
                </SkillItem>
              ))}
            </SkillList>
          </CategoryCard>
        ))}
      </SkillsGrid>
    </StyledSkillsSection>
  );
};

export default Skills;
