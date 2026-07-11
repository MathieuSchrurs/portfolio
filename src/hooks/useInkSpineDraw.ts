import { useEffect, type RefObject } from 'react';

interface UseInkSpineDrawOptions {
  prefersReducedMotion: boolean;
  /* Fraction of the viewport height where the "pen" sits; the ink tip
     tracks this line as the user scrolls. */
  penPosition: number;
  /* Vertical offset (px) from an entry's top to its marker center. */
  markerAnchor: number;
}

/* How far the ink is drawn (0..1) given the wrapper's top offset from the
   viewport top, the viewport height, the pen line, and the wrapper's own
   height. Clamped: 0 before the pen reaches the wrapper, 1 once the pen has
   passed its full height. Pure so the scroll math is unit-testable. */
export function computeInkProgress(
  wrapTop: number,
  viewportHeight: number,
  penPosition: number,
  wrapHeight: number,
): number {
  const penY = viewportHeight * penPosition;
  return Math.min(Math.max((penY - wrapTop) / wrapHeight, 0), 1);
}

/* Which entries should be lit given the ink tip's pixel position within the
   wrapper and each entry's marker offset. An entry lights the moment the tip
   reaches its marker (>=), and un-lights again if the tip retreats above it. */
export function computeLitFlags(
  inkTipY: number,
  markerOffsets: number[],
): boolean[] {
  return markerOffsets.map((offset) => inkTipY >= offset);
}

/* Self-drawing ink line: a passive scroll listener (attached only while the
   wrapper is near the viewport, gated by an IntersectionObserver) batches
   work into requestAnimationFrame. Each frame writes a single composited
   transform (scaleY on the ink element) and sets `data-lit` on every
   `li[data-log-entry]` from the ink tip's CURRENT position — fully
   bidirectional, so scrolling back up retracts the ink and un-ignites
   entries again. */
export default function useInkSpineDraw(
  wrapRef: RefObject<HTMLElement | null>,
  inkRef: RefObject<HTMLElement | null>,
  { prefersReducedMotion, penPosition, markerAnchor }: UseInkSpineDrawOptions,
) {
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const wrap = wrapRef.current;
    const ink = inkRef.current;
    if (!wrap || !ink) return undefined;

    const entries = Array.from(
      wrap.querySelectorAll<HTMLLIElement>('li[data-log-entry]'),
    );
    let markerOffsets: number[] = [];
    let wrapHeight = 1;
    let rafId: number | null = null;
    let listening = false;

    const measure = () => {
      wrapHeight = Math.max(wrap.offsetHeight, 1);
      markerOffsets = entries.map((entry) => entry.offsetTop + markerAnchor);
    };

    const stopListening = () => {
      if (listening) {
        listening = false;
        window.removeEventListener('scroll', schedule);
      }
    };

    const update = () => {
      rafId = null;
      const { top } = wrap.getBoundingClientRect();
      const progress = computeInkProgress(
        top,
        window.innerHeight,
        penPosition,
        wrapHeight,
      );
      ink.style.transform = `scaleY(${progress})`;
      const litFlags = computeLitFlags(progress * wrapHeight, markerOffsets);
      entries.forEach((entry, i) => {
        const shouldBeLit = litFlags[i];
        const isLit = entry.dataset.lit === 'true';
        if (shouldBeLit !== isLit) {
          entry.dataset.lit = shouldBeLit ? 'true' : 'false';
        }
      });
    };

    const schedule = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      schedule();
    };

    const startListening = () => {
      if (!listening) {
        listening = true;
        window.addEventListener('scroll', schedule, { passive: true });
      }
    };

    const io = new IntersectionObserver(
      (ioEntries) => {
        if (ioEntries.some((e) => e.isIntersecting)) {
          measure();
          startListening();
          schedule();
        } else {
          stopListening();
        }
      },
      { rootMargin: '25% 0px' },
    );
    io.observe(wrap);
    window.addEventListener('resize', onResize);

    return () => {
      io.disconnect();
      stopListening();
      window.removeEventListener('resize', onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, penPosition, markerAnchor, wrapRef, inkRef]);
}
