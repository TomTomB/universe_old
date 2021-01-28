import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import SystemTooltip from '.';

describe('SystemTooltip', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <p data-tip data-for="abc123">
            Anchor for tooltip
          </p>
          <SystemTooltip id="abc123">Test Tooltip</SystemTooltip>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
