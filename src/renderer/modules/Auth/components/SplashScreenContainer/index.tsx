import React, { FC, PropsWithChildren, useEffect } from 'react';
import loginVideoIntro from '@assets/video/splash/intro-video-splash-galio.webm';
import loginVideoLoop from '@assets/video/splash/video-splash-galio.webm';
import loginMusicIntro from '@assets/music/splash/intro-sound-splash-galio.ogg';
import loginMusicLoop from '@assets/music/splash/music-splash-galio.ogg';
import loginPicture from '@assets/background/splash/image-splash-galio.jpg';
import styled from 'styled-components';
import { useMachine } from '@xstate/react';
import { useSelector } from 'react-redux';
import {
  selectPlayLoginAnimations,
  selectPlayLoginMusic,
} from '@store/slices/settings/settingsSlice';
import {
  SplashScreenAudioMachine,
  SplashScreenVideoMachine,
} from '@uikit/machines';
import SplashScreen from './SplashScreen';
import SplashScreenControls from './SplashScreenControls';

const StyledSplashScreenContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

interface SplashScreenContainerProps {
  className?: string;
}

const SplashScreenContainer: FC<
  PropsWithChildren<SplashScreenContainerProps>
> = ({ children, className }) => {
  const playLoginAnimations = useSelector(selectPlayLoginAnimations);
  const playLoginMusic = useSelector(selectPlayLoginMusic);

  const [currentMusic, sendMusic] = useMachine(
    SplashScreenAudioMachine.machine.withContext({
      hasIntroAudio: true,
      isAudioEnabled: playLoginMusic,
      introAudio: null,
      loopAudio: null,
    })
  );

  const [currentVideo, sendVideo] = useMachine(
    SplashScreenVideoMachine.machine.withContext({
      hasIntroVideo: true,
      isVideoEnabled: playLoginAnimations,
      introVideo: null,
      loopVideo: null,
    })
  );

  useEffect(() => {
    sendMusic({ type: 'SET_ENABLED', enabled: playLoginMusic });
  }, [playLoginMusic, sendMusic]);

  useEffect(() => {
    sendVideo({ type: 'SET_ENABLED', enabled: playLoginAnimations });
  }, [playLoginAnimations, sendVideo]);

  return (
    <StyledSplashScreenContainer className={className}>
      <SplashScreen
        music={{
          loop: loginMusicLoop,
          intro: loginMusicIntro,
          current: currentMusic,
          send: sendMusic,
        }}
        picture={loginPicture}
        video={{
          loop: loginVideoLoop,
          intro: loginVideoIntro,
          current: currentVideo,
          send: sendVideo,
        }}
      />
      <SplashScreenControls
        hasIntroVideo
        music={{ current: currentMusic, send: sendMusic }}
        video={{ current: currentVideo, send: sendVideo }}
      />
      {children}
    </StyledSplashScreenContainer>
  );
};

export default SplashScreenContainer;
