import styled from "styled-components";
import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../layout/SectionWrapper";
import TechStackReel from "../ui/TechStackReel";
import { skills } from "../../data/skills";

// About's "Current Tech Stack" strip is a curated subset of the shared skill
// data, picked by name. A couple of entries are relabelled here to the
// broader, combined phrasing this strip has always used (e.g. pairing C#
// with .NET, since the shared data lists them as separate categorised
// entries but they render with the same icon/color here).
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

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  float: right;
  margin-left: 30px;
  margin-bottom: 15px;
  @media (max-width: 768px) {
    float: none;
    display: block;
    margin: 50px auto 40px;
    max-width: 80%;
  }
  @media (max-width: 480px) {
    max-width: 250px;
  }
  .wrapper {
    position: relative;
    display: block;
    width: 100%;
    min-height: 200px;
    border-radius: var(--border-radius);
    overflow: hidden;
    aspect-ratio: 1 / 1;
    background-image: url("/images/profile-picture.jpg");
    background-size: cover;
    background-position: center;
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
        <StyledPic>
          <div className="wrapper" onContextMenu={(e) => e.preventDefault()} />
        </StyledPic>

        <StyledText>
          <div>
            <p>
              My path into software wasn’t a straight line — and that’s exactly what makes
              it interesting. Before writing code professionally, I spent years in music
              publishing in London, then teaching English and Dutch in Belgium. Those worlds
              trained me to communicate clearly, think in systems, and put the human
              experience at the center of everything I build.
            </p>
            <p>
              Today, I work across the full stack — .NET and C# on the back end, React and
              TypeScript on the front. Good software, to me, is the kind that does its job
              quietly: well-structured, easy to reason about, and built to last beyond the
              first release.
            </p>
            <p>
              What drives me isn’t just shipping features — it’s understanding a problem well
              enough to solve it properly. Whether collaborating with a team or working
              through something solo, the goal is always the same: something that genuinely
              works for the people using it.
            </p>
            <p>
              Outside of code, you’ll find me courtside coaching my basketball team, exploring
              new music albums, or hunting down the next thing worth understanding.
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
