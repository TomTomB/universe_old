import '@testing-library/jest-dom';
import AnimatedArrowOverlay from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('AnimatedArrowOverlay', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <AnimatedArrowOverlay />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
