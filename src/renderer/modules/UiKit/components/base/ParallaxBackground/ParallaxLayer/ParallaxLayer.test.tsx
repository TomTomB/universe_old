import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import ParallaxLayer from '.';
import smoke4 from '../assets/parallax-smoke4.png';

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
