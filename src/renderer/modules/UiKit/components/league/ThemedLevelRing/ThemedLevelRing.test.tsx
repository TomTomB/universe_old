import '@testing-library/jest-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import ThemedLevelRing from '.';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('ThemedLevelRing', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <ThemedLevelRing
            ringType="progress"
            progress={20}
            summonerLevel={20}
          />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
