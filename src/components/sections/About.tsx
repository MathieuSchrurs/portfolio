import React from "react";
import styled from "styled-components";
import {
  FaHtml5,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiDotnet } from "react-icons/si";
import SectionHeading from "../ui/SectionHeading";

interface Skill {
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const StyledAboutSection = styled.section`
  margin: 0 auto;
  max-width: 1000px;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
  }
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

const StyledSkillsGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding: 0;
  margin: 0 auto;
  list-style: none;
  max-width: 700px;

  li {
    flex: 0 0 160px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    cursor: default;
    border-radius: var(--border-radius);
    padding: 0.95rem 1.1rem;
    background-color: var(--card-bg-color);
    border: 1px solid var(--border-color);
    border-top: 2px solid var(--skill-base);
    color: var(--text-secondary-color);
    transition: var(--transition);

    &:hover {
      transform: translateY(-3px);
      border-color: var(--skill-base);
      border-top-width: 2px;
      background-color: var(--skill-tint);
      color: var(--text-primary-color);
      box-shadow: 0 8px 24px -8px var(--skill-base);
    }

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      transition: var(--transition);
    }

    &:hover svg {
      transform: scale(1.15);
    }

    span {
      font-weight: 500;
      white-space: nowrap;
    }

    @media (min-width: 800px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 1.25rem 1rem;

      svg {
        width: 24px;
        height: 24px;
        margin-bottom: 6px;
      }
    }

    @media (max-width: 799px) {
      flex: 0 0 calc(50% - 6px);
    }
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
const currentSkills: Skill[] = [
  { name: "HTML & (S)CSS", Icon: FaHtml5, color: "#E34F26" },
  { name: "C# /.NET", Icon: SiDotnet, color: "#512BD4" },
  { name: "Docker", Icon: FaDocker, color: "#2496ED" },
  { name: "Git & GitHub", Icon: FaGitAlt, color: "#F05032" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", Icon: FaNodeJs, color: "#339933" },
  { name: "React/Next.js", Icon: FaReact, color: "#61DAFB" },
];


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

            <StyledSkillsGrid aria-label="Current Tech Stack">
              {currentSkills.map((skill) => (
                <li
                  key={skill.name}
                  style={{
                    '--skill-base': skill.color,
                    '--skill-tint': `${skill.color}18`,
                  } as React.CSSProperties}
                >
                  <skill.Icon aria-hidden="true" color={skill.color} />
                  <span>{skill.name}</span>
                </li>
              ))}
            </StyledSkillsGrid>
          </div>
        </StyledText>
      </StyledAboutContent>
    </StyledAboutSection>
  );
};

export default About;
