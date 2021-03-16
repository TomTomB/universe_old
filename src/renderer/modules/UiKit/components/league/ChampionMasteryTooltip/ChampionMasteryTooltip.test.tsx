import '@testing-library/jest-dom';
import ChampionMasteryTooltip from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('ChampionMasteryTooltip', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <ChampionMasteryTooltip
            championName="Karma"
            masteryPoints={10000}
            masteryTitle="Warden"
          />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
