import '@testing-library/jest-dom';
import PlayButton, { PlayButtonState } from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('PlayButton', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <PlayButton
            buttonState={PlayButtonState.PLAY}
            prevButtonState={PlayButtonState.HIDDEN}
            type="button"
          >
            Test Button
          </PlayButton>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
