import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import spinner from '@assets/spinner.png';

const spinAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  background-image: url(${spinner});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  animation: ${spinAnimation} 4s linear infinite;
`;

const LoadingSpinner: FC = () => {
  return <Spinner />;
};

export default LoadingSpinner;
