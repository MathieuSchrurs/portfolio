import styled from "styled-components";
import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../layout/SectionWrapper";
import TechStackReel from "../ui/TechStackReel";
import { skills } from "../../data/skills";

const featuredSkillNames = [
  "HTML5",
  "C#",
  "Docker",
  "Git / GitHub",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "React",
];

const featuredSkillLabels: Record<string, string> = {
  "HTML5": "HTML & (S)CSS",
  "C#": "C# /.NET",
  "Git / GitHub": "Git & GitHub",
  "React": "React/Next.js",
};

const StyledAboutSection = styled(SectionWrapper)`
  max-width: 1000px;
`;

const StyledAboutContent = styled.div`
  display: flow-root;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 15px;
  }
`;

const StyledText = styled.div`
  p {
    margin: 0 0 15px;
    color: var(--text-secondary-color);
    font-family: var(--font-mono);
    font-size: var(--fz-lg);
    line-height: 1.5;
    text-align: left;
    text-wrap: pretty;
    &:last-of-type {
      margin-bottom: 0;
    }
    a {
      color: var(--accent-color);
      text-decoration: underline;
      text-underline-offset: 3px;
      &:hover {
        text-decoration: none;
      }
    }

    @media (max-width: 768px) {
      margin: 0 0 20px;
      font-size: var(--fz-xl);
      line-height: 1.7;
    }

    @media (max-width: 480px) {
      margin: 0 0 25px;
      font-size: var(--fz-lg);
      line-height: 1.6;
    }
  }
`;

const StyledTechStackSubtitle = styled.h4`
  text-align: center;
  margin: 80px 0;
  font-family: var(--font-mono);
  font-size: var(--fz-lg);
  font-weight: 500;
  color: var(--text-primary-color);

  @media (max-width: 768px) {
    margin: 60px 0;
    font-size: var(--fz-lg);
  }

  @media (max-width: 480px) {
    margin: 50px 0;
    font-size: var(--fz-md);
  }
`;

const About = () => {
  const currentSkills = featuredSkillNames
    .map((name) => skills.find((skill) => skill.name === name))
    .filter((skill): skill is (typeof skills)[number] => Boolean(skill))
    .map((skill) => ({
      ...skill,
      name: featuredSkillLabels[skill.name] ?? skill.name,
    }));

  return (
    <StyledAboutSection id="about">
      <SectionHeading sectionNumber="1">About Me</SectionHeading>
      <StyledAboutContent>
        <StyledText>
          <div>
            <p>
              I got into software sideways, through music. I spent years in music publishing,
              in London and then Ghent, close enough to the royalty system to see how broken it
              is: rights tangled into a spiderweb nobody could follow, and payments that took
              years to reach the artists who earned them. The whole structure was built layer on
              layer, each one serving whoever had leverage at the time, never the artist at the
              centre. Beginning artists sign away half their copyright to a publisher by law and
              can't even see where the money goes. When my brother started studying IT, I
              realised the tools to untangle a mess like that already exist. That is what pulled
              me in.
            </p>
            <p>
              Before I wrote software professionally, I taught English and Dutch for four years.
              Teaching is mostly reading a room: catching the moment someone is lost, breaking an
              idea down, then breaking it down further, adjusting the pace to the person in front
              of you. There is a Dutch word for it, <em>differentiatie</em>. Sometimes it is a
              joke to defuse tension, sometimes it is borrowing a word from a student's own
              language so they know you are on their side. I do much the same thing now, sitting
              between technical teams and the people who actually have to use what gets built.
            </p>
            <p>
              These days I work mostly with .NET and C# on the back end, React and TypeScript on
              the front. What I chase is that aha moment, when something opaque suddenly makes
              sense. Tokens and sessions the first time I wired up auth, JSON-RPC on an internship
              project: in both cases the black box turned clear and it was genuinely exhilarating.
              I try to build software that gives other people that same jolt of understanding
              instead of taking it away, and I have little patience for complexity that serves
              everyone except the person actually using the thing.
            </p>
            <p>
              Away from the keyboard you will find me coaching my basketball team, digging through
              new albums, sharing a flat with my cat, or losing an evening soldering an Arduino
              idea into existence on a breadboard.
            </p>

            <StyledTechStackSubtitle>Current Tech Stack</StyledTechStackSubtitle>

            <TechStackReel skills={currentSkills} />
          </div>
        </StyledText>
      </StyledAboutContent>
    </StyledAboutSection>
  );
};

export default About;
