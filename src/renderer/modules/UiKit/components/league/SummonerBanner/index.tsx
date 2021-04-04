import React, { FC, useEffect, useRef, useState } from 'react';
import Banner from './banner';
import { BannerAssets } from '@uikit/webGl';
import { LCU } from '@typings';
import bannerAnimationConfig from './animationConfig';
import bannerBackground from './assets/background/solidbanner_animatable.png';
import bannerPattern from './assets/pattern/rankpattern_00.png';
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

export interface SummonerBannerProps {
  rank: LCU.Rank;
}

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

const SummonerBanner: FC<SummonerBannerProps> = ({ rank }) => {
  const bannerCanvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasRendered, setCanvasRendered] = useState(false);

  const bannerAssets: BannerAssets = {
    background: bannerBackground,
    overlay: bannerPattern,
    rank: getRankTrim(rank),
  };

  let banner: Banner | undefined;

  useEffect(() => {
    if (!canvasRendered) {
      setTimeout(() => {
        setCanvasRendered(true);
      }, 1);
    }

    return () => {
      banner?.destroy();
      banner?.removeAllListeners();
    };
  }, [banner, canvasRendered]);

  if (bannerCanvasRef.current) {
    banner = new Banner(
      bannerAssets,
      bannerCanvasRef.current,
      bannerAnimationConfig
    );

    banner.on('loaded', () => banner?.play());
  }

  return <SummonerBannerCanvas ref={bannerCanvasRef} />;
};

export default SummonerBanner;
