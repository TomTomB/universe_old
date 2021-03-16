import '@testing-library/jest-dom';
import ArrowButton from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('ArrowButton', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <ArrowButton label="Go back" type="button" />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
