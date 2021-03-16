import '@testing-library/jest-dom';
import Lobby from '.';
import { PlayButtonState } from '..';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('Lobby', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Lobby
            buttonState={{
              prev: PlayButtonState.PLAY,
              curr: PlayButtonState.PLAY,
            }}
            disabled
            isHovering
          />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
