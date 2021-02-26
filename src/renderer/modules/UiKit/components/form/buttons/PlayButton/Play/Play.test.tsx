import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import Play from '.';
import { PlayButtonState } from '..';

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
