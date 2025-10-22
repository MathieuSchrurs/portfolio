import { useState } from "react";
import styled from "styled-components";
import CVDownload from "../ui/CVDownload";
import StyledButtonLink from "../ui/StyledButtonLink";

const InteractiveWordSpan = styled.span<{ isHovered: boolean }>`
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: var(--text-secondary-color);
  transition: color 1s ease;

  &::before {
    content: attr(data-content);
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
    white-space: nowrap;
    color: transparent;
    background-image: linear-gradient(
      to right,
      var(--accent-color),
      var(--gradient-middle-color),
      var(--gradient-end-color)
    );
    -webkit-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;
    transition: width 1s ease-in-out;
  }

  &:hover::before {
    width: 100%;
  }
`;

const StyledHero = styled.section`
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  max-width: 48rem;
  margin: 0 auto;
  position: relative;

  /* This pushes content down slightly so it’s not hidden by the fixed nav */
  padding-top: calc(var(--nav-height) + 20px);
  padding-bottom: 5rem;

  @media (min-width: 768px) {
    align-items: center;
    text-align: left;
    padding-top: calc(var(--nav-height) + 40px);
  }
`;

const Hero = () => {
  const [isWordHovered, setIsWordHovered] = useState(false);
  const wordToAnimate = "creation";

  return (
    <StyledHero id="hero">
      <div>
        <p
          style={{
            color: "var(--text-primary-color)",
            fontFamily: '"Fira Code", monospace',
            fontSize: "var(--fz-md)",
            marginBottom: "1rem",
          }}
        >
          Hi, my name is
        </p>

        <h1
          style={{
            color: "var(--text-primary-color)",
            fontFamily: '"Fira Code", monospace',
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            marginBottom: "0.5rem",
          }}
        >
          Mathieu Schrurs.
        </h1>

        <h2
          style={{
            color: "var(--text-secondary-color)",
            fontFamily: '"Fira Code", monospace',
            fontWeight: 700,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "1.5rem",
          }}
        >
          I explore{" "}
          <InteractiveWordSpan
            isHovered={isWordHovered}
            onMouseEnter={() => setIsWordHovered(true)}
            onMouseLeave={() => setIsWordHovered(false)}
            data-content={wordToAnimate}
          >
            {wordToAnimate}
          </InteractiveWordSpan>{" "}
          through code
        </h2>

        <p
          style={{
            color: "var(--text-secondary-color)",
            fontFamily: '"Fira Code", monospace',
            fontSize: "var(--fz-lg)",
            lineHeight: 1.5,
            marginBottom: "3rem",
          }}
        >
          Building digital solutions that bridge technology and human needs.  
          <br />
          Using .NET, React, and Next.js.  
          <br />
          Always growing, always learning.
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <StyledButtonLink href="#contact">Get In Touch</StyledButtonLink>
          <CVDownload />
        </div>
      </div>
    </StyledHero>
  );
};

export default Hero;
