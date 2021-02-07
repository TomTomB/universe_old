import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import PlayButton from '.';

describe('PlayButton', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <PlayButton type="button">Test Button</PlayButton>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
