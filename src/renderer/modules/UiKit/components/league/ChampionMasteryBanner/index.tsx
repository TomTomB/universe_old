import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

import masteryBanner0 from './assets/mastery-banner-0.png';
import masteryBanner1 from './assets/mastery-banner-1.png';
import masteryBanner2 from './assets/mastery-banner-2.png';
import masteryBanner3 from './assets/mastery-banner-3.png';
import masteryBanner4 from './assets/mastery-banner-4.png';
import masteryBanner5 from './assets/mastery-banner-5.png';
import masteryBanner6 from './assets/mastery-banner-6.png';
import masteryBanner7 from './assets/mastery-banner-7.png';
import masteryBannerLocked from './assets/mastery-banner-locked.png';

const handleLevel = (level?: ChampionMasteryLevel) => {
  switch (level) {
    case undefined:
      return masteryBannerLocked;
    case 0:
      return masteryBanner0;
    case 1:
      return masteryBanner1;
    case 2:
      return masteryBanner2;
    case 3:
      return masteryBanner3;
    case 4:
      return masteryBanner4;
    case 5:
      return masteryBanner5;
    case 6:
      return masteryBanner6;
    case 7:
      return masteryBanner7;
  }
};

export const StyledChampionMasteryBannerContainer = styled.div`
  position: relative;
  padding-bottom: 180%;
  overflow: hidden;
`;

const bannerUnfurlAnimation = keyframes`
  from {
    opacity: 0;
    top: -8%;
  }
  to {
    opacity: 1;
    top: 0;
  }
`;

interface StyledChampionMasteryBannerProps {
  level?: ChampionMasteryLevel;
}

const StyledChampionMasteryBanner = styled.div<StyledChampionMasteryBannerProps>`
  position: absolute;
  width: 100%;
  height: 124%;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  animation: ${bannerUnfurlAnimation} 0.3s;
  background-image: url(${({ level }) => handleLevel(level)});

  ${({ level }) =>
    level === undefined &&
    css`
      -webkit-filter: brightness(0.65);
    `}
`;

export type ChampionMasteryLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ChampionMasteryBannerProps {
  level?: ChampionMasteryLevel;
}

const ChampionMasteryBanner: FC<ChampionMasteryBannerProps> = ({ level }) => {
  return (
    <StyledChampionMasteryBannerContainer>
      <StyledChampionMasteryBanner level={level} />
    </StyledChampionMasteryBannerContainer>
  );
};

export default ChampionMasteryBanner;
