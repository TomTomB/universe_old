import '@testing-library/jest-dom';
import BannerBase from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('SummonerBanner', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <BannerBase rank="challenger" showPattern />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
