import { ComponentTypes } from '@typings';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import borderArrowClick from './assets/border-arrow-click.png';
import borderArrowDisabled from './assets/border-arrow-disabled.png';
import borderArrowHover from './assets/border-arrow-hover.png';
import borderArrowUp from './assets/border-arrow-up.png';

const ButtonStateBase = styled.div`
  position: absolute;
  opacity: 0;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  transition: 0.3s all ease;
  top: 2px;
  bottom: 2px;
`;

const Default = styled(ButtonStateBase)`
  opacity: 1;
  background-image: url(${borderArrowUp});
`;

const Click = styled(ButtonStateBase)`
  background-image: url(${borderArrowClick});
`;
const Hover = styled(ButtonStateBase)`
  background-image: url(${borderArrowHover});
`;
const Disabled = styled(ButtonStateBase)`
  background-image: url(${borderArrowDisabled});
`;

const StyledArrowButton = styled.button<{ rotated?: boolean }>`
  display: block;
  height: 48px;
  width: 44px;
  background-color: transparent;
  border: 0;
  padding: 0;
  appearance: none;
  cursor: pointer;
  position: relative;

  ${({ rotated }) =>
    rotated &&
    css`
      transform: rotate(180deg);
    `};

  &:hover ${Hover} {
    opacity: 1;
  }

  &:active ${Click} {
    opacity: 1;
  }

  &:disabled {
    cursor: default;
    pointer-events: none;
    ${Disabled} {
      opacity: 1;
    }
  }
`;

export interface ArrowButtonProps extends ComponentTypes.ButtonProps {
  rotated?: boolean;
  label: string;
}

const ArrowButton: FC<ArrowButtonProps> = ({
  disabled,
  rotated,
  label,
  className,
  type,
  onClick,
}) => {
  return (
    <StyledArrowButton
      className={className}
      type={type}
      aria-label={label}
      disabled={disabled}
      rotated={rotated}
      onClick={onClick}
    >
      <Default />
      <Hover />
      <Click />
      <Disabled />
    </StyledArrowButton>
  );
};

export default ArrowButton;
