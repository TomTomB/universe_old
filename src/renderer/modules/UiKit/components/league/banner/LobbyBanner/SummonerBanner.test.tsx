import '@testing-library/jest-dom';
import LobbyBanner from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('LobbyBanner', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <LobbyBanner rank="challenger" showPattern />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
