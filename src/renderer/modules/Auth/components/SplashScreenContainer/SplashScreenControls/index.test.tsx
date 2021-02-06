import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { Provider } from 'react-redux';
import store from '@store';
import { useMachine } from '@xstate/react';
import {
  SplashScreenAudioMachine,
  SplashScreenVideoMachine,
} from '@uikit/machines';
import SplashScreenControls from '.';

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
