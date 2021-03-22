import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import PolygonGenerator from './polygonGenerator';
import emptyMeterBlue from './assets/empty-meter-blue.png';
import emptyMeterChampion from './assets/empty-meter-champion.png';
import emptyMeterPink from './assets/empty-meter-pink.png';
import emptyMeterSummoner from './assets/empty-meter-summoner.png';
import fullMeterBlue from './assets/full-meter-blue.png';
import fullMeterChampion from './assets/full-meter-champion.png';
import fullMeterPink from './assets/full-meter-pink.png';
import fullMeterSummoner from './assets/full-meter-summoner.png';

const Layer = styled.div<{ path?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
`;

const TopLayer = styled(Layer)``;

const MiddleLayer = styled(Layer)`
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;

  clip-path: ${({ path }) => path};
`;

const BottomLayer = styled(Layer)`
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
`;

const getLayerConfig = (type?: RadialProgressType) => {
  switch (type) {
    case 'blue':
      return css`
        ${BottomLayer} {
          background-image: url(${emptyMeterBlue});
        }
        ${MiddleLayer} {
          background-image: url(${fullMeterBlue});
        }
      `;

    case 'champion':
      return css`
        ${BottomLayer} {
          background-image: url(${emptyMeterChampion});
        }
        ${MiddleLayer} {
          background-image: url(${fullMeterChampion});
        }
      `;

    case 'pink':
      return css`
        ${BottomLayer} {
          background-image: url(${emptyMeterPink});
        }
        ${MiddleLayer} {
          background-image: url(${fullMeterPink});
        }
      `;
    case 'summoner':
      return css`
        ${BottomLayer} {
          background-image: url(${emptyMeterSummoner});
        }
        ${MiddleLayer} {
          background-image: url(${fullMeterSummoner});
        }
      `;

    default:
      return css``;
  }
};

interface StyledRadialProgressProps {
  progressType?: RadialProgressType;
}

export const StyledRadialProgress = styled.div<StyledRadialProgressProps>`
  display: inline-block;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 10px;
  min-height: 10px;
  margin: 0;
  padding: 0;
  border: 0;

  ${({ progressType }) => getLayerConfig(progressType)}
`;

export type RadialProgressType = 'summoner' | 'champion' | 'blue' | 'pink';

export interface RadialProgressProps {
  className?: string;
  progressType?: RadialProgressType;
  progress: number;
  polygonConfig?: { startAngle: number; endAngle: number };
  topLayerChildren?: any;
  middleLayerChildren?: any;
  bottomLayerChildren?: any;
}

export const RADIAL_PROGRESS_FULL = { startAngle: 90, endAngle: -270 };
export const RADIAL_PROGRESS_TOP_GAP = { startAngle: 80, endAngle: -260 };

const RadialProgress: FC<RadialProgressProps> = ({
  topLayerChildren,
  middleLayerChildren,
  bottomLayerChildren,
  className,
  progressType,
  progress,
  polygonConfig = RADIAL_PROGRESS_FULL,
}) => {
  const generator = new PolygonGenerator(
    polygonConfig.startAngle,
    polygonConfig.endAngle
  );

  return (
    <StyledRadialProgress className={className} progressType={progressType}>
      <BottomLayer>{bottomLayerChildren} </BottomLayer>
      <MiddleLayer path={generator.generatePolygon(progress)}>
        {middleLayerChildren}
      </MiddleLayer>
      <TopLayer> {topLayerChildren} </TopLayer>
    </StyledRadialProgress>
  );
};

export default RadialProgress;
