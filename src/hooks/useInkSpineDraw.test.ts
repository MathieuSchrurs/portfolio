import { describe, it, expect } from 'vitest';
import { computeInkProgress, computeLitFlags } from './useInkSpineDraw';

describe('computeInkProgress', () => {
  const viewportHeight = 1000;
  const penPosition = 0.72; // pen line at y = 720
  const wrapHeight = 2000;

  it('is 0 while the wrapper top is still below the pen line', () => {
    // wrapTop 800 > penY 720 -> negative raw progress, clamped to 0
    expect(computeInkProgress(800, viewportHeight, penPosition, wrapHeight)).toBe(0);
  });

  it('grows as the wrapper scrolls up past the pen line', () => {
    // penY 720, wrapTop 0 -> 720/2000 = 0.36
    expect(
      computeInkProgress(0, viewportHeight, penPosition, wrapHeight),
    ).toBeCloseTo(0.36);
    // wrapTop -280 -> (720 - -280)/2000 = 1000/2000 = 0.5
    expect(
      computeInkProgress(-280, viewportHeight, penPosition, wrapHeight),
    ).toBeCloseTo(0.5);
  });

  it('clamps to 1 once the pen has passed the full wrapper height', () => {
    // wrapTop -2000 -> (720 + 2000)/2000 = 1.36, clamped to 1
    expect(computeInkProgress(-2000, viewportHeight, penPosition, wrapHeight)).toBe(1);
  });

  it('never divides by zero for a zero-height wrapper', () => {
    // guarded upstream by Math.max(offsetHeight, 1); with height 1 it stays finite
    const p = computeInkProgress(0, viewportHeight, penPosition, 1);
    expect(Number.isFinite(p)).toBe(true);
    expect(p).toBe(1); // 720/1 clamped to 1
  });
});

describe('computeLitFlags', () => {
  const markerOffsets = [100, 400, 900, 1500];

  it('lights entries whose marker the ink tip has reached', () => {
    expect(computeLitFlags(0, markerOffsets)).toEqual([false, false, false, false]);
    expect(computeLitFlags(450, markerOffsets)).toEqual([true, true, false, false]);
    expect(computeLitFlags(2000, markerOffsets)).toEqual([true, true, true, true]);
  });

  it('lights an entry exactly at its marker (>=, not >)', () => {
    expect(computeLitFlags(400, markerOffsets)).toEqual([true, true, false, false]);
  });

  it('un-lights entries when the tip retreats above their marker', () => {
    // bidirectional: same tip position always yields the same flags
    expect(computeLitFlags(399, markerOffsets)).toEqual([true, false, false, false]);
  });
});
