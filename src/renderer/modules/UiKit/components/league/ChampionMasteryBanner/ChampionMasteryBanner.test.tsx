import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import ChampionMasteryBanner from '.';

describe('ChampionMasteryBanner', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <ChampionMasteryBanner />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
