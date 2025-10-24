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
import { generateColorVariants } from "../../utils/colorUtils";

interface Skill {
  name: string;
  Icon: React.ComponentType<any>;
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
      text-underline-offset: 3px;
      &:hover {
        text-decoration: none;
      }
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
`;

const skillsListItemStyles = `
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  cursor: default;
  border-radius: 10px;
  padding: 0.75rem 0.8rem;
  width: 100%;
  overflow: hidden;
  transition: transform 0.3s ease, filter 0.3s ease;

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 15px;
    background: linear-gradient(
      180deg,
      var(--skill-dark),
      var(--skill-base),
      var(--skill-light),
      var(--skill-base)
    );
    background-size: 400% 400%;
    z-index: -1;
    opacity: 0.3;
    transition: opacity 0.4s ease, filter 0.4s ease;
  }

  &::before {
    padding: 2.5px;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    filter: none;
  }

  &::after {
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    border-radius: 16px;
    filter: blur(20px);
    opacity: 0.12;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px);
  }

  &:hover::before {
    opacity: 1;
    filter: none;
    animation: gradientShift 6s linear infinite;
  }

  &:hover::after {
    opacity: 0.2;
    filter: blur(16px);
    animation: gradientShift 6s linear infinite;
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  span {
    font-weight: 500;
    white-space: nowrap;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const StyledSkillsGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  padding: 0;
  margin: 0 auto;
  list-style: none;
  max-width: 700px;
  justify-content: center;

  li {
    ${skillsListItemStyles}
    text-align: left;
    justify-content: flex-start;

    @media (min-width: 800px) {
      justify-content: center;
      text-align: center;
      flex-direction: column;

      svg {
        margin: 0 0 6px 0;
      }
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
              Hi, I'm Mathieu — a software engineer based in Ghent, Belgium. I
              love building digital products that are robust, user-friendly, and
              genuinely helpful.
            </p>
            <p>
              My journey began with C# and .NET, and has since grown to include
              modern frontend tools like React and Next.js. I enjoy working
              across the stack, turning ideas into real, impactful solutions.
            </p>
            <p>
              As many coders, I care deeply about clean code, thoughtful design,
              and clear communication. Whether I'm collaborating with others or
              working solo, I strive to bridge the gap between technology and
              real-world needs.
            </p>
            <p>
              Outside of coding, I’m always learning, refining, and looking for
              new ways to grow <br></br> as a developer, a basketbalcoach, a partner, a friend, or simply
              as a human.
            </p>

            <StyledTechStackSubtitle>Current Tech Stack</StyledTechStackSubtitle>

            <StyledSkillsGrid aria-label="Current Tech Stack">
              {currentSkills.map((skill) => {
                const variants = generateColorVariants(skill.color);
                return (
                  <li
                    key={skill.name}
                    style={
                      {
                        ["--skill-base" as any]: variants.base,
                        ["--skill-light" as any]: variants.light,
                        ["--skill-dark" as any]: variants.dark,
                      } as React.CSSProperties
                    }
                  >
                    <skill.Icon aria-hidden="true" color={skill.color} />
                    <span>{skill.name}</span>
                  </li>
                );
              })}
            </StyledSkillsGrid>
          </div>
        </StyledText>
      </StyledAboutContent>
    </StyledAboutSection>
  );
};

export default About;
