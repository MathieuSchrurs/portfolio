import styled from 'styled-components';
import SectionHeading from '../ui/SectionHeading';
import ChromeCard from '../ui/ChromeCard';
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

const CategoryCard = styled(ChromeCard).attrs({
  padding: '1.5rem 1.75rem',
  radius: 'var(--border-radius)',
  popoutOnHover: true,
})``;

const CategoryTitle = styled.h3`
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: var(--fz-xs);
  font-weight: 600;
  color: var(--accent-color);
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
  gap: 0.6rem;
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

const Skills = () => {
  return (
    <StyledSkillsSection id="skills">
      <SectionHeading sectionNumber="3">My Skill Set</SectionHeading>
      <SkillsGrid>
        {skillCategories.map(({ category, skills }) => (
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
