// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import type { SVGProps } from 'react';
import TechStackReel from './TechStackReel';
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
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

afterEach(cleanup);

describe('<TechStackReel /> render', () => {
  it('renders every skill as a card under prefers-reduced-motion', () => {
    setReducedMotion(true);
    const { container } = render(<TechStackReel skills={skills} />);
    const cards = container.querySelectorAll('li');
    expect(cards.length).toBe(skills.length);
    expect(container.querySelector('[aria-label="Current Tech Stack"]')).not.toBeNull();
  });

  it('renders the parallax path (no reduced motion) without throwing', () => {
    setReducedMotion(false);
    const { container } = render(<TechStackReel skills={skills} />);
    expect(container.querySelectorAll('li').length).toBe(skills.length);
  });
});
