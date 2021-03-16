import '@testing-library/jest-dom';
import ParallaxBackground from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('ParallaxBackground', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <ParallaxBackground layers={[]} />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
