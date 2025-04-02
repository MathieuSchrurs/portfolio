import React from 'react';
import styled from 'styled-components';
// Import hooks and utils later if needed for transitions
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { loaderDelay } from '@utils';
// import { usePrefersReducedMotion } from '@hooks';

interface StyledSideElementProps {
  orientation: 'left' | 'right';
}

const StyledSideElement = styled.div<StyledSideElementProps>`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${(props) => (props.orientation === 'left' ? '40px' : 'auto')};
  right: ${(props) => (props.orientation === 'left' ? 'auto' : '40px')};
  z-index: 10; // Match target z-index
  color: var(--light-slate); // Use theme variable

  @media (max-width: 1080px) {
    left: ${(props) => (props.orientation === 'left' ? '20px' : 'auto')};
    right: ${(props) => (props.orientation === 'left' ? 'auto' : '20px')};
  }

  @media (max-width: 768px) {
    display: none; // Hide on mobile like target
  }
`;

interface SideProps {
  children: React.ReactNode;
  isHome: boolean;
  orientation: 'left' | 'right';
}

const Side: React.FC<SideProps> = ({ children, orientation }) => {
  // Add state and effects for animations later if needed
  // const [isMounted, setIsMounted] = useState(!isHome);
  // const prefersReducedMotion = usePrefersReducedMotion();

  // useEffect(() => {
  //   if (!isHome || prefersReducedMotion) {
  //     return;
  //   }
  //   const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
  //   return () => clearTimeout(timeout);
  // }, [isHome, prefersReducedMotion]);

  return (
    <StyledSideElement orientation={orientation}>
      {children}
    </StyledSideElement>
  );
};

export default Side;
