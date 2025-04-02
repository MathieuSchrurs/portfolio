import React from 'react';
import styled from 'styled-components';

interface SectionHeadingProps {
    sectionNumber: string;
    children: React.ReactNode;
    className?: string;
}

const StyledHeading = styled.h2<Pick<SectionHeadingProps, 'sectionNumber'>>`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0 40px;
  width: 100%;
  font-size: clamp(26px, 5vw, var(--fz-heading));
  color: var(--text-primary-color);
  white-space: nowrap;
  font-family: var(--font-sans);

  &:before {
    position: relative;
    bottom: 4px;
    /* Use the prop to generate the content dynamically */
    content: '0${(props) => props.sectionNumber}.';
    margin-right: 10px;
    color: var(--accent-color);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
    font-weight: 400;

    @media (max-width: 480px) {
      margin-bottom: -3px;
      margin-right: 5px;
    }
  }

  &:after {
    content: '';
    display: block;
    position: relative;
    top: -5px;
    width: 300px;
    height: 1px;
    margin-left: 20px;
    background-color: var(--border-color);

    @media (max-width: 1080px) {
      width: 200px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      margin-left: 10px;
    }
  }
`;

const SectionHeading: React.FC<SectionHeadingProps> = ({
    sectionNumber,
    children,
    className,
}) => {
    return (
        <StyledHeading sectionNumber={sectionNumber} className={className}>
            {children}
        </StyledHeading>
    );
};

export default SectionHeading;
