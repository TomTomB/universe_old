import '@testing-library/jest-dom';
import NavigationBar from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

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
