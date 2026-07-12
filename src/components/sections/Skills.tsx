import styled from 'styled-components';
import {
  FaCode,
  FaDesktop,
  FaServer,
  FaDatabase,
  FaCloud,
  FaWrench,
} from 'react-icons/fa';
import type { ComponentType, SVGProps } from 'react';
import SectionHeading from '../ui/SectionHeading';
import FlipCard from '../ui/FlipCard';
import SectionWrapper from '../layout/SectionWrapper';
import { skillCategories } from '../../data/skills';

const StyledSkillsSection = styled(SectionWrapper)`
  max-width: 1100px;
  position: relative;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const SkillList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
`;

const SkillItem = styled.li<{ color?: string }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary-color);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  transition: color 0.3s ease-out;

  svg {
    width: 16px;
    height: 16px;
    color: ${({ color }) => color || 'var(--text-secondary-color)'};
    flex-shrink: 0;
  }

  &:hover {
    color: var(--text-primary-color);
  }
`;

const categoryIcons: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  Languages: FaCode,
  Frontend: FaDesktop,
  Backend: FaServer,
  Databases: FaDatabase,
  'Cloud / DevOps': FaCloud,
  Tools: FaWrench,
};

/* Subtle per-card tilts assigned round-robin so each card feels
   slightly off-kilter without being distracting. */
const cardTilts = [
  'rotate(-0.4deg)',
  'rotate(0.3deg)',
  'rotate(-0.2deg)',
  'rotate(0.5deg)',
  'rotate(-0.3deg)',
  'rotate(0.4deg)',
];

const Skills = () => {
  return (
    <StyledSkillsSection id="skills">
      <SectionHeading sectionNumber="3">My Skill Set</SectionHeading>
      <SkillsGrid>
        {skillCategories.map(({ category, skills }, index) => (
          <FlipCard
            key={category}
            title={category}
            icon={categoryIcons[category] ?? FaCode}
            $tilt={cardTilts[index % cardTilts.length]}
          >
            <SkillList>
              {skills.map((skill) => (
                <SkillItem key={skill.name} color={skill.color}>
                  <skill.Icon />
                  {skill.name}
                </SkillItem>
              ))}
            </SkillList>
          </FlipCard>
        ))}
      </SkillsGrid>
    </StyledSkillsSection>
  );
};

export default Skills;
