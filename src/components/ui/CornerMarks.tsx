import styled from 'styled-components';

const CORNER_PX = 14;
const BORDER_PX = 2;

/* Four L-shaped accent marks, one per corner of the nearest positioned
   ancestor. Each mark is drawn with two borders (top/left for TL, etc.) —
   bulletproof across browsers, no mask-composite or clip-path hacks. */
const CornerMark = styled.span<{
  $corner: 'tl' | 'tr' | 'bl' | 'br';
}>`
  position: absolute;
  width: ${CORNER_PX}px;
  height: ${CORNER_PX}px;
  pointer-events: none;

  ${({ $corner }) => {
    const accent = 'color-mix(in srgb, var(--accent-color) 60%, transparent)';
    const pos = {
      tl: { top: 0, left: 0, borderTop: `${BORDER_PX}px solid ${accent}`, borderLeft: `${BORDER_PX}px solid ${accent}` },
      tr: { top: 0, right: 0, borderTop: `${BORDER_PX}px solid ${accent}`, borderRight: `${BORDER_PX}px solid ${accent}` },
      bl: { bottom: 0, left: 0, borderBottom: `${BORDER_PX}px solid ${accent}`, borderLeft: `${BORDER_PX}px solid ${accent}` },
      br: { bottom: 0, right: 0, borderBottom: `${BORDER_PX}px solid ${accent}`, borderRight: `${BORDER_PX}px solid ${accent}` },
    }[$corner];
    return Object.entries(pos)
      .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v};`)
      .join('\n');
  }}
`;

const CornerMarks = () => (
  <>
    <CornerMark $corner="tl" aria-hidden="true" />
    <CornerMark $corner="tr" aria-hidden="true" />
    <CornerMark $corner="bl" aria-hidden="true" />
    <CornerMark $corner="br" aria-hidden="true" />
  </>
);

export default CornerMarks;
