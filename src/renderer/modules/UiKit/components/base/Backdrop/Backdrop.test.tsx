import '@testing-library/jest-dom';
import Backdrop from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('Backdrop', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Backdrop />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
