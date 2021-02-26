import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import Frame from '.';
import { PlayButtonState } from '..';

describe('Frame', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Frame
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
