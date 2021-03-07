import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import ArrowButton from '.';

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
