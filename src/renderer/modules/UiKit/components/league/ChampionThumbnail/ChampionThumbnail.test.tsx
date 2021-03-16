import '@testing-library/jest-dom';
import ChampionThumbnail from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('ChampionThumbnail', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <ChampionThumbnail />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
