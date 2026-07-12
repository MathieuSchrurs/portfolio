import styled from "styled-components";
import { motion, useReducedMotion } from "motion/react";
import CVDownload from "../ui/CVDownload";
import StyledButtonLink from "../ui/StyledButtonLink";
import RotatingWord from "../ui/RotatingWord";

const StyledHero = styled.section`
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 56rem;
  margin: 0 auto;
  position: relative;
  padding-top: calc(var(--nav-height) + 20px);
  padding-bottom: 5rem;
`;

const StyledOverline = styled.p`
  && {
    color: var(--accent-color);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    letter-spacing: 0.08em;
    margin-top: -0.75rem;
    margin-bottom: 3.5rem;
  }
`;

const StyledBigName = styled.h1`
  color: var(--text-primary-color);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: clamp(3rem, 2rem + 5.5vw, 5.75rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
  margin-bottom: 0;
`;

const StyledTagline = styled.h2`
  color: var(--text-secondary-color);
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: clamp(1.1rem, 0.9rem + 1vw, 1.5rem);
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const StyledBio = styled.p`
  color: var(--text-secondary-color);
  font-family: var(--font-mono);
  font-size: var(--fz-lg);
  line-height: 1.6;
  max-width: 42em;
`;

const StyledActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
`;

const riseIn = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <StyledHero id="hero">
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}
      >
        <motion.div variants={riseIn} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <StyledBigName>Mathieu Schrurs.</StyledBigName>
        </motion.div>

        <motion.div variants={riseIn} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <StyledOverline>Software engineer · Ghent, Belgium</StyledOverline>
        </motion.div>

        <motion.div variants={riseIn} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <StyledTagline>
            I explore
            <RotatingWord />
            through code
          </StyledTagline>
        </motion.div>

        <motion.div variants={riseIn} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <StyledBio>
            I used to publish music and teach languages.
            <br />
            Both ran on structure, timing, clarity and human connection.
            <br />
            So does the software I now build.
          </StyledBio>
        </motion.div>

        <motion.div variants={riseIn} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <StyledActions>
            <StyledButtonLink href="#contact" primary>
              Get In Touch
            </StyledButtonLink>
            <CVDownload />
          </StyledActions>
        </motion.div>
      </motion.div>
    </StyledHero>
  );
};

export default Hero;
