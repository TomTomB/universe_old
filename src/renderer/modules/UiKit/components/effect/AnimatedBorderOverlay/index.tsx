import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import noiseTileAlphaTintLarge from '@assets/components/noise/noise-tile-alpha-tint-large.png';
import noiseTileAlphaTintSmall from '@assets/components/noise/noise-tile-alpha-tint-small.png';

export interface AnimatedBorderOverlayProps {
  speed?: number;
  className?: string;
}

const borderNoiseScrollAnimation = keyframes`
  0% {
    background-position: 0 center;
  }
  100% {
    background-position: -400% center;
  }
`;

const AnimatedBorderWrapper = styled.div`
  display: block;
  position: relative;
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  top: -6px;
  left: -6px;
  padding: 6px;
  box-sizing: border-box;
  overflow: hidden;
`;

const BorderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BlurEffect = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const BlurEffectHigh = styled(BlurEffect)`
  filter: blur(4px) contrast(1.35);
  opacity: 0.5;
`;

const BlurEffectLow = styled(BlurEffect)`
  filter: blur(2px) contrast(1.15);
  opacity: 0.75;
`;

const GlowMask = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const GlowMaskTop = styled(GlowMask)`
  top: -2px;
  left: -2px;
  -webkit-mask-image: linear-gradient(
    to bottom,
    #000,
    #000 4px,
    transparent 4px,
    transparent
  );
`;

const GlowMaskRight = styled(GlowMask)`
  top: -2px;
  right: -2px;
  -webkit-mask-image: linear-gradient(
    to left,
    #000,
    #000 4px,
    transparent 4px,
    transparent
  );
`;

const GlowMaskBottom = styled(GlowMask)`
  bottom: -2px;
  right: -2px;
  -webkit-mask-image: linear-gradient(
    to top,
    #000,
    #000 4px,
    transparent 4px,
    transparent
  );
`;

const GlowMaskLeft = styled(GlowMask)`
  bottom: -2px;
  left: -2px;
  -webkit-mask-image: linear-gradient(
    to right,
    #000,
    #000 4px,
    transparent 4px,
    transparent
  );
`;

const GlowContent = styled.div<{ speed: number }>`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: 200%;

  &.scroll {
    background-image: url(${noiseTileAlphaTintLarge});
    animation: ${borderNoiseScrollAnimation} ${props => props.speed}ms linear
      infinite;
  }
  &.overlay {
    background-image: url(${noiseTileAlphaTintSmall});
    animation: ${borderNoiseScrollAnimation} ${props => props.speed}ms linear
      infinite;
  }
  &.top {
    width: 200%;
    transform: translateY(-50%) translateX(-25%);
  }
  &.bottom {
    width: 200%;
    transform: translateY(50%) translateX(-25%) rotate(180deg) scaleY(-1);
  }
  &.left {
    transform: translateX(-50%) rotate(270deg) scaleY(-1);
  }
  &.right {
    transform: translateX(50%) rotate(90deg) scaleY(-1);
  }
`;

const AnimatedBorderOverlay: FC<AnimatedBorderOverlayProps> = ({
  speed = 25000,
  className,
}) => {
  return (
    <AnimatedBorderWrapper className={className}>
      <BorderContainer>
        <BlurEffectHigh>
          <GlowMaskTop>
            <GlowContent speed={speed} className="scroll top" />
            <GlowContent speed={speed} className="overlay top" />
          </GlowMaskTop>
          <GlowMaskRight>
            <GlowContent speed={speed} className="scroll right" />
            <GlowContent speed={speed} className="overlay right" />
          </GlowMaskRight>
          <GlowMaskBottom>
            <GlowContent speed={speed} className="scroll bottom" />
            <GlowContent speed={speed} className="overlay bottom" />
          </GlowMaskBottom>
          <GlowMaskLeft>
            <GlowContent speed={speed} className="scroll left" />
            <GlowContent speed={speed} className="overlay left" />
          </GlowMaskLeft>
        </BlurEffectHigh>
        <BlurEffectLow>
          <GlowMaskTop>
            <GlowContent speed={speed} className="scroll top" />
            <GlowContent speed={speed} className="overlay top" />
          </GlowMaskTop>
          <GlowMaskRight>
            <GlowContent speed={speed} className="scroll right" />
            <GlowContent speed={speed} className="overlay right" />
          </GlowMaskRight>
          <GlowMaskBottom>
            <GlowContent speed={speed} className="scroll bottom" />
            <GlowContent speed={speed} className="overlay bottom" />
          </GlowMaskBottom>
          <GlowMaskLeft>
            <GlowContent speed={speed} className="scroll left" />
            <GlowContent speed={speed} className="overlay left" />
          </GlowMaskLeft>
        </BlurEffectLow>
      </BorderContainer>
    </AnimatedBorderWrapper>
  );
};

export default AnimatedBorderOverlay;
