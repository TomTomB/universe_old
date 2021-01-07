import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import LoginView from '.';
import theme from '../../../../theme';

describe('LoginView', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <LoginView />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
