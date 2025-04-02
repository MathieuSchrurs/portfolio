import React from 'react';
import styled from 'styled-components';

interface StyledSideElementProps {
  orientation: 'left' | 'right';
}

const StyledSideElement = styled.div<StyledSideElementProps>`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${(props) => (props.orientation === 'left' ? '40px' : 'auto')};
  right: ${(props) => (props.orientation === 'left' ? 'auto' : '40px')};
  z-index: 10;
  color: var(--light-slate);

  @media (max-width: 1080px) {
    left: ${(props) => (props.orientation === 'left' ? '20px' : 'auto')};
    right: ${(props) => (props.orientation === 'left' ? 'auto' : '20px')};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

interface SideProps {
  children: React.ReactNode;
  orientation: 'left' | 'right';
}

const Side: React.FC<SideProps> = ({ children, orientation }) => {
  return (
    <StyledSideElement orientation={orientation}>
      {children}
    </StyledSideElement>
  );
};

export default Side;