import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import Patcher from '.';
import { PlayButtonState } from '..';

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
