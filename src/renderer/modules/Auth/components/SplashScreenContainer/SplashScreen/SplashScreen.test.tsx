import '@testing-library/jest-dom';
import {
  SplashScreenAudioMachine,
  SplashScreenVideoMachine,
} from '@uikit/machines';
import { Provider } from 'react-redux';
import React from 'react';
import SplashScreen from '.';
import { ThemeProvider } from 'styled-components';
import loginMusicIntro from '@assets/music/intro-sound-splash-kaisa.ogg';
import loginMusicLoop from '@assets/music/music-splash-kaisa.ogg';
import loginPicture from '@assets/background/image-splash-kaisa.jpg';
import loginVideoIntro from '@assets/video/intro-video-splash-kaisa.webm';
import loginVideoLoop from '@assets/video/video-splash-kaisa.webm';
import { render } from '@testing-library/react';
import store from '@store';
import theme from '@styles/theme';
import { useMachine } from '@xstate/react';

describe('SplashScreen', () => {
  it('should render', () => {
    const HelperComponent = () => {
      const [currentMusic, sendMusic] = useMachine(
        SplashScreenAudioMachine.machine.withContext({
          hasIntroAudio: true,
          isAudioEnabled: true,
          introAudio: null,
          loopAudio: null,
        })
      );

      const [currentVideo, sendVideo] = useMachine(
        SplashScreenVideoMachine.machine.withContext({
          hasIntroVideo: true,
          isVideoEnabled: true,
          introVideo: null,
          loopVideo: null,
        })
      );
      return (
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
      );
    };

    expect(
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <HelperComponent />
          </ThemeProvider>
        </Provider>
      )
    ).toBeTruthy();
  });
});
