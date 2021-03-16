import '@testing-library/jest-dom';
import CloseButton from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('CloseButton', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <CloseButton btnStyle="add" type="button" />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
