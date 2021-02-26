import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import PlayButton, { PlayButtonState } from '.';

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
