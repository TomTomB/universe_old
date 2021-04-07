import React, { FC, useEffect, useRef, useState } from 'react';
import BannerBase from '../BannerBase';
import { LCU } from '@typings';
import bannerPrimaryIntro from './assets/banner_primary.webm';
import classNames from 'classnames';
import styled from 'styled-components';

const FadeCondition = styled.div`
  transition: opacity 300ms ease-in-out;
  opacity: 0;

  &.show {
    opacity: 1;
  }

  display: flex;
  justify-content: center;
`;

const VideoBase = styled.video``;

const IntroVideo = styled(VideoBase)`
  z-index: 1;
`;

export const StyledSummonerBanner = styled.div`
  width: 275px;
  display: grid;

  &.ally {
    width: 240px;

    ${IntroVideo} {
      margin-top: -68px;
    }
  }

  ${FadeCondition} {
    grid-column: 1;
    grid-row: 1;
  }

  ${IntroVideo} {
    margin-top: -60px;
  }

  canvas {
    margin-top: -100px;
  }
`;

export type LobbyBannerType = 'primary' | 'ally';

export interface LobbyBannerProps {
  rank: LCU.Rank;
  showPattern?: boolean;
  bannerType?: LobbyBannerType;
  playIntro?: boolean;
}

const LobbyBanner: FC<LobbyBannerProps> = ({
  rank,
  showPattern,
  bannerType = 'primary',
  playIntro = true,
}) => {
  const bannerIntroRef = useRef<HTMLVideoElement>(null);

  const [introTimeElapsed, setIntroTimeElapsed] = useState(false);
  const [introTimeElapsedTimeout, setIntroTimeElapsedTimeout] = useState<
    number | null
  >(null);

  const [introState, setIntroState] = useState<
    'LOADING' | 'LOADED' | 'PLAYING' | 'ENDED'
  >('LOADING');

  useEffect(() => {
    if (!bannerIntroRef.current) {
      return;
    }

    if (introState === 'LOADED') {
      if (playIntro) {
        bannerIntroRef.current.currentTime = 0;
        bannerIntroRef.current.play();
        const timeout = window.setTimeout(() => {
          setIntroTimeElapsed(true);
          setIntroTimeElapsedTimeout(null);
        }, 400);
        setIntroTimeElapsedTimeout(timeout);
        setIntroState('PLAYING');
      } else if (!introTimeElapsedTimeout) {
        const timeout = window.setTimeout(() => {
          setIntroTimeElapsed(true);
          setIntroTimeElapsedTimeout(null);
        }, 100);
        setIntroTimeElapsedTimeout(timeout);
      }
    } else if (introState === 'ENDED') {
      bannerIntroRef.current.currentTime = 0;
    }

    return () => {
      if (introTimeElapsedTimeout) {
        window.clearTimeout(introTimeElapsedTimeout);
      }
    };
  }, [introState, bannerIntroRef, introTimeElapsedTimeout, playIntro]);

  return (
    <StyledSummonerBanner className={bannerType}>
      <FadeCondition className={classNames({ show: introTimeElapsed })}>
        <BannerBase rank={rank} showPattern={showPattern} />
      </FadeCondition>

      <FadeCondition
        className={classNames({ show: !!playIntro && introState !== 'ENDED' })}
      >
        <IntroVideo
          src={
            bannerType === 'primary' ? bannerPrimaryIntro : bannerPrimaryIntro
          }
          onLoadedData={() => setIntroState('LOADED')}
          onEnded={() => setIntroState('ENDED')}
          muted
          ref={bannerIntroRef}
        />
      </FadeCondition>
    </StyledSummonerBanner>
  );
};

export default LobbyBanner;
