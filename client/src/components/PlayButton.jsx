import styled from 'styled-components';
import { RiPlayFill } from 'react-icons/ri';
import React from 'react';

const StyledPlayButton = styled.button`
  height: ${({ $size }) => ($size ? $size + 'rem' : '3.2rem')};
  width: ${({ $size }) => ($size ? $size + 'rem' : '3.2rem')};
  box-shadow: ${({ $hasShadow }) =>
    $hasShadow ? '0 8px 8px rgba(0, 0, 0, 0.3)' : 'none'};

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-brand);
  border-radius: 5rem;
  transition: all 0.1s;

  svg {
    font-size: ${({ $iconSize }) => ($iconSize ? $iconSize + 'rem' : '1.6rem')};
  }

  &:hover {
    scale: 1.04;
  }

  &:active {
    background-color: var(--color-brand-press);
    scale: 1;
  }
`;

const PlayButton = ({ size, iconSize, hasShadow = false, onClick }) => {
  return (
    <StyledPlayButton
      $size={size}
      $iconSize={iconSize}
      $hasShadow={hasShadow}
      onClick={onClick}
    >
      <RiPlayFill />
    </StyledPlayButton>
  );
};

export default PlayButton;
