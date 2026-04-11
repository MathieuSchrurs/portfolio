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

const StyledOverline = styled.p`
  color: var(--text-primary-color);
  font-family: var(--font-mono);
  font-size: var(--fz-md);
  margin-bottom: 1rem;
`;

const StyledBigName = styled.h1`
  color: var(--text-primary-color);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 0.75rem;
`;

const StyledTagline = styled.h2`
  color: var(--text-secondary-color);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.2;
  margin-bottom: 1.5rem;
`;

const StyledBio = styled.p`
  color: var(--text-secondary-color);
  font-family: var(--font-mono);
  font-size: var(--fz-lg);
  line-height: 1.5;
`;

/* Fixed-height clipping window — the slot machine drum */
const WordSlot = styled.span`
  display: block;
  overflow: hidden;
  height: 1.2em;
  position: relative;
`;

/* Each word lives absolutely inside the slot so the container never resizes */
const AnimatedWord = styled(motion.span)`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  font-weight: 700;
  color: var(--accent-color);
  white-space: nowrap;
`;

const Hero = () => {
  const [index, setIndex] = useState(0);

  const words = [
    "rhythm",
    "clarity",
    "meaning",
    "craft",
    "connection",
    "flow",
    "purpose",
    "nuance",
    "structure",
    "stories",
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      2000
    );
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <StyledHero id="hero">
      <div>
        <StyledOverline>Hi, my name is</StyledOverline>

        <StyledBigName>Mathieu Schrurs.</StyledBigName>

        <StyledTagline>
          I explore
          <WordSlot>
            <AnimatePresence initial={false}>
              <AnimatedWord
                key={words[index]}
                initial={{ y: "105%" }}
                animate={{
                  y: "0%",
                  transition: {
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                exit={{
                  y: "-105%",
                  transition: {
                    duration: 0.3,
                    ease: [0.645, 0.045, 0.355, 1],
                  },
                }}
              >
                {words[index]}
              </AnimatedWord>
            </AnimatePresence>
          </WordSlot>
          through code
        </StyledTagline>

        <StyledBio>
          I build with care, curiosity, and intent.
          <br />
          Music publisher, language teacher, and now software developer —
          <br />
          same instinct for craft, different medium.
        </StyledBio>

        <div style={{ display: "flex", gap: "1rem", marginTop: "3rem" }}>
          <StyledButtonLink href="#contact">Get In Touch</StyledButtonLink>
          <CVDownload />
        </div>
      </div>
    </StyledHero>
  );
};

export default Hero;
