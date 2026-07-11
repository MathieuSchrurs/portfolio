import { describe, it, expect } from 'vitest';
import { toBinaryIndex, decodeBinaryFrame } from './useIgniteBinaryReveal';

describe('toBinaryIndex', () => {
  it('zero-pads to four bits', () => {
    expect(toBinaryIndex(1)).toBe('0001');
    expect(toBinaryIndex(2)).toBe('0010');
    expect(toBinaryIndex(6)).toBe('0110');
  });

  it('matches the entry numerals rendered in the timeline (6 down to 1)', () => {
    const numbers = [6, 5, 4, 3, 2, 1];
    expect(numbers.map(toBinaryIndex)).toEqual([
      '0110',
      '0101',
      '0100',
      '0011',
      '0010',
      '0001',
    ]);
  });

  it('widens past four digits rather than truncating', () => {
    expect(toBinaryIndex(16)).toBe('10000');
  });
});

describe('decodeBinaryFrame', () => {
  const final = '0110';

  it('at progress 1 returns the final value regardless of the RNG', () => {
    // rng forced to always pick "1" — every digit is locked so it never runs.
    expect(decodeBinaryFrame(1, final, () => 0.99)).toBe(final);
    expect(decodeBinaryFrame(1, final, () => 0)).toBe(final);
  });

  it('at progress 0 every digit is a flickered bit from the RNG', () => {
    expect(decodeBinaryFrame(0, final, () => 0.4)).toBe('0000'); // <0.5 -> '0'
    expect(decodeBinaryFrame(0, final, () => 0.6)).toBe('1111'); // >=0.5 -> '1'
  });

  it('locks in left-to-right as progress advances', () => {
    // progress 0.5 over a 4-char string locks the first 2 digits (floor(2)).
    // Remaining flicker digits forced to "1" so the boundary is visible.
    expect(decodeBinaryFrame(0.5, final, () => 0.9)).toBe('01' + '11');
  });

  it('locks one more digit per crossed 1/length boundary', () => {
    const rng = () => 0.9; // flicker -> '1'
    expect(decodeBinaryFrame(0.25, final, rng)).toBe('0' + '111');
    expect(decodeBinaryFrame(0.75, final, rng)).toBe('011' + '1');
  });
});
