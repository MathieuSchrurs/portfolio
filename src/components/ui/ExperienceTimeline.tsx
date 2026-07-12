import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import ExperienceScene from './ExperienceScene';
import { usePrefersReducedMotion, useInkSpineDraw } from '../../hooks';
import type { Job } from '../../types';

/*
 * "Self-drawing line log", second pass: full-width scenes.
 *
 * The vertical spine still lives on the left edge — a faint dotted
 * guideline with an ink line that draws itself downward as the user
 * scrolls, the same stroke-reveal motif as the nav logo's signature draw.
 * Each entry sits in a dim "ghost" state until the ink tip reaches its
 * marker, then ignites once and stays settled.
 *
 * What changed from the first pass: the spine is now a slim connecting
 * thread rather than the axis of a narrow column. Each entry is a
 * full-width "scene" (see ExperienceScene) spanning the whole section,
 * with oversized company typography and a scroll-linked drift layered on
 * top by Framer Motion.
 *
 * Ink mechanism: a passive scroll listener (attached only while the
 * section is near the viewport, gated by an IntersectionObserver) batches
 * work into requestAnimationFrame. Each frame writes a single composited
 * transform (scaleY on the ink line) and sets `data-lit` on every entry
 * from the ink tip's CURRENT position — fully bidirectional, so scrolling
 * back up retracts the ink and un-ignites entries again.
 */

/* Fraction of the viewport height where the "pen" sits; the ink tip tracks
   this line as the user scrolls. */
const PEN_POSITION = 0.72;
/* Vertical offset (px) from an entry's top to its marker center — tuned to
   match the vertical center of the (now-static, non drifted, baseline-aligned
   with the numeral) date text in ExperienceScene's range/numeral row, so
   the tick stays flush with both at every scroll position. */
const MARKER_ANCHOR = 19.5;
/* Horizontal center (px) of the spine inside the wrapper. */
const SPINE_CENTER = 8;

const easeOutQuart = 'cubic-bezier(0.25, 1, 0.5, 1)';

const Wrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1.5rem;
`;

/* Dotted guideline: the "pencil rule" the ink is drawn along. */
const SpineTrack = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${SPINE_CENTER - 1}px;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    var(--border-color) 0 3px,
    transparent 3px 9px
  );
`;

const SpineInk = styled.div<{ $drawn: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${SPINE_CENTER - 1}px;
  width: 2px;
  border-radius: 1px;
  background: var(--accent-ink);
  transform-origin: top;
  transform: ${({ $drawn }) => ($drawn ? 'none' : 'scaleY(0)')};
  will-change: transform;
`;

const LogWrap = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: clamp(4.5rem, 9vw, 8rem);
`;

const Entry = styled.li`
  position: relative;
  padding-left: clamp(2.5rem, 2rem + 2.5vw, 4.5rem);
`;

/* Tick mark crossing the spine, like a graduation on a plotter axis. */
const Marker = styled.span`
  position: absolute;
  left: 2px;
  top: ${MARKER_ANCHOR - 1}px;
  width: 24px;
  height: 2px;
  border-radius: 1px;
  background: var(--border-color);
  transform-origin: left center;
  transform: scaleX(0.4);
  transition:
    background-color 450ms ${easeOutQuart},
    transform 450ms ${easeOutQuart};

  ${Entry}[data-lit='true'] & {
    background: var(--accent-ink);
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (max-width: 600px) {
    width: 16px;
  }
`;

const beaconPulse = keyframes`
  0% {
    transform: scale(0.35);
    opacity: 0.8;
  }
  65% {
    transform: scale(1);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

/* Current role: a small ink dot on the spine that keeps pulsing —
   the pen is still resting on this line. */
const CurrentBeacon = styled.span`
  position: absolute;
  left: ${SPINE_CENTER}px;
  top: ${MARKER_ANCHOR}px;
  width: 0;
  height: 0;

  &::before {
    content: '';
    position: absolute;
    left: -3px;
    top: -3px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-ink);
  }

  &::after {
    content: '';
    position: absolute;
    left: -11px;
    top: -11px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid var(--accent-ink);
    opacity: 0;
  }

  ${Entry}[data-lit='true'] &::after {
    animation: ${beaconPulse} 3.2s ${easeOutQuart} infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after,
    ${Entry}[data-lit='true'] &::after {
      animation: none;
    }
  }
`;

export interface ExperienceTimelineProps {
  jobs: Job[];
}

export default function ExperienceTimeline({ jobs }: ExperienceTimelineProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inkRef = useRef<HTMLDivElement | null>(null);

  useInkSpineDraw(wrapRef, inkRef, {
    prefersReducedMotion,
    penPosition: PEN_POSITION,
    markerAnchor: MARKER_ANCHOR,
  });

  return (
    <Wrap ref={wrapRef}>
      <SpineTrack aria-hidden="true" />
      <SpineInk ref={inkRef} aria-hidden="true" $drawn={prefersReducedMotion} />
      <LogWrap>
        {jobs.map((job, index) => {
          const isCurrent = job.range.toLowerCase().includes('present');
          return (
            <Entry
              key={`${job.company}-${job.title}`}
              data-log-entry
              data-lit={prefersReducedMotion ? 'true' : 'false'}
            >
              <Marker aria-hidden="true" />
              {isCurrent && <CurrentBeacon aria-hidden="true" />}
              <ExperienceScene
                job={job}
                number={jobs.length - index}
                isCurrent={isCurrent}
              />
            </Entry>
          );
        })}
      </LogWrap>
    </Wrap>
  );
}
