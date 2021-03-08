import { StyledThumbnail } from '@uikit/components/base';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { StyledChampionMasteryBannerContainer } from '../ChampionMasteryBanner';

import iconChestAcquiredFrame from './assets/icon-chest-acquired-frame.png';
import iconFreeToPlayReward from './assets/icon-free-to-play-reward.png';
import iconFreeToPlay from './assets/icon-free-to-play.png';
import iconLockSmall from './assets/icon-lock-small.png';
import iconRental from './assets/icon-rental.png';

const StyledChampionThumbnail = styled.div`
  font-kerning: normal;
  -webkit-font-feature-settings: 'kern' 1;
  color: #a09b8c;
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0.1em;
  -webkit-font-smoothing: subpixel-antialiased;
  position: relative;
  display: flex;
  flex-direction: column;

  &[data-name] ::after {
    white-space: nowrap;
    position: relative;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    content: attr(name);
  }

  ${StyledChampionMasteryBannerContainer} {
    margin: -100% 2px 0 2px;
  }
`;

const ThumbnailSquare = styled.div<{ locked?: boolean }>`
  order: -1;
  position: relative;
  padding-bottom: 100%;

  ${StyledThumbnail} {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;

    img {
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      margin: -4px;
      display: block;
    }
  }

  ${({ locked }) =>
    locked &&
    css`
      ${StyledThumbnail}:not(:hover) img {
        -webkit-filter: brightness(0.3);
      }
    `}
`;

interface ChampionAvailabilityProps {
  freeToPlayReward?: boolean;
  freeToPlay?: boolean;
  locked?: boolean;
  rental?: boolean;
}

const ChampionAvailability = styled.div<ChampionAvailabilityProps>`
  position: absolute;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  pointer-events: none;

  ${({ freeToPlayReward }) =>
    freeToPlayReward &&
    css`
      width: 27px;
      height: 32px;
      top: -10px;
      right: -13px;
      background-image: url(${iconFreeToPlayReward});
    `}

  ${({ freeToPlay }) =>
    freeToPlay &&
    css`
      width: 38px;
      height: 38px;
      top: -12px;
      right: -18px;
      background-image: url(${iconFreeToPlay});
    `}

  ${({ locked }) =>
    locked &&
    css`
      width: 100%;
      height: 30px;
      margin-top: 100%;
      top: -14px;
      left: 0;
      background-image: url(${iconLockSmall});
    `}


  ${({ rental }) =>
    rental &&
    css`
      width: 43px;
      height: 43px;
      top: -14px;
      right: -21px;
      background-image: url(${iconRental});
    `}
`;

const ChampionAchievements = styled.div`
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
`;

const ChestAcquiredFrame = styled.div`
  width: 75px;
  height: 75px;
  margin-top: -6px;
  margin-left: -4px;
  background: url(${iconChestAcquiredFrame}) no-repeat center;
  background-size: contain;
`;

export interface ChampionThumbnailProps {
  className?: string;
  masteryBanner?: any;
  thumbnail?: any;
  name?: string;
  simple?: boolean;
  freeToPlayReward?: boolean;
  freeToPlay?: boolean;
  locked?: boolean;
  rental?: boolean;
  chestAcquired?: boolean;
}

const ChampionThumbnail: FC<ChampionThumbnailProps> = ({
  className,
  masteryBanner,
  thumbnail,
  name,
  chestAcquired,

  simple,
  freeToPlay,
  freeToPlayReward,
  locked,
  rental,
}) => {
  return (
    <StyledChampionThumbnail className={className} data-name={name}>
      {masteryBanner}
      <ThumbnailSquare locked={locked}>{thumbnail}</ThumbnailSquare>
      {chestAcquired && (
        <ChampionAchievements>
          <ChestAcquiredFrame />
        </ChampionAchievements>
      )}
      {!simple && (
        <ChampionAvailability
          freeToPlay={freeToPlay}
          freeToPlayReward={freeToPlayReward}
          locked={locked}
          rental={rental}
        />
      )}
    </StyledChampionThumbnail>
  );
};

export default ChampionThumbnail;
