import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import TitleBar from '.';
import theme from '../../../../theme';

describe('TitleBar', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <TitleBar />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
