import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { Provider } from 'react-redux';
import store from '@store';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginView from '.';

describe('LoginView', () => {
  it('should render', () => {
    expect(
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router>
              <LoginView />
            </Router>
          </ThemeProvider>
        </Provider>
      )
    ).toBeTruthy();
  });
});
