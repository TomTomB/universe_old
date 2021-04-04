import React, { FC, useEffect, useRef } from 'react';
import Banner from './banner';
import { BannerAssets } from '@uikit/webGl';
import { LCU } from '@typings';
import bannerAnimationConfig from './animationConfig';
import bannerBackground from './assets/background/solidbanner_animatable.png';
import bannerPatternBlank from './assets/pattern/blank.png';
import bannerPatternRank from './assets/pattern/rankpattern_00.png';
import bannerTrimBronze from './assets/trim/trim_bronze.png';
import bannerTrimChallenger from './assets/trim/trim_challenger.png';
import bannerTrimDefault from './assets/trim/defaulttrim.png';
import bannerTrimDiamond from './assets/trim/trim_diamond.png';
import bannerTrimGold from './assets/trim/trim_gold.png';
import bannerTrimGrandmaster from './assets/trim/trim_grandmaster.png';
import bannerTrimIron from './assets/trim/trim_iron.png';
import bannerTrimMaster from './assets/trim/trim_master.png';
import bannerTrimPlat from './assets/trim/trim_plat.png';
import bannerTrimSilver from './assets/trim/trim_silver.png';
import styled from 'styled-components';

const SummonerBannerCanvas = styled.canvas``;

const getRankTrim = (rank: LCU.Rank) => {
  switch (rank) {
    case 'unranked':
      return bannerTrimDefault;

    case 'iron':
      return bannerTrimIron;

    case 'bronze':
      return bannerTrimBronze;

    case 'silver':
      return bannerTrimSilver;

    case 'gold':
      return bannerTrimGold;

    case 'platinum':
      return bannerTrimPlat;

    case 'diamond':
      return bannerTrimDiamond;

    case 'master':
      return bannerTrimMaster;

    case 'grandmaster':
      return bannerTrimGrandmaster;

    case 'challenger':
      return bannerTrimChallenger;
  }
};

export interface SummonerBannerProps {
  rank: LCU.Rank;
  showPattern?: boolean;
}

const SummonerBanner: FC<SummonerBannerProps> = ({ rank, showPattern }) => {
  const bannerCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let banner: Banner | undefined;

    const bannerAssets: BannerAssets = {
      background: bannerBackground,
      overlay: showPattern ? bannerPatternRank : bannerPatternBlank,
      rank: getRankTrim(rank),
    };

    if (bannerCanvasRef.current) {
      banner = new Banner(
        bannerAssets,
        bannerCanvasRef.current,
        bannerAnimationConfig
      );

      banner.on('loaded', () => banner?.play());
    }

    return () => {
      banner?.destroy();
      banner?.removeAllListeners();
    };
  }, [bannerCanvasRef, rank, showPattern]);

  return <SummonerBannerCanvas ref={bannerCanvasRef} />;
};

export default SummonerBanner;
