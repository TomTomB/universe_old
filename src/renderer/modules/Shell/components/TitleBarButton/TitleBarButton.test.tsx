import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import TitleBarButton, { TitleBarButtonType } from '.';
import store from '@store';
import { Provider } from 'react-redux';

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
