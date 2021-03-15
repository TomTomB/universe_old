import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import NavigationBarItem from '.';
import { Router } from 'react-router';
import { createHashHistory } from 'history';

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
