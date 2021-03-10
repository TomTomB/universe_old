import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import ButtonGroup from '.';

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
