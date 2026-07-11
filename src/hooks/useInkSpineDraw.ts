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

/* Render one frame: draw the ink to the current scroll progress and toggle
   each entry's `data-lit` from the ink tip's position. Pulled out of the
   controller so the per-frame work reads as one unit. */
function drawInkFrame(
  wrap: HTMLElement,
  ink: HTMLElement,
  entries: HTMLElement[],
  penPosition: number,
  wrapHeight: number,
  markerOffsets: number[],
) {
  const { top } = wrap.getBoundingClientRect();
  const progress = computeInkProgress(top, window.innerHeight, penPosition, wrapHeight);
  ink.style.transform = `scaleY(${progress})`;
  const litFlags = computeLitFlags(progress * wrapHeight, markerOffsets);
  entries.forEach((entry, i) => {
    if ((entry.dataset.lit === 'true') !== litFlags[i]) {
      entry.dataset.lit = litFlags[i] ? 'true' : 'false';
    }
  });
}

interface ControllerOptions {
  penPosition: number;
  markerAnchor: number;
}

/* Imperative controller for the self-drawing ink line, separated from the
   React lifecycle so the hook stays a thin wrapper. A passive scroll
   listener (attached only while the wrapper is near the viewport, gated by
   an IntersectionObserver) batches work into requestAnimationFrame. Fully
   bidirectional: scrolling back up retracts the ink and un-ignites entries.
   Returns a teardown that removes every listener. */
function createInkSpineController(
  wrap: HTMLElement,
  ink: HTMLElement,
  { penPosition, markerAnchor }: ControllerOptions,
): () => void {
  const entries = Array.from(
    wrap.querySelectorAll<HTMLElement>('li[data-log-entry]'),
  );
  let markerOffsets: number[] = [];
  let wrapHeight = 1;
  let rafId: number | null = null;
  let listening = false;

  const measure = () => {
    wrapHeight = Math.max(wrap.offsetHeight, 1);
    markerOffsets = entries.map((entry) => entry.offsetTop + markerAnchor);
  };
  const update = () => {
    rafId = null;
    drawInkFrame(wrap, ink, entries, penPosition, wrapHeight, markerOffsets);
  };
  const schedule = () => {
    if (rafId === null) rafId = requestAnimationFrame(update);
  };
  const setListening = (on: boolean) => {
    if (on === listening) return;
    listening = on;
    if (on) window.addEventListener('scroll', schedule, { passive: true });
    else window.removeEventListener('scroll', schedule);
  };
  const onResize = () => {
    measure();
    schedule();
  };
  const io = new IntersectionObserver(
    (ioEntries) => {
      if (ioEntries.some((e) => e.isIntersecting)) {
        measure();
        setListening(true);
        schedule();
      } else {
        setListening(false);
      }
    },
    { rootMargin: '25% 0px' },
  );
  io.observe(wrap);
  window.addEventListener('resize', onResize);

  return () => {
    io.disconnect();
    setListening(false);
    window.removeEventListener('resize', onResize);
    if (rafId !== null) cancelAnimationFrame(rafId);
  };
}

/* Thin React wrapper: wire the controller to the wrapper/ink refs for the
   lifetime of the effect (disabled under reduced motion). */
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
    return createInkSpineController(wrap, ink, { penPosition, markerAnchor });
  }, [prefersReducedMotion, penPosition, markerAnchor, wrapRef, inkRef]);
}
