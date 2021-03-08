import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import ChampionThumbnail from '.';

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
