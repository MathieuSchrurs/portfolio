import { useEffect, useState } from 'react';

/* Format a 1-based entry ordinal as a zero-padded 4-bit binary string
   ("1" -> "0001", "6" -> "0110"). Four digits comfortably covers the entry
   count; values that overflow 4 bits just render wider. */
export const toBinaryIndex = (n: number) => n.toString(2).padStart(4, '0');

/* One frame of the decode reveal. Digits left of `progress`'s lock point show
   their final value; the rest flicker to a random bit. At progress 1 every
   digit is locked, so the result equals `finalValue` regardless of `rng`.
   `rng` is injected (defaults to Math.random) so the flicker is testable. */
export function decodeBinaryFrame(
  progress: number,
  finalValue: string,
  rng: () => number = Math.random,
): string {
  const locked = Math.floor(progress * finalValue.length);
  let next = '';
  for (let i = 0; i < finalValue.length; i += 1) {
    next += i < locked ? finalValue[i] : rng() < 0.5 ? '0' : '1';
  }
  return next;
}

/* Binary "decode" reveal: every time the owning <li>'s `data-lit` attribute
   flips to true (ignition is bidirectional — this can refire after scrolling
   up and back down), the digits rapidly flicker through random 0/1 values
   and lock in left-to-right over ~420ms, landing on the real value in sync
   with the ghost -> lit fade. Skipped entirely under reduced motion. */
export default function useIgniteBinaryReveal(
  ref: React.RefObject<HTMLElement | null>,
  finalValue: string,
  shouldReduceMotion: boolean,
) {
  const [displayValue, setDisplayValue] = useState(finalValue);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(finalValue);
      return undefined;
    }
    const li = ref.current?.parentElement as HTMLElement | null;
    if (!li) return undefined;

    let rafId: number | null = null;
    const duration = 420;

    const runDecode = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        setDisplayValue(decodeBinaryFrame(progress, finalValue));
        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setDisplayValue(finalValue);
          rafId = null;
        }
      };
      rafId = requestAnimationFrame(step);
    };

    if (li.dataset.lit === 'true') {
      setDisplayValue(finalValue);
    }

    const observer = new MutationObserver(() => {
      if (li.dataset.lit === 'true') {
        runDecode();
      }
    });
    observer.observe(li, { attributes: true, attributeFilter: ['data-lit'] });

    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [finalValue, shouldReduceMotion, ref]);

  return displayValue;
}
