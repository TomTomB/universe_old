import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Styleguide from '.';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

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
