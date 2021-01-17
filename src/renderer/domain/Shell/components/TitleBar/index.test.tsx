import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import TitleBar from '.';

describe('TitleBar', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <TitleBar />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
