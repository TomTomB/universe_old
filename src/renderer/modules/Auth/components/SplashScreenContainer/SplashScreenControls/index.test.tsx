import '@testing-library/jest-dom';
import {
  SplashScreenAudioMachine,
  SplashScreenVideoMachine,
} from '@uikit/machines';
import { Provider } from 'react-redux';
import React from 'react';
import SplashScreenControls from '.';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import store from '@store';
import theme from '@styles/theme';
import { useMachine } from '@xstate/react';

describe('SplashScreenControls', () => {
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
        <SplashScreenControls
          music={{
            current: currentMusic,
            send: sendMusic,
          }}
          video={{
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
