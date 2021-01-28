import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import Styleguide from '.';

describe('Styleguide', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Styleguide />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
