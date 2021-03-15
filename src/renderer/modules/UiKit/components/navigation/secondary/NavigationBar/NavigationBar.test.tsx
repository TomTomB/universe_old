import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import NavigationBar from '.';

describe('NavigationBar', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <NavigationBar />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
