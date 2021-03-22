import '@testing-library/jest-dom';
import RadioGroup from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('RadioGroup', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <RadioGroup />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
