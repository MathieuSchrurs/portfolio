import React from "react";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const StyledHamburger = styled.button<{ $open: boolean }>`
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 20;
  vertical-align: middle;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    position: absolute;
    width: 20px;
    height: 2px;
    border-radius: 2px;
    background-color: var(--text-primary-color);
    transition: 0.3s ease;

    &:nth-child(1) {
      top: ${({ $open }) => ($open ? "50%" : "calc(50% - 8px)")};
      transform: ${({ $open }) =>
        $open ? "translateY(-50%) rotate(45deg)" : "none"};
    }

    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      opacity: ${({ $open }) => ($open ? 0 : 1)};
    }

    &:nth-child(3) {
      top: ${({ $open }) => ($open ? "50%" : "calc(50% + 8px)")};
      transform: ${({ $open }) =>
        $open ? "translateY(-50%) rotate(-45deg)" : "none"};
    }
  }
`;


const HamburgerButton: React.FC<Props> = ({ isOpen, toggle }) => {
  return (
    <StyledHamburger onClick={toggle} $open={isOpen} aria-label="Toggle menu">
      <span />
      <span />
      <span />
    </StyledHamburger>
  );
};

export default HamburgerButton;
