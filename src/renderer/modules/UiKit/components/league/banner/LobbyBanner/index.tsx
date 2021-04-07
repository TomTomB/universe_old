import React, { FC, useEffect, useRef, useState } from 'react';
import BannerBase from '../BannerBase';
import { LCU } from '@typings';
import bannerAllyInvited from './assets/invited-banner.webm';
import bannerPrimaryIntro from './assets/banner_primary.webm';
import styled from 'styled-components';

const FadeCondition = styled.div<{ show: boolean }>`
  transition: opacity 300ms ease-in-out;
  opacity: ${({ show }) => (show ? 1 : 0)};

  display: flex;
  justify-content: center;
`;

const VideoBase = styled.video``;

const IntroVideo = styled(VideoBase)`
  margin-top: -60px;
`;

const InviteVideo = styled(VideoBase)`
  width: 178px;
`;

interface StyledSummonerBannerProps {
  bannerType: LobbyBannerType;
}

export const StyledSummonerBanner = styled.div<StyledSummonerBannerProps>`
  width: ${({ bannerType }) => (bannerType === 'primary' ? '275px' : '240px')};
  display: grid;

  ${FadeCondition} {
    grid-column: 1;
    grid-row: 1;
  }

  ${IntroVideo} {
    width: ${({ bannerType }) =>
      bannerType === 'primary' ? '-60px' : '-68px'};
  }

  canvas {
    margin-top: -100px;
  }
`;

export type LobbyBannerType = 'primary' | 'ally' | 'invite';

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
    <StyledSummonerBanner bannerType={bannerType}>
      <FadeCondition show={bannerType === 'invite'}>
        <InviteVideo src={bannerAllyInvited} autoPlay loop muted />
      </FadeCondition>

      <FadeCondition show={introTimeElapsed && bannerType !== 'invite'}>
        <BannerBase rank={rank} showPattern={showPattern} />
      </FadeCondition>

      <FadeCondition
        show={!!playIntro && introState !== 'ENDED' && bannerType !== 'invite'}
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
