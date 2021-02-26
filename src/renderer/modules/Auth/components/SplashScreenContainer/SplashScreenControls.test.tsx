import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { Provider } from 'react-redux';
import store from '@store';
import SplashScreenContainer from '.';

describe('SplashScreenContainer', () => {
  it('should render', () => {
    expect(
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SplashScreenContainer />
          </ThemeProvider>
        </Provider>
      )
    ).toBeTruthy();
  });
});
