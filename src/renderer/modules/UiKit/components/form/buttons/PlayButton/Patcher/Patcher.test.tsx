import '@testing-library/jest-dom';
import Patcher from '.';
import { PlayButtonState } from '..';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('Patcher', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Patcher
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
