import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import config from '@config';
import { useThemeMode } from '@context/ThemeModeContext';

/*
 * Cmd/Ctrl+K command palette. A single overlay that indexes every navigable
 * destination and quick action on the site (jump to a section, download the
 * CV, flip the theme, open a social link) behind a fuzzy-ish substring search
 * with full keyboard control. On-theme for a terminal/systems aesthetic, and
 * the primary "show me you can build real front-end" flourish.
 *
 * State is owned by the parent (Layout) so the bottom status bar's hint can
 * open the same instance; this component owns the global Cmd/Ctrl+K listener,
 * Escape-to-close, scroll lock, and focus restoration.
 */

type Kind = 'section' | 'action' | 'external';

interface Command {
  id: string;
  label: string;
  kind: Kind;
  keywords: string;
  run: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: clamp(1rem, 15vh, 9rem) 1rem 1rem;
  background-color: color-mix(in srgb, var(--bg-color) 55%, transparent);
  backdrop-filter: blur(4px);
`;

const Panel = styled(motion.div)`
  width: 100%;
  max-width: 560px;
  background-color: var(--card-bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: 0 24px 60px -20px var(--shadow-color);
  overflow: hidden;
  font-family: var(--font-mono);
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--border-color);

  .prompt {
    color: var(--accent-color);
    user-select: none;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    padding: 0;
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    color: var(--text-primary-color);

    &:focus {
      outline: none;
      border: 0;
    }

    &::placeholder {
      color: var(--text-secondary-color);
    }
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  max-height: min(50vh, 360px);
  overflow-y: auto;
`;

const Item = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? 'var(--text-primary-color)' : 'var(--text-secondary-color)'};
  background-color: ${({ $active }) =>
    $active ? 'var(--accent-tint-color)' : 'transparent'};
  box-shadow: ${({ $active }) =>
    $active ? 'inset 2px 0 0 0 var(--accent-color)' : 'none'};

  .glyph {
    color: var(--accent-color);
    flex-shrink: 0;
    width: 1.1em;
    text-align: center;
  }

  .label {
    flex: 1;
    font-size: var(--fz-sm);
  }

  .kind {
    font-size: var(--fz-xxs);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-secondary-color);
    opacity: 0.7;
  }
`;

const Empty = styled.li`
  padding: 1.25rem 0.75rem;
  font-size: var(--fz-sm);
  color: var(--text-secondary-color);
  text-align: center;
`;

const Hints = styled.div`
  display: flex;
  gap: 1.1rem;
  padding: 0.6rem 1rem;
  border-top: 1px solid var(--border-color);
  font-size: var(--fz-xxs);
  color: var(--text-secondary-color);

  kbd {
    font-family: inherit;
    color: var(--text-primary-color);
  }
`;

const GLYPH: Record<Kind, string> = {
  section: '→',
  action: '»',
  external: '↗',
};

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const { themeMode, toggleThemeMode } = useThemeMode();
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (url: string) => () => {
      const id = url.split('#')[1];
      const el = id ? document.getElementById(id) : null;
      el?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    };

    const navCommands: Command[] = config.navLinks.map((link) => ({
      id: `nav-${link.name}`,
      label: link.name,
      kind: 'section',
      keywords: `${link.name} section jump goto`.toLowerCase(),
      run: go(link.url),
    }));

    const actionCommands: Command[] = [
      {
        id: 'download-cv',
        label: 'Download CV',
        kind: 'action',
        keywords: 'download cv resume pdf',
        run: () => {
          const a = document.createElement('a');
          a.href = '/cv-mathieu-schrurs.pdf';
          a.download = 'Mathieu_Schrurs_CV.pdf';
          a.click();
        },
      },
      {
        id: 'view-cv',
        label: 'Open CV as web page',
        kind: 'action',
        keywords: 'cv resume web page view online',
        run: () => {
          window.location.href = '/cv';
        },
      },
      {
        id: 'toggle-theme',
        label: `Switch to ${themeMode === 'light' ? 'dark' : 'light'} theme`,
        kind: 'action',
        keywords: 'theme dark light toggle mode appearance',
        run: toggleThemeMode,
      },
    ];

    const externalCommands: Command[] = config.socialMedia.map((social) => ({
      id: `ext-${social.name}`,
      label: social.name,
      kind: 'external',
      keywords: `${social.name} social profile link`.toLowerCase(),
      run: () => window.open(social.url, '_blank', 'noopener,noreferrer'),
    }));

    const emailCommand: Command = {
      id: 'email',
      label: 'Email me',
      kind: 'external',
      keywords: 'email mail contact reach message',
      run: () => {
        window.location.href = `mailto:${config.email}`;
      },
    };

    return [...navCommands, ...actionCommands, ...externalCommands, emailCommand];
  }, [themeMode, toggleThemeMode, reduceMotion]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q),
    );
  }, [commands, query]);

  const close = useCallback(() => setOpen(false), [setOpen]);

  const runCommand = useCallback(
    (command: Command | undefined) => {
      if (!command) return;
      close();
      command.run();
    },
    [close],
  );

  /* Global open/close shortcut, live for the component's whole lifetime. */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  /* On open: reset query/selection, remember focus, focus the input, and lock
     body scroll. Restore everything on close. */
  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setActive(0);
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      restoreFocusRef.current?.focus?.();
    };
  }, [open]);

  /* Keep the selection in range as the filtered list shrinks. */
  useEffect(() => {
    setActive((prev) => (prev >= filtered.length ? 0 : prev));
  }, [filtered.length]);

  /* Scroll the active row into view when arrowing past the visible edge. */
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(filtered[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  const duration = reduceMotion ? 0 : 0.16;

  return (
    <AnimatePresence>
      {open && (
        <Overlay
          role="presentation"
          onMouseDown={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
        >
          <Panel
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onMouseDown={(e) => e.stopPropagation()}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          >
            <InputRow>
              <span className="prompt" aria-hidden="true">
                &gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                autoComplete="off"
                spellCheck={false}
              />
            </InputRow>

            <List ref={listRef} role="listbox" aria-label="Commands">
              {filtered.length === 0 && <Empty>No matches</Empty>}
              {filtered.map((command, index) => (
                <Item
                  key={command.id}
                  data-index={index}
                  role="option"
                  aria-selected={index === active}
                  $active={index === active}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => runCommand(command)}
                >
                  <span className="glyph" aria-hidden="true">
                    {GLYPH[command.kind]}
                  </span>
                  <span className="label">{command.label}</span>
                  <span className="kind">{command.kind}</span>
                </Item>
              ))}
            </List>

            <Hints aria-hidden="true">
              <span>
                <kbd>↑↓</kbd> navigate
              </span>
              <span>
                <kbd>⏎</kbd> select
              </span>
              <span>
                <kbd>esc</kbd> close
              </span>
            </Hints>
          </Panel>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
