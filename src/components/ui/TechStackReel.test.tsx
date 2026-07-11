// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import type { SVGProps } from 'react';
import TechStackReel, { computeReelRange, REEL_PREROLL } from './TechStackReel';
import type { Skill } from '../../data/skills';

const DummyIcon = (props: SVGProps<SVGSVGElement>) => <svg {...props} />;
const skills: Skill[] = [
  { name: 'React', Icon: DummyIcon, color: '#61DAFB' },
  { name: 'TypeScript', Icon: DummyIcon, color: '#3178C6' },
  { name: 'Vite', Icon: DummyIcon, color: '#646CFF' },
];

/* Force motion's useReducedMotion, which queries '(prefers-reduced-motion:
   reduce)'. Assigning matchMedia before render is enough — the hook reads it
   on mount. */
function setReducedMotion(reduce: boolean) {
  window.matchMedia = (query: string) =>
    ({
      matches: query.includes('reduce') ? reduce : !reduce,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

afterEach(cleanup);

describe('computeReelRange', () => {
  it('starts a fractional-container-width pre-roll in from the right', () => {
    expect(computeReelRange(1000, 4000).from).toBeCloseTo(1000 * REEL_PREROLL);
  });

  it('sweeps the whole track fully off the left edge', () => {
    expect(computeReelRange(1000, 4000).to).toBe(-4000);
  });

  it('scales the pre-roll with the container, not the track', () => {
    // Narrow mobile container -> proportionally smaller entrance offset, which
    // is what keeps the sweep timing aligned across viewport widths.
    expect(computeReelRange(282, 2400).from).toBeCloseTo(282 * REEL_PREROLL);
  });
});

describe('<TechStackReel /> render', () => {
  it('renders under prefers-reduced-motion without the target-ref crash', () => {
    setReducedMotion(true);
    // The regression: the reduced-motion path once mounted a separate tree so
    // useScroll's target ref never attached, throwing "Target ref is defined
    // but not hydrated". This must not throw.
    const { container } = render(<TechStackReel skills={skills} />);
    const cards = container.querySelectorAll('li');
    expect(cards.length).toBe(skills.length);
    expect(container.querySelector('[aria-label="Current Tech Stack"]')).not.toBeNull();
  });

  it('renders the motion path (no reduced motion) without throwing', () => {
    setReducedMotion(false);
    const { container } = render(<TechStackReel skills={skills} />);
    expect(container.querySelectorAll('li').length).toBe(skills.length);
  });
});
