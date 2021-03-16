import '@testing-library/jest-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Thumbnail from '.';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('Thumbnail', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Thumbnail />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
