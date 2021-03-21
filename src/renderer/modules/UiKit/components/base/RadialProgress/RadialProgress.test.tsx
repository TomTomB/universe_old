import '@testing-library/jest-dom';
import RadialProgress from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('RadialProgress', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <RadialProgress progress={10} progressType="blue" />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
