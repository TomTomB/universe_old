import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import CloseButton from '.';

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
