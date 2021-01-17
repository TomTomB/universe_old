import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@theme';
import PrimaryMagicButton from '.';

describe('PrimaryMagicButton', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <PrimaryMagicButton>Test Button</PrimaryMagicButton>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
