import '@testing-library/jest-dom';
import Label from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('Label', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Label htmlFor="abc123" isInvalid={false}>
            Test Label
          </Label>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
