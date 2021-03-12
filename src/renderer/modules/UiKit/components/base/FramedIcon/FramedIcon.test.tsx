import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import FramedIcon from '.';

describe('FramedIcon', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <FramedIcon />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
