import { useEffect } from 'react';

interface UseInkSpineDrawOptions {
  prefersReducedMotion: boolean;
  /* Fraction of the viewport height where the "pen" sits; the ink tip
     tracks this line as the user scrolls. */
  penPosition: number;
  /* Vertical offset (px) from an entry's top to its marker center. */
  markerAnchor: number;
}

/* Self-drawing ink line: a passive scroll listener (attached only while the
   wrapper is near the viewport, gated by an IntersectionObserver) batches
   work into requestAnimationFrame. Each frame writes a single composited
   transform (scaleY on the ink element) and sets `data-lit` on every
   `li[data-log-entry]` from the ink tip's CURRENT position — fully
   bidirectional, so scrolling back up retracts the ink and un-ignites
   entries again. */
export default function useInkSpineDraw(
  wrapRef: React.RefObject<HTMLElement | null>,
  inkRef: React.RefObject<HTMLElement | null>,
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
      const penY = window.innerHeight * penPosition;
      const progress = Math.min(Math.max((penY - top) / wrapHeight, 0), 1);
      ink.style.transform = `scaleY(${progress})`;
      const inkTipY = progress * wrapHeight;
      entries.forEach((entry, i) => {
        const shouldBeLit = inkTipY >= markerOffsets[i];
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
