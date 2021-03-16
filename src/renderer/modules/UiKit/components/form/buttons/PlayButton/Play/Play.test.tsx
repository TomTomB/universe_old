import '@testing-library/jest-dom';
import Play from '.';
import { PlayButtonState } from '..';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('Play', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Play
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
