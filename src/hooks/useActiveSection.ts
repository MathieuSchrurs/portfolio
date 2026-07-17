import { useEffect, useState } from 'react';

/*
 * Tracks which page section is currently in view, for the status bar's
 * "mode" block. An IntersectionObserver watches every section against a thin
 * activation band across the vertical middle of the viewport (the negative
 * top/bottom rootMargin); whichever sections currently cross that band are
 * held in a set, and the topmost one in document order wins. That keeps a
 * single, stable active id as you scroll, with no per-scroll listener.
 *
 * `ids` must be a stable array reference (memoize it in the caller) so the
 * observer isn't torn down and rebuilt on every render.
 */
export default function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return undefined;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        const current = ids.find((id) => visible.has(id));
        if (current) setActive(current);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
