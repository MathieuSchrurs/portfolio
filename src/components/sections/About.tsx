import React from 'react';
import styled from 'styled-components';

// Styled components to match your site's aesthetic
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
    content: '01.'; // Manually set the section number
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
    content: '';
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
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledText = styled.div`
  p {
    margin: 0 0 15px;
    color: var(--text-secondary-color);
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    line-height: 1.5;
    
    &:last-child {
      margin: 0;
    }
  }
`;

const StyledSkillsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  gap: 0 10px;
  padding: 0;
  margin: 20px 0 0;
  overflow: hidden;
  list-style: none;

  li {
    position: relative;
    margin-bottom: 10px;
    padding-left: 20px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--text-secondary-color);

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--accent-color);
      font-size: var(--fz-sm);
      line-height: 12px;
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  .wrapper {
    position: relative;
    display: block;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--accent-color);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);
      transition: var(--transition);

      &:after {
        transform: translate(8px, 8px);
      }
    }

    &:after {
      content: '';
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
    border-radius: var(--border-radius);
    filter: grayscale(100%) contrast(1);
    transition: var(--transition);
    mix-blend-mode: multiply;

    &:hover,
    &:focus {
      filter: none;
      mix-blend-mode: normal;
    }
  }
`;

const About = () => {
    const skills = [
        'C#',
        '.NET',
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'Tailwind CSS',
        'HTML & (S)CSS',
        'Docker',
        'Git',
    ];

    return (
        <StyledAboutSection id="about">
            <StyledHeading>About Me</StyledHeading>
            <StyledAboutContent>
                <StyledText>
                    <p>
                        Hello! I'm Mathieu, a software engineer based in Ghent, Belgium. I enjoy creating
                        things that live on the internet, whether that be websites, applications, or anything
                        in between. My goal is to always build products that provide pixel-perfect,
                        performant experiences.
                    </p>
                    <p>
                        Shortly after graduating from [Your University/Bootcamp], I joined the engineering
                        team at [Previous Company/Project] where I work on a wide variety of interesting
                        and meaningful projects on a daily basis.
                    </p>
                    <p>Here are a few technologies I've been working on recently:</p>

                    <StyledSkillsList>
                        {skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </StyledSkillsList>
                </StyledText>

                <StyledPic>
                    <div className="wrapper">
                        <img
                            className="img"
                            src="https://via.placeholder.com/300" // Replace with your actual photo
                            alt="Mathieu Schrurs"
                            width="300"
                            height="300"
                        />
                    </div>
                </StyledPic>
            </StyledAboutContent>
        </StyledAboutSection>
    );
};

export default About;
