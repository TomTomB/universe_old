import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { Provider } from 'react-redux';
import store from '@store';
import loginVideoLoop from '@assets/video/video-splash-season2018.webm';
import loginMusicLoop from '@assets/music/music-splash-season2018_post.ogg';
import loginPicture from '@assets/background/image-splash-season2018.jpg';
import SplashScreen from '.';

describe('SplashScreen', () => {
  it('should render', () => {
    expect(
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SplashScreen
              music={{ loop: loginMusicLoop }}
              picture={loginPicture}
              video={{ loop: loginVideoLoop }}
            />
          </ThemeProvider>
        </Provider>
      )
    ).toBeTruthy();
  });
});
