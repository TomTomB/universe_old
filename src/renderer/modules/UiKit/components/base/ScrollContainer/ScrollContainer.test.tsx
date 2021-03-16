import '@testing-library/jest-dom';
import React from 'react';
import ScrollContainer from '.';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('ScrollContainer', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <ScrollContainer />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
