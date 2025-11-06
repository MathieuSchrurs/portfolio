import React from 'react';
import styled from 'styled-components';

export type Side = 'left' | 'right';

const Row = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 1fr var(--timeline-mid-w) 1fr;
  align-items: center;
  min-height: var(--timeline-row-min);
  z-index: 1;

  & + & {
    margin-top: calc(var(--timeline-row-overlap) * -1);
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: auto;
    margin-top: 0;
    padding: 1.5rem 0;
  }
`;

const DesktopRow = styled.div`
  display: contents;
  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileRow = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: contents;
  }
`;

const CardCol = styled.div<{ $side: Side }>`
  position: relative;
  display: flex;
  justify-content: ${({ $side }) => ($side === 'left' ? 'flex-end' : 'flex-start')};
  align-items: center;
  z-index: 2;
`;

const CardWrapper = styled.div<{ $side: Side }>`
  position: relative;
  width: 100%;
  max-width: var(--timeline-card-max);
  z-index: 2;

  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
  }
`;

const MiddleCol = styled.div`
  position: relative;
  height: 100%;
  min-height: var(--timeline-row-min);
`;

const DateCol = styled.div<{ $cardSide: Side }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ $cardSide }) => ($cardSide === 'left' ? 'flex-start' : 'flex-end')};
  z-index: 2;
  padding: 0 12px;
`;

const DateText = styled.time<{ $cardSide: Side }>`
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  color: var(--text-secondary-color);
  line-height: 1;
  white-space: nowrap;
  transform: translateY(${({ $cardSide }) => ($cardSide === 'left' ? '-4px' : '4px')});
`;

const DateChip = styled.time`
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  color: var(--text-secondary-color);
  background-color: var(--bg-color);
  padding: 4px 12px;
  border-radius: 20px;
  z-index: 2;
  position: relative;
  margin-bottom: 30px;
`;

const Node = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--timeline-node-size);
  height: var(--timeline-node-size);
  border-radius: 50%;
  background-color: var(--accent-color);
  border: 2px solid var(--border-color);
  transform: translate(-50%, -50%);
  z-index: 3;
`;

const ConnectorSVG = styled.svg<{ $side: Side }>`
  position: absolute;
  top: 0;
  ${({ $side }) => ($side === 'left' ? 'right: 50%;' : 'left: 50%;')}
  width: 50%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`;

export function TimelineRow({
  id,
  side,
  dateLabel,
  children,
}: {
  id: string;
  side: Side;
  dateLabel?: React.ReactNode;
  children: React.ReactNode;
}) {
  const isLeft = side === 'left';

  return (
    <Row data-timeline-row data-id={id}>
      <MobileRow>
        {dateLabel && <DateChip>{dateLabel}</DateChip>}
        <CardWrapper $side={side}>{children}</CardWrapper>
      </MobileRow>

      <DesktopRow>
        <Node />
        <ConnectorSVG $side={side} viewBox="0 0 100 100" preserveAspectRatio="none">
          <line
            x1={isLeft ? 100 : 0}
            y1="50"
            x2={50}
            y2="50"
            stroke="var(--border-color)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </ConnectorSVG>

        {isLeft ? (
          <>
            <CardCol $side="left">
              <CardWrapper $side="left">{children}</CardWrapper>
            </CardCol>
            <MiddleCol />
            <DateCol $cardSide="left">
              {dateLabel && <DateText $cardSide="left">{dateLabel}</DateText>}
            </DateCol>
          </>
        ) : (
          <>
            <DateCol $cardSide="right">
              {dateLabel && <DateText $cardSide="right">{dateLabel}</DateText>}
            </DateCol>
            <MiddleCol />
            <CardCol $side="right">
              <CardWrapper $side="right">{children}</CardWrapper>
            </CardCol>
          </>
        )}
      </DesktopRow>
    </Row>
  );
}
