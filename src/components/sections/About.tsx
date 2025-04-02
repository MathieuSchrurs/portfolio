import React from "react";
import styled from "styled-components";
import {
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaGithub,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiDotnet,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';

interface Skill {
  name: string;
  Icon: React.ComponentType<any>;
  color?: string;
}

// Styled components
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

const StyledHeading = styled.h2`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0 40px;
  width: 100%;
  font-size: clamp(26px, 5vw, var(--fz-heading));
  color: var(--text-primary-color);
  white-space: nowrap;
  font-family: var(--font-sans);

  &:before {
    position: relative;
    bottom: 4px;
    content: "01.";
    margin-right: 10px;
    color: var(--accent-color);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
    font-weight: 400;

    @media (max-width: 480px) {
      margin-bottom: -3px;
      margin-right: 5px;
    }
  }

  &:after {
    content: "";
    display: block;
    position: relative;
    top: -5px;
    width: 300px;
    height: 1px;
    margin-left: 20px;
    background-color: var(--border-color);

    @media (max-width: 1080px) {
      width: 200px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      margin-left: 10px;
    }
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

  min-width: 160px;
  min-height: 40px;

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
    border-radius: var(--border-radius);
    background-color: var(--accent-color);
    transition: var(--transition);

    &:hover,
    &:focus-within {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
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

  .img {
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    filter: grayscale(100%) contrast(1);
    mix-blend-mode: multiply;
    transition: var(--transition);
  }
`;

const About = () => {
  const currentSkills: Skill[] = [
    { name: "C# / .NET", Icon: SiDotnet, color: '#512BD4' },
    { name: "TypeScript", Icon: SiTypescript, color: '#3178C6' },
    { name: "React / Next.js", Icon: FaReact, color: '#61DAFB' },
    { name: "Node.js", Icon: FaNodeJs, color: '#339933' },
    { name: "HTML & (S)CSS", Icon: FaHtml5, color: '#E34F26' },
    // --- Skills for second row ---
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: '#06B6D4' },
    { name: "Docker", Icon: FaDocker, color: '#2496ED' },
    { name: "Git & GitHub", Icon: FaGitAlt, color: '#F05032' },
  ];

  const skillsRow1 = currentSkills.slice(0, 5);
  const skillsRow2 = currentSkills.slice(5);

  return (
    <StyledAboutSection id="about">
      <StyledHeading>About Me</StyledHeading>
      <StyledAboutContent>
        <StyledPic>
          <div className="wrapper">
            <img
              className="img"
              src="/images/your-photo.jpg"
              alt="Headshot of Mathieu Schrurs"
              width="300"
              height="300"
            />
          </div>
        </StyledPic>

        <StyledText>
          <div>
            <p>
              Hello! I'm Mathieu, a Software Engineer based in Ghent, Belgium.
              I specialize in building (and occasionally designing)
              high-quality, performant, and user-centric digital experiences,
              from dynamic websites to comprehensive web applications.
            </p>
            <p>
              My journey into the world of development began with my studies as a C# .Net developer.
              Since then, I've gained hands-on experience developing robust
              solutions, including [mention 1-2 specific types of projects or
              achievements] primarily using technologies like
              React and .NET.
            </p>
            <p>
              I'm passionate about writing clean, maintainable code and building
              things the right way. I value collaboration and clear
              communication – being a native Dutch speaker and fluent in English
              helps me effectively bridge the gap between technical possibilities
              and business needs. I'm comfortable working within agile
              methodologies to deliver iteratively and efficiently.
            </p>

            <StyledTechStackSubtitle>
              Current Tech Stack
            </StyledTechStackSubtitle>

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
