import React, { FC } from 'react';
import {
  progressBorders,
  progressRings,
  simplifiedBorders,
  socialBorders,
  solidBorders,
} from './ringAssets';
import styled, { css } from 'styled-components';
import { RadialProgress } from '@uikit/components/base';
import { RadialProgressProps } from '@uikit/components/base/RadialProgress';
import unfilledRing from './assets/unfilled-ring.png';
import unfilledRingLeft from './assets/unfilled-ring-left.png';
import unfilledRingRight from './assets/unfilled-ring-right.png';

const LevelText = styled.span`
  font-family: LoL Display;
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  -webkit-font-smoothing: antialiased;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  bottom: 2px;
  color: #f0e6d2;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
`;

const UnfilledXpRing = styled.img`
  content: url(${unfilledRing});
  && {
    display: block;
  }
`;

const MaskContainer = styled.div`
  height: 100%;
  width: 50%;
  position: absolute;
  top: 0;
`;

const MaskContainerLeftHalf = styled(MaskContainer)`
  left: 0;

  && img {
    content: url(${unfilledRingLeft});
    transform-origin: center right;
    transform: rotate(180deg);
    left: initial;
    right: 0;
    display: block;
  }
`;

const MaskContainerRightHalf = styled(MaskContainer)`
  right: 0;

  && img {
    content: url(${unfilledRingRight});
    transform-origin: center left;
    transform: rotate(180deg);
    left: 0;
    display: block;
  }
`;

const FilledXpRing = styled.img``;
const LevelRingBorder = styled.img``;

const getRing = (type: ThemedLevelRingType, theme?: number) => {
  const index = theme
    ? theme - 1 < 0
      ? 0
      : theme - 1 > 20
      ? 20
      : theme - 1
    : 0;

  return css`
    ${type === 'progress' &&
    css`
      ${FilledXpRing} {
        content: url(${progressRings[index]});
        display: block;
      }
      ${LevelRingBorder} {
        content: url(${progressBorders[index]});
        display: block;
      }
    `}

    ${type === 'solid' &&
    css`
      ${LevelRingBorder} {
        content: url(${solidBorders[index]});
        display: block;
      }
    `}

    ${type === 'social' &&
    css`
      ${LevelRingBorder} {
        content: url(${socialBorders[index]});
        display: block;
      }
    `}

    ${type === 'simplified' &&
    css`
      ${FilledXpRing} {
        content: url(${progressRings[index]});
        display: block;
      }
      ${LevelRingBorder} {
        content: url(${simplifiedBorders[index]});
        display: block;
      }
    `}
  `;
};

type RingProps = React.FC<
  RadialProgressProps & {
    ringTheme?: number;
    ringType: ThemedLevelRingType;
  }
>;

export const StyledThemedLevelRing = styled<RingProps>(RadialProgress)`
  display: block;

  img {
    height: 140%;
    min-width: 140%;
    position: absolute;
    top: -20%;
    left: -20%;
    display: none;
  }

  ${({ ringType }) =>
    ringType === 'social' &&
    css`
      img {
        height: 160%;
        min-width: 160%;
        top: -30%;
        left: -30%;
      }

      ${LevelText} {
        bottom: -3px;
      }
    `}

  ${({ ringTheme, ringType }) => getRing(ringType, ringTheme)}
`;
export type ThemedLevelRingType =
  | 'progress'
  | 'solid'
  | 'social'
  | 'simplified';

export interface ThemedLevelRingProps {
  ringType: ThemedLevelRingType;
  progress?: number;
  className?: string;
  summonerLevel: number;
}

const ThemedLevelRing: FC<ThemedLevelRingProps> = ({
  className,
  ringType,
  progress,
  summonerLevel,
}) => {
  const themeLevel = Math.floor(summonerLevel / 25) + 1;

  return (
    <StyledThemedLevelRing
      ringTheme={themeLevel}
      ringType={ringType}
      progress={progress ?? 0}
      polygonConfig={{ startAngle: 247, endAngle: -67 }}
      className={className}
      bottomLayerChildren={
        ringType === 'progress' || ringType === 'simplified' ? (
          <UnfilledXpRing />
        ) : (
          <></>
        )
      }
      middleLayerChildren={
        <>
          <MaskContainerLeftHalf>
            <UnfilledXpRing />
          </MaskContainerLeftHalf>

          <MaskContainerRightHalf>
            <UnfilledXpRing />
          </MaskContainerRightHalf>
          <FilledXpRing />
        </>
      }
      topLayerChildren={
        <>
          <LevelRingBorder />
          {ringType !== 'simplified' && (
            <LevelText> {summonerLevel} </LevelText>
          )}
        </>
      }
    ></StyledThemedLevelRing>
  );
};

export default ThemedLevelRing;
