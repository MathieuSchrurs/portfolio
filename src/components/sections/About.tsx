import styled from "styled-components";
import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../layout/SectionWrapper";
import TechStackReel from "../ui/TechStackReel";
import AboutTerminal from "../ui/AboutTerminal";
import { useActiveSection } from "../../hooks";
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

/* The bio's four paragraphs are "beats"; each gets an id so the sticky
   terminal panel can track which one is in view and play its matching
   scene (see AboutTerminal). */
const BEAT_IDS = ["about-beat-0", "about-beat-1", "about-beat-2", "about-beat-3"];

const StyledAboutSection = styled(SectionWrapper)`
  max-width: 1100px;
`;

/* Text beats on the left at a comfortable measure, sticky terminal on the
   right. Below 900px the panel is dropped rather than stacked: it narrates
   alongside the text, and inlined between paragraphs it would interrupt
   the read it is meant to accompany. */
const StyledAboutGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
  column-gap: clamp(2.5rem, 5vw, 5rem);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledText = styled.div`
  p {
    margin: 0 0 1.4rem;
    max-width: 62ch;
    color: var(--text-secondary-color);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    line-height: 1.7;
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
  }
`;

const StyledPanelColumn = styled.div`
  position: sticky;
  top: calc(var(--nav-height) + 2rem);

  @media (max-width: 900px) {
    display: none;
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

  /* BEAT_IDS is a module constant, so the reference is stable across renders
     and the observer inside useActiveSection is built once. */
  const activeBeatId = useActiveSection(BEAT_IDS);
  const activeBeat = Math.max(BEAT_IDS.indexOf(activeBeatId), 0);

  return (
    <StyledAboutSection id="about">
      <SectionHeading sectionNumber="1">About Me</SectionHeading>
      <StyledAboutGrid>
        <StyledText>
          <p id={BEAT_IDS[0]}>
            Music is what led me to software. I worked in music publishing, first in
            London and then in Ghent, close enough to the royalty system to see how broken it
            is: rights tangled into a spiderweb nobody could follow, and payments that took
            years to reach the artists who earned them. The whole structure was built layer on
            layer, each one serving whoever had leverage at the time, never the artist at the
            centre. Beginning artists sign away half their copyright to a publisher by law and
            can't even see where the money goes. When my brother started studying IT, I
            realised the tools to untangle a mess like that already exist. That is what pulled
            me in.
          </p>
          <p id={BEAT_IDS[1]}>
            Before I wrote software professionally, I taught English and Dutch for four years.
            Teaching is mostly reading a room: catching the moment someone is lost, breaking an
            idea down, then breaking it down further, adjusting the pace to the person in front
            of you. There is a Dutch word for it, <em>differentiatie</em>. Sometimes it is a
            joke to defuse tension, sometimes it is borrowing a word from a student's own
            language so they know you are on their side. I do much the same thing now, sitting
            between technical teams and the people who actually have to use what gets built.
          </p>
          <p id={BEAT_IDS[2]}>
            These days I work mostly with .NET and C# on the back end, React and TypeScript on
            the front. What I chase is that aha moment, when something opaque suddenly makes
            sense. Tokens and sessions the first time I wired up auth, JSON-RPC on an internship
            project: in both cases the black box turned clear and it was genuinely exhilarating.
            I try to build software that gives other people that same jolt of understanding
            instead of taking it away, and I have little patience for complexity that serves
            everyone except the person actually using the thing.
          </p>
          <p id={BEAT_IDS[3]}>
            Away from the keyboard you will find me coaching my basketball team, digging through
            new albums, sharing a flat with the two ladies in my life (only one of them purrs),
            or losing an evening soldering an Arduino idea into existence on a breadboard.
          </p>
        </StyledText>

        <StyledPanelColumn aria-hidden="true">
          <AboutTerminal beat={activeBeat} />
        </StyledPanelColumn>
      </StyledAboutGrid>

      <StyledTechStackSubtitle>Current Tech Stack</StyledTechStackSubtitle>
      <TechStackReel skills={currentSkills} />
    </StyledAboutSection>
  );
};

export default About;
