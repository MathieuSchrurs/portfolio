import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { Skill } from '../../data/skills';
import { computeReelRange } from './techStackReel.logic';

/*
 * A horizontal "conveyor" of tech-stack cards. The track's x position is
 * driven by how far the viewport has scrolled through this component (not
 * autoplay), sweeping the whole card set from fully off-screen right to
 * fully off-screen left over that traverse. A mask on the viewport's edges
 * fades cards to transparent as they approach either edge, so they read as
 * dissolving into the page background rather than being hard-clipped.
 *
 * Under prefers-reduced-motion, the SAME Viewport/Track elements render —
 * just styled as a plain wrapped grid with no mask and no `x` motion value
 * applied. Two genuinely separate render trees (motion track vs. static
 * grid) sounds cleaner, but `useScroll`'s target ref would then never
 * attach to a DOM node on the reduced-motion path (that branch never
 * mounts Viewport), which Framer Motion throws on ("target ref is defined
 * but not hydrated") — a real crash, not just a lint nit. One tree with
 * conditional styling sidesteps that entirely.
 */

const Viewport = styled.div<{ $static: boolean }>`
  position: relative;
  width: 100%;
  /* Headroom for the hover tilt on Card — without this, the overflow:hidden
     clip box has no slack above the track's natural height and shaves off
     the top of any hovered card. The extra top padding also nudges the
     whole band down a touch. */
  padding: 10px 0 6px;

  ${({ $static }) =>
    $static
      ? css`
          overflow: visible;
        `
      : css`
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 12%,
            black 88%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 12%,
            black 88%,
            transparent
          );
        `}
`;

const Track = styled(motion.ul)<{ $static: boolean }>`
  display: flex;
  gap: 1.1rem;
  padding: 0;
  margin: 0;
  list-style: none;

  ${({ $static }) =>
    $static
      ? css`
          flex-wrap: wrap;
          justify-content: center;
          width: auto;
          max-width: 760px;
          margin: 0 auto;
        `
      : css`
          width: max-content;
        `}
`;

/* Same easing the rest of the site uses for hover/interaction transitions
   (see --transition in variables.ts) — kept explicit here rather than
   reusing that var directly since this needs a longer duration than its
   fixed 0.25s for a slightly more deliberate, weighted hover response. */
const easeStandard = 'cubic-bezier(0.645, 0.045, 0.355, 1)';

/* Three "geeky" hover tilt variants, each slightly different. Assigned
   round-robin by card index so every card feels personality-edged but the
   set stays balanced. Motion handles transform; CSS still handles colour
   and shadow transitions for smooth crossfade with the base styles. */
const cardHoverVariants = [
  { rotateZ: -3, y: -2, x: 0 },
  { rotateZ: 1.5, y: -1, x: 2 },
  { rotateZ: -1.5, y: -3, x: -1 },
];

const Card = styled(motion.li)`
  flex: 0 0 auto;
  width: 174px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.85rem 1.25rem;
  background-color: var(--card-bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: 0 8px 20px -10px var(--shadow-color);
  transition:
    border-color 320ms ${easeStandard},
    background-color 320ms ${easeStandard},
    box-shadow 320ms ${easeStandard};

  &:hover {
    border-color: color-mix(in srgb, var(--skill-base) 55%, var(--border-color) 45%);
    background-color: var(--skill-tint);
    box-shadow: 0 16px 32px -12px var(--shadow-color);
  }

  svg {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  span {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--text-secondary-color);
    text-align: center;
    white-space: nowrap;
  }

  /* Below this, the reel's own container is narrow enough (~280px on a
     390px phone, after the section's side padding) that the full-size
     card only shows about one and a half cards at once — too cramped for
     a "conveyor" to read as one. Scaling the card down keeps two full
     cards comfortably in view, matching the desktop density. */
  @media (max-width: 480px) {
    width: 132px;
    padding: 1.4rem 0.9rem;
    gap: 0.5rem;

    svg {
      width: 26px;
      height: 26px;
    }

    span {
      font-size: var(--fz-xs);
    }
  }
`;

const cardStyle = (skill: Skill) =>
  ({
    '--skill-base': skill.color,
    '--skill-tint': `${skill.color}18`,
  }) as CSSProperties;

export interface TechStackReelProps {
  skills: Skill[];
}

export default function TechStackReel({ skills }: TechStackReelProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [range, setRange] = useState({ from: 0, to: 0 });

  useLayoutEffect(() => {
    if (shouldReduceMotion) return undefined;
    const measure = () => {
      const containerWidth = viewportRef.current?.offsetWidth ?? 0;
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      setRange(computeReelRange(containerWidth, trackWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [skills, shouldReduceMotion]);

  /* ['start end', 'end start'] spans the reel's full off-screen-to-off-
     screen transit: progress 0 the instant the reel's top edge first
     appears at the bottom of the viewport (barely in sight), progress 1
     the instant its bottom edge exits the top (fully gone). The reveal
     starts moving as soon as any part of the reel is visible, rather than
     waiting for it to be fully on screen first. */
  const { scrollYProgress } = useScroll({
    target: viewportRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [range.from, range.to]);

  return (
    <Viewport ref={viewportRef} $static={shouldReduceMotion}>
      <Track
        ref={trackRef}
        aria-label="Current Tech Stack"
        $static={shouldReduceMotion}
        style={shouldReduceMotion ? undefined : { x }}
      >
        {skills.map((skill, index) => (
          <Card
            key={skill.name}
            style={cardStyle(skill)}
            initial={{ rotateZ: 0, y: 0, x: 0 }}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    ...cardHoverVariants[index % cardHoverVariants.length],
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }
            }
          >
            <skill.Icon aria-hidden="true" color={skill.color} />
            <span>{skill.name}</span>
          </Card>
        ))}
      </Track>
    </Viewport>
  );
}
