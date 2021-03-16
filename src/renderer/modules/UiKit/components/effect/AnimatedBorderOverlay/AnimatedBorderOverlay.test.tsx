import '@testing-library/jest-dom';
import AnimatedBorderOverlay from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('AnimatedBorderOverlay', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <AnimatedBorderOverlay />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
