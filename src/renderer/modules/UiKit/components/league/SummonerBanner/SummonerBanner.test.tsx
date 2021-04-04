import '@testing-library/jest-dom';
import React from 'react';
import SummonerBanner from '.';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('SummonerBanner', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <SummonerBanner rank="challenger" showPattern />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
