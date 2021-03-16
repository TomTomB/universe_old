import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import React from 'react';
import SettingsHost from '.';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import store from '@store';
import theme from '@styles/theme';

describe('SettingsHost', () => {
  it('should render', () => {
    expect(
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SettingsHost />
          </ThemeProvider>
        </Provider>
      )
    ).toBeTruthy();
  });
});
