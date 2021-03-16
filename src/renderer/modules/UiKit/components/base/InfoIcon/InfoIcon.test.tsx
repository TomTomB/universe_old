import '@testing-library/jest-dom';
import InfoIcon from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('InfoIcon', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <InfoIcon />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
