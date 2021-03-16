import '@testing-library/jest-dom';
import PrimaryReplayButton from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('PrimaryReplayButton', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <PrimaryReplayButton />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
