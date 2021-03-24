import '@testing-library/jest-dom';
import React from 'react';
import Slider from '.';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('Slider', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Slider />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
