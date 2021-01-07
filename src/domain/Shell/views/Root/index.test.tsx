import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import RootView from '.';
import theme from '../../../../theme';

describe('RootView', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <RootView />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
