import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '../../hooks';

const FLIP_DURATION = '0.8s';
const FLIP_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const CORNER_PX = 14;
const BORDER_PX = 2;

const CardWrapper = styled.div<{ $tilt?: string }>`
  perspective: 1000px;
  min-height: 220px;
  ${({ $tilt }) => $tilt && `transform: ${$tilt};`}
`;

const CardInner = styled.div<{ $flipped: boolean; $reduceMotion: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 220px;
  transform-style: preserve-3d;
  transition: transform ${FLIP_DURATION} ${FLIP_EASING};

  ${({ $flipped, $reduceMotion }) =>
    !$reduceMotion && $flipped && `transform: rotateY(180deg);`}

  ${({ $reduceMotion }) =>
    $reduceMotion && `transform: none;`}
`;

/* Each face renders 4 absolutely-positioned corner marks. Each mark is an
   L-shape drawn with two 1px borders (top/left for TL, top/right for TR,
   etc.) and coloured with the accent. This approach is bulletproof across
   browsers — no mask-composite or clip-path hacks needed. */
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

const Face = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  background-color: var(--card-bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.25rem 1.5rem;
`;

const Corners = () => (
  <>
    <CornerMark $corner="tl" />
    <CornerMark $corner="tr" />
    <CornerMark $corner="bl" />
    <CornerMark $corner="br" />
  </>
);

const FrontFace = styled(Face)`
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const BackFace = styled(Face)`
  transform: rotateY(180deg);
  justify-content: flex-start;
`;

const FrontIcon = styled.div`
  svg {
    width: 36px;
    height: 36px;
    color: var(--accent-color);
    opacity: 0.85;
  }
`;

const FrontTitle = styled.h3`
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: var(--fz-sm);
  font-weight: 600;
  color: var(--text-primary-color);
  text-align: center;
  margin: 0;
`;

export interface FlipCardProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: ReactNode;
  style?: CSSProperties;
  /** CSS transform string for a subtle per-card tilt quirk (e.g. "rotate(-0.5deg)"). */
  $tilt?: string;
}

export default function FlipCard({ title, icon: Icon, children, style, $tilt }: FlipCardProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const touchUsed = useRef(false);

  const handlePointerEnter = useCallback(() => {
    if (touchUsed.current) return;
    setFlipped(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (touchUsed.current) return;
    setFlipped(false);
  }, []);

  const handleClick = useCallback(() => {
    touchUsed.current = true;
    setFlipped((prev) => !prev);
    setTimeout(() => {
      touchUsed.current = false;
    }, 1000);
  }, []);

  return (
    <CardWrapper
      $tilt={$tilt}
      style={style}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <CardInner $flipped={flipped} $reduceMotion={reduceMotion}>
        <FrontFace>
          <Corners />
          <FrontIcon>
            <Icon aria-hidden="true" />
          </FrontIcon>
          <FrontTitle>{title}</FrontTitle>
        </FrontFace>
        <BackFace>
          <Corners />
          {children}
        </BackFace>
      </CardInner>
    </CardWrapper>
  );
}
