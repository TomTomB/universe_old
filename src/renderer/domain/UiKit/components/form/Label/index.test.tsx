import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@theme';
import Label from '.';

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
