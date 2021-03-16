import '@testing-library/jest-dom';
import CometBorder from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('CometBorder', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <CometBorder />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
