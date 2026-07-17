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
  max-width: 68rem;
  margin: 0 auto;
  position: relative;
  padding-top: calc(var(--nav-height) + 20px);
  padding-bottom: 5rem;
`;

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(2rem, 5vw, 4.5rem);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledOverline = styled.p`
  && {
    color: var(--accent-color);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    letter-spacing: 0.08em;
    margin-top: 0.75rem;
    margin-bottom: 3rem;
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

/* Portrait with an accent frame offset behind it — the classic framed-photo
   look. The frame sits diagonally behind the image and settles closer to it
   on hover, echoing the subtle shift the tech cards make on hover. */
const StyledPortrait = styled(motion.div)`
  position: relative;
  width: clamp(220px, 26vw, 300px);
  justify-self: end;

  img {
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    box-shadow: 0 12px 30px -14px var(--shadow-color);
  }

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    border: 2px solid var(--accent-color);
    border-radius: var(--border-radius);
    transform: translate(16px, 16px);
    transition: var(--transition);
  }

  &:hover:before {
    transform: translate(10px, 10px);
  }

  @media (max-width: 768px) {
    justify-self: center;
    width: clamp(200px, 60vw, 260px);
    margin-top: 3rem;

    &:before {
      transform: translate(12px, 12px);
    }
  }
`;

const riseIn = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <StyledHero id="hero">
      <StyledContent>
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

        <StyledPortrait
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/profile-picture.webp"
            alt="Mathieu Schrurs"
            width={740}
            height={740}
          />
        </StyledPortrait>
      </StyledContent>
    </StyledHero>
  );
};

export default Hero;
