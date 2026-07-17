import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

/*
 * The About section's sticky terminal panel. Purely decorative: each of the
 * four bio paragraphs ("beats") has a matching terminal scene, and the panel
 * swaps scenes as the reader scrolls through the text. The content mirrors
 * what the prose says, so the whole panel is aria-hidden and mobile simply
 * drops it (see About.tsx).
 *
 * A scene is a typed command plus staggered output lines. Line variants:
 * cmd (accent $ prompt), out (plain), dim (secondary), ok (accent).
 */

type LineKind = 'cmd' | 'out' | 'dim' | 'ok';

interface SceneLine {
  kind: LineKind;
  text: string;
  /* Optional external link. Rendered clickable for pointer users but kept out
     of the tab order (tabIndex -1): the panel is aria-hidden decoration, and
     a focusable element inside an aria-hidden subtree is a WCAG violation. */
  href?: string;
}

interface Scene {
  file: string;
  lines: SceneLine[];
}

const SCENES: Scene[] = [
  {
    file: 'royalties.log',
    lines: [
      { kind: 'cmd', text: 'trace royalty --to artist' },
      { kind: 'out', text: '├─ publisher ........ 50%' },
      { kind: 'out', text: '├─ writer ......... 12.5%' },
      { kind: 'out', text: '├─ singer ......... 12.5%' },
      { kind: 'out', text: '├─ rest of band ..... 25%' },
      { kind: 'out', text: '├─ manager ..... their cut' },
      { kind: 'dim', text: '└─ payout ....... pending' },
      { kind: 'dim', text: '   (2+ years)' },
      { kind: 'ok', text: '! 5 cuts, 0 transparency' },
    ],
  },
  {
    file: 'differentiatie.1',
    lines: [
      { kind: 'cmd', text: 'man differentiatie' },
      { kind: 'ok', text: 'NAME' },
      { kind: 'out', text: '  adjust pace to the person' },
      { kind: 'out', text: '  in front of you' },
      { kind: 'ok', text: 'SYNOPSIS' },
      { kind: 'out', text: '  read_room()' },
      { kind: 'out', text: '  && break_it_down --again' },
      { kind: 'dim', text: 'SEE ALSO: humor(1), trust(7)' },
    ],
  },
  {
    file: 'blackbox.sh',
    lines: [
      { kind: 'cmd', text: './blackbox --inspect' },
      { kind: 'dim', text: '[###.......] opaque' },
      { kind: 'out', text: '[######....] clearer' },
      { kind: 'out', text: '[##########] clear' },
      { kind: 'ok', text: '✓ aha — the box opens' },
      { kind: 'dim', text: 'exit 0 (exhilarated)' },
    ],
  },
  {
    file: 'off-hours.d',
    lines: [
      { kind: 'cmd', text: 'ls ~/off-hours' },
      { kind: 'out', text: 'coaching/    box-out-rebound.md' },
      {
        kind: 'out',
        text: 'playlists/   World_Turns ↗',
        href: 'https://open.spotify.com/playlist/5YGwzla2CAcgnWATI2yD93?si=c8aff0ee5d324811',
      },
      { kind: 'out', text: 'breadboard/  idea-042.ino' },
      { kind: 'ok', text: 'ladies: 2    purring: 1 ✓' },
    ],
  },
];

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Window = styled.div`
  background-color: var(--card-bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: 0 12px 30px -14px var(--shadow-color);
  overflow: hidden;
  font-family: var(--font-mono);
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1.1rem;
  border-bottom: 1px solid var(--border-color);
  background-color: color-mix(in srgb, var(--border-color) 30%, transparent);
`;

const Dots = styled.span`
  display: flex;
  gap: 6px;
  flex-shrink: 0;

  i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--border-color);
  }
`;

const FileName = styled.span`
  font-size: var(--fz-xs);
  letter-spacing: 0.05em;
  color: var(--text-secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* Fixed min-height so scene swaps never resize the window and nudge the
   layout while the reader is mid-paragraph. Sized to the tallest scene
   (royalties.log, 9 lines at 1.9 line-height plus this padding). */
const Screen = styled.div`
  padding: 1.1rem 1.2rem 1.3rem;
  min-height: 16.5rem;
  font-size: var(--fz-xs);
  line-height: 1.9;
`;

const Line = styled(motion.div)<{ $kind: LineKind }>`
  white-space: pre;
  color: ${({ $kind }) =>
    $kind === 'ok'
      ? 'var(--accent-ink)'
      : $kind === 'dim'
        ? 'color-mix(in srgb, var(--text-secondary-color) 65%, transparent)'
        : $kind === 'cmd'
          ? 'var(--text-primary-color)'
          : 'var(--text-secondary-color)'};

  .prompt {
    color: var(--accent-color);
    margin-right: 0.6em;
    user-select: none;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--accent-ink);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
`;

const Cursor = styled.span`
  display: inline-block;
  color: var(--accent-color);

  @media (prefers-reduced-motion: no-preference) {
    animation: ${blink} 1.1s step-end infinite;
  }
`;

export interface AboutTerminalProps {
  /* Index of the bio paragraph currently in view (0-based). */
  beat: number;
}

export default function AboutTerminal({ beat }: AboutTerminalProps) {
  const reduceMotion = useReducedMotion();
  const scene = SCENES[Math.min(Math.max(beat, 0), SCENES.length - 1)];

  return (
    <Window>
      <TitleBar>
        <Dots aria-hidden="true">
          <i />
          <i />
          <i />
        </Dots>
        <FileName>~/about/{scene.file}</FileName>
      </TitleBar>

      <Screen>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={scene.file}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
          >
            {scene.lines.map((line, i) => (
              <Line
                key={`${scene.file}-${i}`}
                $kind={line.kind}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: reduceMotion ? 0 : 0.1 + i * 0.09, duration: 0.2 },
                }}
              >
                {line.kind === 'cmd' && <span className="prompt">$</span>}
                {line.href ? (
                  <a
                    href={line.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                  >
                    {line.text}
                  </a>
                ) : (
                  line.text
                )}
                {i === scene.lines.length - 1 && (
                  <>
                    {' '}
                    <Cursor>▍</Cursor>
                  </>
                )}
              </Line>
            ))}
          </motion.div>
        </AnimatePresence>
      </Screen>
    </Window>
  );
}
