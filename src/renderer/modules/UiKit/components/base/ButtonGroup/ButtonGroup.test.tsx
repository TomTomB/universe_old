import '@testing-library/jest-dom';
import ButtonGroup from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('ButtonGroup', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <ButtonGroup />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
