import ParallaxLayer, { ParallaxLayerProps } from './ParallaxLayer';
import React, { FC } from 'react';
import styled from 'styled-components';

export const StyledParallaxBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export interface ParallaxBackgroundProps {
  className?: string;
  layers: ParallaxLayerProps[];
}

const ParallaxBackground: FC<ParallaxBackgroundProps> = ({
  className,
  layers,
}) => {
  return (
    <StyledParallaxBackground className={className}>
      <Container>
        {layers.map(
          ({ isBackgroundLayer, className, imageSrc, delay, duration }, i) => (
            <ParallaxLayer
              key={i}
              delay={delay}
              duration={duration}
              isBackgroundLayer={isBackgroundLayer}
              className={className}
              imageSrc={imageSrc}
            />
          )
        )}
      </Container>
    </StyledParallaxBackground>
  );
};

export default ParallaxBackground;
