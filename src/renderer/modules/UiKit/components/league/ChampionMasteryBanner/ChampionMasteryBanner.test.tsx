import '@testing-library/jest-dom';
import ChampionMasteryBanner from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

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
