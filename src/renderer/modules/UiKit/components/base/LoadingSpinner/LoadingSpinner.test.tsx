import '@testing-library/jest-dom';
import LoadingSpinner from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('LoadingSpinner', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <LoadingSpinner />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
