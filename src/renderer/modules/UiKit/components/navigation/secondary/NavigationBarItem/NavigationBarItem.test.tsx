import '@testing-library/jest-dom';
import NavigationBarItem from '.';
import React from 'react';
import { Router } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { createHashHistory } from 'history';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('NavigationBarItem', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Router history={createHashHistory()}>
            <NavigationBarItem linksTo="abc" />
          </Router>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
