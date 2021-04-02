import { BannerAnimationConfig, BannerAssets } from './types';
import React, { FC, useEffect, useRef, useState } from 'react';
import Banner from './banner';
import bannerBackground from './assets/background/solidbanner_animatable.png';
import bannerPattern from './assets/pattern/rankpattern_00.png';
import bannerTrim from './assets/trim/trim_challenger.png';
import styled from 'styled-components';

const bannerAssets: BannerAssets = {
  background: bannerBackground,
  overlay: bannerPattern,
  rank: bannerTrim,
};

const bannerAnimationConfig: BannerAnimationConfig = {
  bannerHeight: 667.8260869565217,
  bannerWidth: 200,
  bottomFadeAlpha: 0.7,
  bottomFadeEnd: 1,
  bottomFadeStart: 0.6,
  brightness: 0.5335562412741324,
  circleGradientCenter: 1,
  circleGradientEnd: 1,
  circleGradientStart: 0.5,
  debugFade: false,
  fadeOutColor: [0, 0, 0],
  highlightNoiseX: 5,
  highlightNoiseY: 2,
  movingRange: 3,
  noiseScale: 0.4,
  patternPosition: 0.4179523889980704,
  rankPosition: 0.8675837905613901,
  ripple: {
    uDensity: 65.80526975714301,
    uRippleCenter: 0.4,
    uRippleNoise: 2.045117060722194,
    uRippleNoiseStrength: 0.030232165245458516,
    uRippleRange: 0.8002631976739019,
    uRippleScaleX: 1.1380610285226547,
    uRippleSpeed: 5.691266573590746,
    uRippleStart: 0.35570416084942164,
  },
  speed: 0.8,
  topFadeEnd: 0.3,
  topFadeStart: 0,
  viewportHeight: 768,
  viewportWidth: 272,
  waves: {
    numWaves: 20,
    uDebugWave: 1,
    uWaveHeight: 0.5,
    waveLength: 100,
    waveRadius: 150,
  },
};

const SummonerBannerCanvas = styled.canvas``;

export interface SummonerBannerProps {}

const SummonerBanner: FC<SummonerBannerProps> = () => {
  const bannerCanvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasRendered, setCanvasRendered] = useState(false);

  let banner: Banner | undefined;

  useEffect(() => {
    if (!canvasRendered) {
      setTimeout(() => {
        setCanvasRendered(true);
      }, 100);
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
