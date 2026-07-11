import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { Job } from './ExperienceTimeline';

/*
 * One full-width experience "scene".
 *
 * Two-zone composition on desktop: a main zone (date eyebrow, oversized
 * company name, role) and a right zone (entry index numeral up top,
 * description block). Description's top edge lines up with the company
 * name's top edge, so the two zones read as one shared baseline moment
 * rather than the description trailing off on its own.
 *
 * Ignition (ghost <-> lit) is driven by the timeline's ink tip via the
 * owning <li>'s `data-lit` attribute, and is fully bidirectional — the
 * company name slides up out of a clipping box and the supporting lines
 * fade in as the ink arrives, and reverse the same way if it retreats.
 *
 * The range/numeral row is deliberately static — no scroll-linked motion —
 * because the timeline's tick marks are static too, and both need to stay
 * flush with each other and the date text at every scroll position.
 * Framer Motion's scroll-linked drift (+24px -> -24px across the scene's
 * viewport traverse) applies only to Main + Description, giving the
 * content layer depth without disturbing that alignment. Disabled under
 * prefers-reduced-motion.
 */

const easeOutQuint = 'cubic-bezier(0.22, 1, 0.36, 1)';

/* Entry index as 4-bit binary ("01" -> "0001", "02" -> "0010", …). */
const toBinaryIndex = (n: number) => n.toString(2).padStart(4, '0');

const Scene = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 58ch);
  grid-template-areas:
    'range numeral'
    'main  desc';
  align-items: start;
  column-gap: clamp(3rem, 6vw, 7rem);
  width: 100%;

  /* Below this, the two-column split doesn't leave enough room for the
     oversized company name — Description's column has a fixed ~58ch
     floor, so at "half a desktop screen" widths the main column gets
     crowded down to under 100px. Stack instead, same as narrow/mobile. */
  @media (max-width: 1400px) {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      'range numeral'
      'main  main'
      'desc  desc';
    column-gap: 1rem;
  }
`;

/* Company/location/role stacked as ONE grid item. Keeping them out of
   Description's spanned rows means Description's own height never
   stretches this trio's row tracks — each keeps exactly its authored
   margin regardless of how long a given entry's description runs. A
   motion.div so it can carry the scroll-linked drift (see sceneY below)
   independently of the static range/numeral row above it. */
const Main = styled(motion.div)`
  grid-area: main;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Range = styled.time<{ $current: boolean }>`
  grid-area: range;
  align-self: baseline;
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1;
  color: ${({ $current }) =>
    $current ? 'var(--accent-ink)' : 'var(--text-secondary-color)'};
  margin-bottom: 1.75rem;
  transition:
    color 450ms ${easeOutQuint},
    opacity 550ms ${easeOutQuint},
    transform 550ms ${easeOutQuint};

  li[data-lit='false'] & {
    opacity: 0.25;
    transform: translateY(10px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

/* Entry index ("01" … "06") — extends the site's numbered-heading motif
   down to individual entries. Ghost grey until the ink reaches it; fills
   with accent ink on hover as the quiet interactive response. */
const Numeral = styled.span`
  grid-area: numeral;
  justify-self: end;
  align-self: baseline;
  font-family: var(--font-mono);
  font-size: clamp(1.2rem, 0.85rem + 0.95vw, 1.75rem);
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: var(--text-secondary-color);
  margin-bottom: 1.75rem;
  transition:
    color 300ms ${easeOutQuint},
    opacity 550ms ${easeOutQuint} 60ms,
    transform 550ms ${easeOutQuint} 60ms;

  li[data-log-entry]:hover & {
    color: var(--accent-ink);
  }

  li[data-lit='false'] & {
    opacity: 0.18;
    transform: translateY(10px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

/* Clipping window for the company-name slide-up reveal. The h3's layout
   box (line-height * lines) is shorter than its actual ink extent — a
   tight line-height doesn't fully contain a descender's rendered pixels,
   it only budgets less room around it — so padding-bottom has to cover
   the real overshoot, not just a nominal fraction of an em. */
const CompanyClip = styled.div`
  overflow: hidden;
  padding-bottom: 0.45em;
  margin-bottom: -0.45em;
  font-size: clamp(1.75rem, 1.1rem + 2.3vw, 3.15rem);
`;

const CompanyName = styled.h3`
  font-family: var(--font-sans);
  font-size: inherit;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--text-primary-color);
  margin: 0;
  transition:
    transform 750ms ${easeOutQuint} 40ms,
    opacity 600ms ${easeOutQuint} 40ms;

  li[data-lit='false'] & {
    transform: translateY(70%);
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Location = styled.p`
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1;
  color: var(--text-secondary-color);
  margin: 0.9rem 0 0;
  transition:
    opacity 550ms ${easeOutQuint} 90ms,
    transform 550ms ${easeOutQuint} 90ms;

  li[data-lit='false'] & {
    opacity: 0.25;
    transform: translateY(10px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Role = styled.p`
  font-family: var(--font-sans);
  font-size: clamp(var(--fz-lg), 1rem + 0.5vw, 1.4rem);
  font-weight: 500;
  line-height: 1.3;
  color: var(--text-secondary-color);
  margin: 0.5rem 0 0;
  transition:
    opacity 550ms ${easeOutQuint} 140ms,
    transform 550ms ${easeOutQuint} 140ms;

  li[data-lit='false'] & {
    opacity: 0.25;
    transform: translateY(10px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

/* Outer layer owns ONLY the Framer Motion scroll drift (applied via the
   `style` prop, written straight to this node's `transform` outside
   React's render cycle). The ghost <-> lit CSS transition lives on the
   inner DescriptionText instead — putting both on the same element means
   Framer's imperative transform writes and styled-components' CSS
   transition fight over the same `transform` property, which is what
   caused the description to visibly jump on ignite/un-ignite. */
const Description = styled(motion.p)`
  grid-area: desc;
  align-self: start;
  max-width: 58ch;
  margin: 0;

  @media (max-width: 1400px) {
    margin-top: 1.5rem;
  }
`;

const DescriptionText = styled.span`
  display: block;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  line-height: 1.65;
  color: var(--text-secondary-color);
  transition:
    opacity 600ms ${easeOutQuint} 220ms,
    transform 600ms ${easeOutQuint} 220ms;

  li[data-lit='false'] & {
    opacity: 0.25;
    transform: translateY(12px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export interface ExperienceSceneProps {
  job: Job;
  /* Chronological ordinal — 1 for the very first job, counting up from
     there. The list itself renders most-recent-first, so this counts
     DOWN as you scroll down the page: the oldest entry (last in the
     list) reads "0001". */
  number: number;
  isCurrent: boolean;
}

export default function ExperienceScene({
  job,
  number,
  isCurrent,
}: ExperienceSceneProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const finalBinary = toBinaryIndex(number);
  const [displayBinary, setDisplayBinary] = useState(finalBinary);

  /* Binary "decode" reveal: every time the ink tip (re-)ignites this entry
     (the li's `data-lit` flips to true — ignition is now bidirectional, so
     this can fire again after scrolling up and back down), the digits
     rapidly flicker through random 0/1 values and lock in left-to-right
     over ~420ms, landing on the real value in sync with the ghost -> lit
     fade. Skipped entirely under reduced motion. */
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayBinary(finalBinary);
      return undefined;
    }
    const li = ref.current?.parentElement as HTMLElement | null;
    if (!li) return undefined;

    let rafId: number | null = null;
    const duration = 420;

    const runDecode = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const locked = Math.floor(progress * finalBinary.length);
        let next = '';
        for (let i = 0; i < finalBinary.length; i += 1) {
          next += i < locked ? finalBinary[i] : Math.random() < 0.5 ? '0' : '1';
        }
        setDisplayBinary(next);
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setDisplayBinary(finalBinary);
          rafId = null;
        }
      };
      rafId = requestAnimationFrame(step);
    };

    if (li.dataset.lit === 'true') {
      setDisplayBinary(finalBinary);
    }

    const observer = new MutationObserver(() => {
      if (li.dataset.lit === 'true') {
        runDecode();
      }
    });
    observer.observe(li, { attributes: true, attributeFilter: ['data-lit'] });

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [finalBinary, shouldReduceMotion]);

  /* Scroll-linked drift across the scene's full viewport traverse.
     Reversible by design (unlike ignition) — it's ambience, not state.
     Kept comfortably under the range/numeral row's own margin-bottom
     (1.75rem = 28px) so the upward half of the drift never crowds or
     overlaps that now-static row above it. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [16, -16]);

  const contentDrift = shouldReduceMotion ? undefined : { y: sceneY };

  return (
    <Scene ref={ref}>
      <Range $current={isCurrent} dateTime={job.range}>
        {job.range}
      </Range>
      <Numeral aria-hidden="true">{displayBinary}</Numeral>
      <Main style={contentDrift}>
        <CompanyClip>
          <CompanyName>{job.company}</CompanyName>
        </CompanyClip>
        <Location>{job.location}</Location>
        <Role>{job.title}</Role>
      </Main>
      <Description style={contentDrift}>
        <DescriptionText>{job.description}</DescriptionText>
      </Description>
    </Scene>
  );
}
