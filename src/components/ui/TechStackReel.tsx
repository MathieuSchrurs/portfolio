import { useRef, type CSSProperties } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { Skill } from '../../data/skills';

/*
 * A grid of tech-stack cards in the About section. All cards are visible at
 * rest in a centered, wrapped grid; the whole block gets a subtle vertical
 * parallax tied to how far the section has scrolled through the viewport, so
 * it feels alive without any horizontal movement. Under prefers-reduced-motion
 * the parallax is dropped and the grid sits still.
 *
 * The parallax `y` is applied to the inner Grid while useScroll measures the
 * outer Viewport — measuring the same element we transform would fold the
 * transform back into its own scroll measurement.
 *
 * (Historically this was a horizontal, scroll-driven "reel"/"conveyor" that
 * swept the whole card set across the viewport. That sweep read as too strong,
 * so it was replaced by this calmer parallax grid.)
 */

/* Vertical parallax travel, in px, from section-entry to section-exit. Small
   on purpose: enough to feel deliberate, not enough to read as motion. */
const PARALLAX_Y = 24;

/* Same easing the rest of the site uses for hover/interaction transitions
   (see --transition in variables.ts) — kept explicit here since the card
   hover wants a longer duration than its fixed 0.25s for a more deliberate,
   weighted response. */
const easeStandard = 'cubic-bezier(0.645, 0.045, 0.355, 1)';

const Viewport = styled.div`
  position: relative;
  width: 100%;
`;

const Grid = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.1rem;
  width: auto;
  max-width: 760px;
  margin: 0 auto;
  /* Headroom for the hover tilt on Card so a hovered card is never clipped. */
  padding: 10px 0 6px;
  list-style: none;
  will-change: transform;
`;

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

  /* Neutral icons at rest keep the two-hue palette intact; the brand
     color is a hover reveal, matching the border/tint treatment. */
  svg {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    color: var(--text-secondary-color);
    opacity: 0.85;
    transition: color 320ms ${easeStandard};
  }

  &:hover svg {
    color: var(--skill-base, var(--accent-color));
    opacity: 1;
  }

  span {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--text-secondary-color);
    text-align: center;
    white-space: nowrap;
  }

  /* Scale cards down on narrow phones so two full cards still fit per row
     rather than one and a half, matching the desktop density. */
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

  /* ['start end', 'end start'] spans the grid's full transit through the
     viewport: progress 0 as its top edge enters the bottom, progress 1 as
     its bottom edge exits the top. */
  const { scrollYProgress } = useScroll({
    target: viewportRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [PARALLAX_Y, -PARALLAX_Y]);

  return (
    <Viewport ref={viewportRef}>
      <Grid aria-label="Current Tech Stack" style={shouldReduceMotion ? undefined : { y }}>
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
            <skill.Icon aria-hidden="true" />
            <span>{skill.name}</span>
          </Card>
        ))}
      </Grid>
    </Viewport>
  );
}
