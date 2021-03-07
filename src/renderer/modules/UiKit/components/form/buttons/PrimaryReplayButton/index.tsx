import React, { FC } from 'react';
import buttonReplay from '@assets/components/buttons/replay/button-replay.png';
import buttonReplayHover from '@assets/components/buttons/replay/button-replay-hover.png';
import buttonReplayActive from '@assets/components/buttons/replay/button-replay-active.png';
import styled from 'styled-components';

export interface PrimaryReplayButtonProps {
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonStateBase = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 300ms cubic-bezier(0, 0, 0, 1);
`;

const ButtonStateDefault = styled(ButtonStateBase)`
  background-image: url(${buttonReplay});
`;

const ButtonStateHover = styled(ButtonStateBase)`
  background-image: url(${buttonReplayHover});
`;

const ButtonStateActive = styled(ButtonStateBase)`
  background-image: url(${buttonReplayActive});
`;

const StyledPrimaryReplayButton = styled.button`
  width: 49px;
  height: 49px;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  position: relative;
  transition: opacity 300ms cubic-bezier(0, 0, 0, 1);

  ${ButtonStateDefault} {
    opacity: 1;
  }

  &:hover,
  &:focus-visible {
    ${ButtonStateHover} {
      opacity: 1;
    }
  }

  &:active {
    ${ButtonStateActive} {
      opacity: 1;
    }
  }

  &:disabled {
    pointer-events: none;
    cursor: default;
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
    >
      <ButtonStateDefault />
      <ButtonStateHover />
      <ButtonStateActive />
    </StyledPrimaryReplayButton>
  );
};

export default PrimaryReplayButton;
