import '@testing-library/jest-dom';
import ParallaxLayer from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import smoke4 from '../assets/parallax-smoke4.png';
import theme from '@styles/theme';

describe('ParallaxLayer', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <ParallaxLayer delay={0} duration={0} imageSrc={smoke4} />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
