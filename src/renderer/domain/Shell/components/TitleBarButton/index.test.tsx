import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@theme';
import TitleBarButton, { TitleBarButtonType } from '.';

describe('TitleBarButton', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <TitleBarButton label="Test" type={TitleBarButtonType.Close} />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
