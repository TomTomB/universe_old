import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';
import spinner from './assets/spinner.png';
import spinnerLarge from './assets/spinner-large.png';

const spinAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledLoadingSpinner = styled.div<{ isLarge?: boolean }>`
  background-image: url(${spinner});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  animation: ${spinAnimation} 4s linear infinite;

  ${({ isLarge }) =>
    isLarge &&
    css`
      background-image: url(${spinnerLarge});
      width: 60px;
      height: 60px;
    `}
`;

export interface LoadingSpinnerProps {
  isLarge?: boolean;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ isLarge }) => {
  return <StyledLoadingSpinner isLarge={isLarge} />;
};

export default LoadingSpinner;
