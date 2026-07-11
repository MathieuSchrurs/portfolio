import { useEffect, useState } from 'react';

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
        const locked = Math.floor(progress * finalValue.length);
        let next = '';
        for (let i = 0; i < finalValue.length; i += 1) {
          next += i < locked ? finalValue[i] : Math.random() < 0.5 ? '0' : '1';
        }
        setDisplayValue(next);
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
