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
import CornerMarks from '../ui/CornerMarks';
import SectionWrapper from '../layout/SectionWrapper';
import { skillCategories } from '../../data/skills';

const StyledSkillsSection = styled(SectionWrapper)`
  max-width: 1100px;
  position: relative;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

/* Borderless group with only the four accent corner marks — the site's
   corner language without the card box, so all skills stay readable
   at a glance. */
const CategoryGroup = styled.div`
  position: relative;
  padding: 1.25rem 1.5rem;
`;

const CategoryHeading = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0.9rem;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-primary-color);

  svg {
    width: 16px;
    height: 16px;
    color: var(--accent-color);
    opacity: 0.85;
    flex-shrink: 0;
  }
`;

const SkillList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const SkillItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary-color);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  transition: color 0.3s ease-out;

  svg {
    width: 15px;
    height: 15px;
    color: currentColor;
    opacity: 0.75;
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

const Skills = () => {
  return (
    <StyledSkillsSection id="skills">
      <SectionHeading sectionNumber="3">Toolbox</SectionHeading>
      <SkillsGrid>
        {skillCategories.map(({ category, skills }) => {
          const Icon = categoryIcons[category] ?? FaCode;
          return (
            <CategoryGroup key={category}>
              <CornerMarks />
              <CategoryHeading>
                <Icon aria-hidden="true" />
                {category}
              </CategoryHeading>
              <SkillList>
                {skills.map((skill) => (
                  <SkillItem key={skill.name}>
                    <skill.Icon aria-hidden="true" />
                    {skill.name}
                  </SkillItem>
                ))}
              </SkillList>
            </CategoryGroup>
          );
        })}
      </SkillsGrid>
    </StyledSkillsSection>
  );
};

export default Skills;
