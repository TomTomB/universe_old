import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import iconChampTooltipMastery from './assets/icon-champ-tooltip-mastery.png';
import chestAcquired from './assets/icon-chest-acquired.png';
import coreAcquired from './assets/icon-core-acquired.png';

const StyledChampionMasteryTooltip = styled.div`
  color: #a09b8c;
  font-size: 12px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0.025em;
  -webkit-font-smoothing: subpixel-antialiased;
  padding: 12px 18px 12px 12px;
  min-width: 255px;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
`;

const Info = styled.div`
  flex: 1 1 auto;
`;

const Name = styled.h4`
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.05em;
  margin: 0;
`;

const Separator = styled.hr`
  display: block;
  border: none;
  height: 1px;
  margin: 0 40px 0 0;
  background-color: #463714;
`;
const Mastery = styled.div`
  display: flex;
  margin: 3px 0 0 0;
`;
const MasteryScore = styled.span`
  padding: 0 7px 0 23px;

  &::before {
    margin: 0 0 0 -25px;
    content: '';
    position: absolute;
    width: 17px;
    height: 14px;
    background: url(${iconChampTooltipMastery}) center no-repeat;
    background-size: 100%;
  }
`;

const MasteryTitle = styled.span`
  flex: 1 100%;
  text-align: right;
`;
const ChestStatus = styled.span``;
const Chest = styled.div<{ chestAcquired?: boolean; asCore?: boolean }>`
  display: none;

  ${({ chestAcquired }) =>
    chestAcquired &&
    css`
      display: block;
      padding: 0 0 0 23px;
    `}

  &::before {
    content: '';
    position: absolute;
    width: 21px;
    height: 14px;
    background: url(${({ asCore }) => (asCore ? coreAcquired : chestAcquired)})
      center no-repeat;
    background-size: 100%;
    margin-left: -24px;
  }
`;

export interface ChampionMasteryTooltipProps {
  championName: string;
  masteryPoints: number;
  masteryTitle: string;

  chestAcquired?: boolean;
  displayAsCore?: boolean;
  className?: string;
}

const ChampionMasteryTooltip: FC<ChampionMasteryTooltipProps> = ({
  championName,
  masteryPoints,
  masteryTitle,

  className,
  chestAcquired,
  displayAsCore,
}) => {
  return (
    <StyledChampionMasteryTooltip className={className}>
      {/* TODO(TRB): Radial progress */}

      <Info>
        <Name> {championName} </Name>
        <Separator />
        <Mastery>
          <MasteryScore> {masteryPoints} pts.</MasteryScore>
          <MasteryTitle>{masteryTitle}</MasteryTitle>
        </Mastery>
        <Chest chestAcquired={chestAcquired} asCore={displayAsCore}>
          <ChestStatus></ChestStatus>
        </Chest>
      </Info>
    </StyledChampionMasteryTooltip>
  );
};

export default ChampionMasteryTooltip;
