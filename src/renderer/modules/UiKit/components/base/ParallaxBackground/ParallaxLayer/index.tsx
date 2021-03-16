import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

const flowAnimation = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  45% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

export const StyledParallaxLayer = styled.div<ParallaxLayerProps>`
  --delay: ${({ delay }) => delay}ms;
  --duration: ${({ duration }) => duration}s;

  width: 100%;
  height: 100%;
  position: absolute;
  background-size: contain;
  backface-visibility: hidden;
  background-image: url(${({ imageSrc }) => imageSrc});
  animation: ${flowAnimation} var(--duration, 30s) linear var(--delay, 0)
    infinite;
  opacity: 0;

  ${({ isBackgroundLayer }) =>
    isBackgroundLayer &&
    css`
      background-repeat: no-repeat;
      animation: none;
      opacity: 1;
    `}
`;

export interface ParallaxLayerProps {
  className?: string;
  isBackgroundLayer?: boolean;
  delay: number;
  duration: number;
  imageSrc: string;
}

const ParallaxLayer: FC<ParallaxLayerProps> = ({
  className,
  isBackgroundLayer,
  imageSrc,
  delay,
  duration,
}) => {
  return (
    <StyledParallaxLayer
      className={className}
      imageSrc={imageSrc}
      delay={delay}
      duration={duration}
      isBackgroundLayer={isBackgroundLayer}
    />
  );
};

export default ParallaxLayer;
