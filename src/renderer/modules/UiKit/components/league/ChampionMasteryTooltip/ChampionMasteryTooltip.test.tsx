import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import ChampionMasteryTooltip from '.';

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
