/*
 * Vitest global setup. Runs before every test file in both the Node and jsdom
 * environments, so anything touching `window` is guarded — it's only present
 * under jsdom.
 *
 * jsdom ships no matchMedia and no ResizeObserver/IntersectionObserver, which
 * motion's useReducedMotion/useScroll and our own hooks rely on. We install
 * inert defaults so a component mount doesn't throw on missing globals; tests
 * that care about a specific media state (e.g. prefers-reduced-motion) reassign
 * window.matchMedia themselves.
 */

if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList;
  }

  class InertObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }

  if (!window.ResizeObserver) {
    window.ResizeObserver = InertObserver as unknown as typeof ResizeObserver;
  }
  if (!window.IntersectionObserver) {
    window.IntersectionObserver =
      InertObserver as unknown as typeof IntersectionObserver;
  }
}
