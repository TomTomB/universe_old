import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import TitleBar from '.';
import { render } from '@testing-library/react';
import store from '@store';
import theme from '@styles/theme';

describe('TitleBar', () => {
  it('should render', () => {
    expect(
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <TitleBar />
          </ThemeProvider>
        </Provider>
      )
    ).toBeTruthy();
  });
});
