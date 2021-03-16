import '@testing-library/jest-dom';
import PrimaryMagicButton from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

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
