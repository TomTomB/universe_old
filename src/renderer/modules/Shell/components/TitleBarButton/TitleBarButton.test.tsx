import '@testing-library/jest-dom';
import TitleBarButton, { TitleBarButtonType } from '.';
import { Provider } from 'react-redux';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import store from '@store';
import theme from '@styles/theme';

describe('TitleBarButton', () => {
  it('should render', () => {
    expect(
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <TitleBarButton label="Test" type={TitleBarButtonType.Close} />
          </ThemeProvider>
        </Provider>
      )
    ).toBeTruthy();
  });
});
