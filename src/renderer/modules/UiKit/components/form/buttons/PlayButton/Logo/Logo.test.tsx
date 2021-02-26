import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import Logo from '.';
import { PlayButtonState } from '..';

describe('Logo', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Logo
            buttonState={{
              prev: PlayButtonState.PLAY,
              curr: PlayButtonState.PLAY,
            }}
            playPatcherIntro
          />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
