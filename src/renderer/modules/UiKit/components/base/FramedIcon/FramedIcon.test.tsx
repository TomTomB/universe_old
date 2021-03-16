import '@testing-library/jest-dom';
import FramedIcon from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

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
