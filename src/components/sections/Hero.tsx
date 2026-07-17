import styled, { keyframes } from "styled-components";
import { motion, useReducedMotion } from "motion/react";
import RotatingWord from "../ui/RotatingWord";
import CommandLink from "../ui/CommandLink";

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

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const StyledOverline = styled.p`
  && {
    color: var(--accent-color);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    letter-spacing: 0.06em;
    margin-top: 0.75rem;
    margin-bottom: 3rem;
  }
`;

/* The name as a shell prompt: an accent chevron, the handle, and a blinking
   caret. Sized to keep the whole line on one row inside the left column at
   desktop widths (mono runs wide, so the ceiling is well below the old sans
   value). */
const StyledBigName = styled.h1`
  color: var(--text-primary-color);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: clamp(2.2rem, 1rem + 4vw, 4rem);
  line-height: 1.05;
  letter-spacing: 0;
  margin-bottom: 0;
  overflow-wrap: break-word;

  .prompt {
    color: var(--accent-color);
    margin-right: 0.35em;
    user-select: none;
  }

  .cursor {
    color: var(--accent-color);
    font-weight: 400;

    @media (prefers-reduced-motion: no-preference) {
      animation: ${blink} 1.1s step-end infinite;
    }
  }
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

/* Actions as terminal commands (see CommandLink); font-size set here since
   CommandLink inherits it from its context. */
const StyledActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem;
  margin-top: 3rem;
  font-size: var(--fz-md);
`;

/* Portrait with an accent frame offset behind it: the classic framed-photo
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
            <StyledBigName>
              <span className="prompt" aria-hidden="true">&gt;</span>
              mathieu.schrurs
              <span className="cursor" aria-hidden="true">_</span>
            </StyledBigName>
          </motion.div>

          <motion.div variants={riseIn} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <StyledOverline>software_engineer @ ghent</StyledOverline>
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
              <CommandLink href="#contact">get in touch</CommandLink>
              <CommandLink href="/cv-mathieu-schrurs.pdf" download="Mathieu_Schrurs_CV.pdf">
                download cv
              </CommandLink>
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
