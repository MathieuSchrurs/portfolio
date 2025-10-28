import React from 'react';
import styled from 'styled-components';
import { TimelineRow } from './TimelineRow';

export type TimelineVars = Partial<{
  midW: string;
  trunkW: string;
  nodeSize: string;
  rowMin: string;
  cardMax: string;
  rowOverlap: string;
  cardW: string;
  cardStub: string;
}>;

export interface TimelineItem {
  id: string;
  content: React.ReactNode;
  dateLabel?: React.ReactNode; // ✅ new
}

export interface TimelineProps {
  items: TimelineItem[];
  vars?: TimelineVars;
}

const TimelineWrap = styled.ol<{ $vars?: TimelineVars }>`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem;
  list-style: none;
  box-sizing: border-box;

  --timeline-mid-w: 140px;
  --timeline-trunk-w: 1px;
  --timeline-node-size: 15px;
  --timeline-row-min: 120px;
  --timeline-row-overlap: 80px;
  --timeline-card-max: 450px;
  --timeline-card-w: 44%;
  --timeline-card-stub: 0px;

  ${({ $vars }) =>
    $vars &&
    Object.entries($vars)
      .map(([key, value]) => {
        const cssVar = `--timeline-${key.replace(/[A-Z]/g, x => `-${x.toLowerCase()}`)}`;
        return `${cssVar}: ${value};`;
      })
      .join('\n')}

  &::before {
    content: '';
    position: absolute;
    inset-block: 0;
    left: 50%;
    transform: translateX(-50%);
    width: var(--timeline-trunk-w);
    background: var(--border-color);
    z-index: 0;
  }

  @media (max-width: 900px) {
    padding: 2rem 1rem;
    &::before { width: 1px; opacity: 0.5; }
  }
`;

export default function Timeline({ items, vars }: TimelineProps) {
  return (
    <TimelineWrap $vars={vars}>
      {items.map((item, i) => (
        <TimelineRow
          key={item.id}
          id={item.id}
          side={i % 2 === 0 ? 'left' : 'right'}
          dateLabel={item.dateLabel} // ✅ pass through
        >
          {item.content}
        </TimelineRow>
      ))}
    </TimelineWrap>
  );
}
