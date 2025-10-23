import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";
import CVDownload from "../ui/CVDownload";
import StyledButtonLink from "../ui/StyledButtonLink";

const StyledHero = styled.section`
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 48rem;
  margin: 0 auto;
  position: relative;
  padding-top: calc(var(--nav-height) + 20px);
  padding-bottom: 5rem;
`;

const Line = styled.div`
  display: inline-block;
  white-space: nowrap;
  line-height: 1.1em;
`;

const WordStack = styled.span`
  display: inline-flex;
  position: relative;
  align-items: baseline; /* aligns with text next to it */
  overflow: visible; /* allow descenders to show */
  min-width: 8ch;
  margin-left: 0.35em; /* space from "explore" */
`;

const AnimatedWord = styled(motion.span)`
  display: inline-block;
  font-weight: 700;
  color: var(--accent-color);
  line-height: 1.1; /* slightly looser so descenders fit */
  transform: translateY(0.10em);
`;

const Hero = () => {
  const [index, setIndex] = useState(0);
  const words = [
    "creation",
    "curiosity",
    "logic",
    "systems",
    "iteration",
    "clarity",
    "elegance",
    "connection",
    "understanding",
    "transformation",
    "resilience",
    "craftsmanship"
  ];


  // Loop indefinitely through the words
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000); // slower pacing (3 seconds per word)
    return () => clearInterval(interval);
  }, [words.length]);

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
          <Line>
            I explore
            <WordStack>
              <AnimatePresence mode="wait" initial={false}>
                <AnimatedWord
                  key={words[index]}
                  initial={{ y: "20%", opacity: 0 }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 0, 0.35, 1],
                    },
                  }}
                  exit={{
                    y: "-40%",
                    opacity: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 0, 0.35, 1],
                    },
                  }}
                >
                  {words[index]}
                </AnimatedWord>
              </AnimatePresence>
            </WordStack>
          </Line>
          <br />
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
