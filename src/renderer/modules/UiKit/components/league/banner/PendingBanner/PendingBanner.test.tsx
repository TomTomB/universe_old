import '@testing-library/jest-dom';
import PendingBanner from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('LobbyBanner', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <PendingBanner />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
