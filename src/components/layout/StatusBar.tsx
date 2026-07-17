import { useMemo } from 'react';
import styled from 'styled-components';
import config from '@config';
import { useActiveSection } from '../../hooks';

/*
 * Bottom status bar in the spirit of a tmux / vim statusline: one persistent
 * horizontal strip of chrome pinned to the bottom of the viewport. It replaces
 * the two fixed vertical side rails (social icons on the left, email on the
 * right) with a single bar: an inverted "mode" block, the contact links, the
 * location, a command-palette hint, and the year. Hidden on narrow screens,
 * exactly as the old rails were.
 */

const Bar = styled.aside`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: stretch;
  height: 30px;
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  letter-spacing: 0.04em;
  color: var(--text-secondary-color);
  background-color: var(--header-bg-color);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-color);

  a {
    color: inherit;
    &:hover,
    &:focus-visible {
      color: var(--accent-color);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* Vim-style mode block: inverted accent, the one saturated element on the bar
   so the eye reads it as a status indicator, not a link. Its label is the
   section currently in view, the way Vim's block shows the current mode. */
const Mode = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 6.5em;
  padding: 0 0.85rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-text-color);
  background-color: var(--accent-color);
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.9rem;

  .sep {
    opacity: 0.45;
    user-select: none;
  }
`;

const Spacer = styled.span`
  flex: 1;
`;

const Segment = styled.span`
  display: flex;
  align-items: center;
  padding: 0 0.9rem;
  border-left: 1px solid var(--border-color);
  white-space: nowrap;
`;

/* The palette hint doubles as a button — clicking it opens the same overlay
   Cmd/Ctrl+K does. */
const PaletteHint = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  color: var(--text-secondary-color);

  kbd {
    font-family: inherit;
    border: 1px solid var(--border-color);
    border-radius: 3px;
    padding: 0.05rem 0.3rem;
    line-height: 1;
  }

  &:hover,
  &:focus-visible {
    color: var(--accent-color);
    kbd {
      border-color: var(--accent-color);
    }
  }
`;

interface StatusBarProps {
  onOpenPalette: () => void;
}

export default function StatusBar({ onOpenPalette }: StatusBarProps) {
  const year = new Date().getFullYear();

  /* Hero plus every nav destination, in document order. Memoized so the
     observer in useActiveSection isn't rebuilt each render. */
  const sections = useMemo(
    () => [
      { id: 'hero', label: 'home' },
      ...config.navLinks.map((link) => ({
        id: link.url.split('#')[1],
        label: link.name,
      })),
    ],
    [],
  );
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const activeId = useActiveSection(ids);
  const activeLabel = sections.find((s) => s.id === activeId)?.label ?? 'home';

  return (
    <Bar aria-label="Status bar">
      <Mode aria-hidden="true">{activeLabel}</Mode>
      <Links>
        {config.socialMedia.map((social, i) => (
          <span key={social.url} style={{ display: 'flex', gap: '0.5rem' }}>
            {i > 0 && <span className="sep">·</span>}
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              {social.name.toLowerCase()}
            </a>
          </span>
        ))}
        <span className="sep">·</span>
        <a href={`mailto:${config.email}`}>mail</a>
      </Links>
      <Spacer />
      <Segment>ghent, be</Segment>
      <Segment>
        <PaletteHint type="button" onClick={onOpenPalette} aria-label="Open command palette">
          <kbd>⌘K</kbd>
          <span>menu</span>
        </PaletteHint>
      </Segment>
      <Segment aria-label={`Copyright ${year}`}>© {year}</Segment>
    </Bar>
  );
}
