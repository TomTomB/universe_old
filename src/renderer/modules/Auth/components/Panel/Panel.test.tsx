import '@testing-library/jest-dom';
import Panel from '.';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import store from '@store';
import theme from '@styles/theme';

describe('Panel', () => {
  it('should render', () => {
    expect(
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router>
              <Panel />
            </Router>
          </ThemeProvider>
        </Provider>
      )
    ).toBeTruthy();
  });
});
