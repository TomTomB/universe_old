import '@testing-library/jest-dom';
import PlayButton from '.';
import { Provider } from 'react-redux';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import store from '@store';
import theme from '@styles/theme';

describe('PlayButton', () => {
  it('should render', () => {
    expect(
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <PlayButton />
          </ThemeProvider>
        </Provider>
      )
    ).toBeTruthy();
  });
});
