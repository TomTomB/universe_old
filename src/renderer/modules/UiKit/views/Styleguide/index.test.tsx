import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import Styleguide from '.';

describe('Styleguide', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Router>
            <Styleguide />
          </Router>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
