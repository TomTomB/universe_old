import React, { FC, PropsWithChildren } from 'react';
// import loginVideoIntro from '@assets/video/intro-video-splash-kaisa.webm';
import loginVideoLoop from '@assets/video/video-splash-ss19-c.webm';
// import loginMusicIntro from '@assets/music/intro-sound-splash-kaisa.ogg';
import loginMusicLoop from '@assets/music/music-splash-ss19-c.ogg';
import loginPicture from '@assets/background/image-splash-ss19-c.jpg';
import styled from 'styled-components';
import SplashScreen from '../SplashScreen';
import SplashScreenControls from '../SplashScreenControls';

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
  return (
    <StyledSplashScreenContainer className={className}>
      <SplashScreen
        music={{ loop: loginMusicLoop }}
        picture={loginPicture}
        video={{ loop: loginVideoLoop }}
      />
      <SplashScreenControls hasIntroVideo />
      {children}
    </StyledSplashScreenContainer>
  );
};

export default SplashScreenContainer;
