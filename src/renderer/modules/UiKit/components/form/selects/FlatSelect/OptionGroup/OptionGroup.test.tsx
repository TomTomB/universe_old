import '@testing-library/jest-dom';
import OptionGroup from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('OptionGroup', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <OptionGroup name="Group" />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
