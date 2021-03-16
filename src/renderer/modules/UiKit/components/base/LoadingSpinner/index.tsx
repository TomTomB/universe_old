import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import spinner from '@assets/components/spinner/spinner.png';

const spinAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledLoadingSpinner = styled.div`
  background-image: url(${spinner});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  animation: ${spinAnimation} 4s linear infinite;
`;

const LoadingSpinner: FC = () => {
  return <StyledLoadingSpinner />;
};

export default LoadingSpinner;
