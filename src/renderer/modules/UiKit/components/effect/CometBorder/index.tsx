import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const cometAnimation = keyframes`
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(
      calc(var(--height) + var(--width) - var(--border-width) * 2)
    );
  }
`;

const Glow = styled.div`
  height: 100%;
  -webkit-filter: drop-shadow(0 0 1px var(--comet-color))
    drop-shadow(0 0 1px var(--comet-color));
`;

const Side = styled.div`
  overflow: hidden;
  position: absolute;
`;

const Top = styled(Side)`
  height: var(--border-width);
  width: calc(100% + var(--border-width));
  left: calc(var(--border-width) * -1);
  top: calc(var(--border-width) * -1);
`;
const Bottom = styled(Side)`
  height: var(--border-width);
  width: calc(100% + var(--border-width));
  bottom: calc(0px - var(--border-width));
  transform: rotate(180deg);
`;
const Left = styled(Side)`
  height: var(--border-width);
  width: calc(var(--height) - var(--border-width));
  right: calc(100% + var(--border-width) * 1);
  transform: rotate(270deg);
  transform-origin: 100% 0;
`;
const Right = styled(Side)`
  height: var(--border-width);
  width: calc(var(--height) - var(--border-width));
  left: 100%;
  top: calc(0% + var(--border-width) * -2);
  transform: rotate(90deg);
  transform-origin: 0 100%;
`;

const Comet = styled.div`
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-name: ${cometAnimation};
  animation-timing-function: linear;
  background-image: repeating-linear-gradient(
    270deg,
    transparent 0,
    var(--comet-color) 2px,
    transparent var(--comet-length),
    transparent calc(var(--width) + var(--height) - var(--border-width) * 2)
  );
  height: 100%;
  position: absolute;
  width: calc(var(--width) + var(--height) + var(--comet-length));
`;

const TopComet = styled(Comet)`
  left: calc(var(--comet-length) * -1);
`;
const BottomComet = styled(Comet)`
  left: calc(var(--comet-length) * -1);
`;
const LeftComet = styled(Comet)`
  right: 0;
`;
const RightComet = styled(Comet)`
  right: 0;
`;

export const StyledCometBorder = styled.div<CometBorderProps>`
  --border-color: ${({ borderColor }) => borderColor};
  --border-width: ${({ borderWith }) => borderWith}px;
  --comet-color: ${({ cometColor }) => cometColor};
  --comet-length: ${({ cometLength }) => cometLength}px;
  --height: ${({ height }) => height}px;
  --width: ${({ width }) => width}px;

  border: var(--border-width) solid var(--border-color);
  height: var(--height);
  width: var(--width);
`;

export interface CometBorderProps {
  borderColor?: string;
  borderWith?: number;
  cometColor?: string;
  cometLength?: number;
  height?: number;
  width?: number;
}

const CometBorder: FC<CometBorderProps> = ({
  borderColor = 'transparent',
  borderWith = 2,
  cometColor = '#f0e6d2',
  cometLength = 100,
  height = 0,
  width = 0,
}) => {
  return (
    <StyledCometBorder
      borderColor={borderColor}
      borderWith={borderWith}
      cometColor={cometColor}
      cometLength={cometLength}
      height={height}
      width={width}
    >
      <Glow>
        <Top>
          <TopComet />
        </Top>
        <Bottom>
          <BottomComet />
        </Bottom>
        <Left>
          <LeftComet />
        </Left>
        <Right>
          <RightComet />
        </Right>
      </Glow>
    </StyledCometBorder>
  );
};

export default CometBorder;
