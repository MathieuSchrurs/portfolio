import { useState, useEffect } from 'react';

const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';

type ScrollDirection = 'up' | 'down' | null;

interface ScrollDirectionOptions {
  initialDirection?: ScrollDirection;
  thresholdPixels?: number;
  off?: boolean;
}

const useScrollDirection = ({
  initialDirection = 'up', // Default to 'up' like target seems to imply initially
  thresholdPixels = 0,
  off = false,
}: ScrollDirectionOptions = {}): ScrollDirection => {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>(initialDirection);

  useEffect(() => {
    // Store the last scroll position
    let lastScrollY = window.pageYOffset;
    // Store whether ticking is processing
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      // Ignore scroll events that are too small to matter
      if (Math.abs(scrollY - lastScrollY) < thresholdPixels) {
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    // Add or remove the scroll listener
    if (!off) {
      window.addEventListener('scroll', onScroll);
    } else {
      // Reset scroll direction if 'off' is true
      setScrollDir(initialDirection);
    }

    // Clean up the listener on unmount
    return () => window.removeEventListener('scroll', onScroll);
  }, [initialDirection, thresholdPixels, off]); // Re-run effect if options change

  return scrollDir;
};

export default useScrollDirection;
