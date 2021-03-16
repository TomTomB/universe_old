import '@testing-library/jest-dom';
import FlyoutFrame from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('FlyoutFrame', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <FlyoutFrame />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
