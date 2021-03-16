import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import React from 'react';
import SplashScreenContainer from '.';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import store from '@store';
import theme from '@styles/theme';

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
