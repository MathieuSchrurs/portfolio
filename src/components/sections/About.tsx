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
  Icon: React.ComponentType<any>;
  color?: string;
}

const StyledAboutSection = styled.section`
  margin: 0 auto;
  max-width: 1000px;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;

const StyledAboutContent = styled.div`
  display: flow-root;
`;

const StyledText = styled.div`
  p {
    margin: 0 0 15px;
    color: var(--text-secondary-color);
    font-family: var(--font-mono);
    font-size: var(--fz-lg);
    line-height: 1.5;
    text-align: left;

    &:last-of-type {
      margin-bottom: 0;
    }

    a {
      color: var(--accent-color);
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 3px;
      &:hover {
        text-decoration: none;
      }
    }
  }
`;

const StyledTechStackSubtitle = styled.h4`
  text-align: center;
  margin: 40px 0 20px 0;
  margin-bottom: 40px;
  font-family: var(--font-mono);
  font-size: var(--fz-lg);
  font-weight: 600;
  color: var(--text-primary-color);
`;

const skillsListItemStyles = `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  color: var(--text-secondary-color);
  transition: background-color 0.2s ease-in-out;

  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 0.4rem 0.8rem;

  min-width: auto;
  min-height: 40px;
  width: 100%;

  &:hover {
    background-color: var(--skill-item-hover-bg);
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    flex-shrink: 0;
  }
`;

const StyledSkillsListRow1 = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, minmax(180px, 1fr));
  gap: 15px;
  padding: 0;
  margin: 0;
  list-style: none;
  justify-content: center;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(3, minmax(160px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    width: 100%;
  }

  li {
    ${skillsListItemStyles}
  }
`;

const StyledSkillsListRow2 = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 15px;
  padding: 0;
  list-style: none;
  width: fit-content;
  margin: 15px auto 0;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(3, minmax(160px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    width: 100%;
  }

  li {
    ${skillsListItemStyles}
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
    min-width: 200px;
    border-radius: var(--border-radius);
    transition: var(--transition);
    overflow: hidden;
    aspect-ratio: 1 / 1;
    background-image: url("/images/profile-picture.jpg");
    background-size: cover;
    background-position: center;
    pointer-events: none;

    &:hover,
    &:focus-within {
      outline: 0;
      transform: translate(-4px, -4px);
      box-shadow: 4px 4px 0 0 var(--accent-color);

      &:after {
        transform: translate(8px, 8px);
      }
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      border: 2px solid var(--accent-color);
      top: 14px;
      left: 14px;
      z-index: -1;
      transition: var(--transition);
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 1;
  }
`;

const About = () => {
  const currentSkills: Skill[] = [
    { name: "C# / .NET", Icon: SiDotnet, color: "#512BD4" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    { name: "React / Next.js", Icon: FaReact, color: "#61DAFB" },
    { name: "Node.js", Icon: FaNodeJs, color: "#339933" },
    { name: "HTML & (S)CSS", Icon: FaHtml5, color: "#E34F26" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Docker", Icon: FaDocker, color: "#2496ED" },
    { name: "Git & GitHub", Icon: FaGitAlt, color: "#F05032" },
  ];

  const skillsRow1 = currentSkills.slice(0, 5);
  const skillsRow2 = currentSkills.slice(5);

  return (
    <StyledAboutSection id="about">
      <SectionHeading sectionNumber="1">About Me</SectionHeading>
      <StyledAboutContent>
        <StyledPic>
          <div
            className="wrapper"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="overlay" />
          </div>
        </StyledPic>

        <StyledText>
          <div>
            <p>
              Hi, I'm Mathieu — a software engineer based in Ghent, Belgium. I love building digital products that are robust, user-friendly, and genuinely helpful.
            </p>
            <p>
              My journey began with C# and .NET, and has since grown to include modern frontend tools like React and Next.js. I enjoy working across the stack, turning ideas into real, impactful solutions.
            </p>
            <p>
              As many coders, I care deeply about clean code, thoughtful design, and clear communication. Whether i'm collaborating with others or working solo, I strive to bridge the gap between technology and real-world needs.
            </p>
            <p>
              Outside of coding, I’m always learning, refining, and looking for new ways to grow — as a developer, a partner, a friend, or simply as a human.
            </p>

            <StyledTechStackSubtitle>Current Tech Stack</StyledTechStackSubtitle>

            <StyledSkillsListRow1 aria-label="Main Tech Stack Row 1">
              {skillsRow1.map((skill) => (
                <li key={skill.name}>
                  <skill.Icon aria-hidden="true" color={skill.color} />
                  <span>{skill.name}</span>
                </li>
              ))}
            </StyledSkillsListRow1>

            <StyledSkillsListRow2 aria-label="Main Tech Stack Row 2">
              {skillsRow2.map((skill) => (
                <li key={skill.name}>
                  <skill.Icon aria-hidden="true" color={skill.color} />
                  <span>{skill.name}</span>
                </li>
              ))}
            </StyledSkillsListRow2>
          </div>
        </StyledText>

      </StyledAboutContent>
    </StyledAboutSection>
  );
};

export default About;
