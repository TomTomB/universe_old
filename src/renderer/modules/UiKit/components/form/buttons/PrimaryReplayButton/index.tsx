import React, { FC } from 'react';
import buttonReplay from '@assets/buttons/replay/button-replay.png';
import buttonReplayHover from '@assets/buttons/replay/button-replay-hover.png';
import buttonReplayActive from '@assets/buttons/replay/button-replay-active.png';
import styled from 'styled-components';

interface PrimaryReplayButtonProps {
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const StyledPrimaryReplayButton = styled.button`
  background-image: url(${buttonReplay});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 49px;
  height: 49px;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;

  &:hover,
  &:focus-visible {
    background-image: url(${buttonReplayHover});
  }
  &:active {
    background-image: url(${buttonReplayActive});
  }
  &:disabled {
    pointer-events: none;
    cursor: default;
    background-image: url(${buttonReplayActive});
    opacity: 0.5;
  }
`;

const PrimaryReplayButton: FC<PrimaryReplayButtonProps> = ({
  disabled,
  className,
  onClick,
}) => {
  return (
    <StyledPrimaryReplayButton
      className={className}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default PrimaryReplayButton;
