import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import UpdaterIPC from '.';
import { render } from '@testing-library/react';
import store from '@store';
import theme from '@styles/theme';

describe('UpdaterIPC', () => {
  it('should render', () => {
    expect(
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <UpdaterIPC />
          </ThemeProvider>
        </Provider>
      )
    ).toBeTruthy();
  });
});