/* Pure sweep-timing math for TechStackReel, kept in its own module so the
   component file only exports a component (Vite fast-refresh requirement)
   and so this logic — which has regressed before — is unit-testable. */

/* Fractional container-width of entrance pre-roll. A full container-width
   left a stretch where the reel was on screen but empty before the first
   card entered; 0.35 gets the first card sliding in almost as soon as the
   reel appears. */
export const REEL_PREROLL = 0.35;

/* The track's x sweep, from entry to exit, given the viewport and full
   track widths. `from` is the pre-roll offset in from the right; `to`
   slides the whole track fully off the left edge. */
export function computeReelRange(
  containerWidth: number,
  trackWidth: number,
): { from: number; to: number } {
  return { from: containerWidth * REEL_PREROLL, to: -trackWidth };
}
