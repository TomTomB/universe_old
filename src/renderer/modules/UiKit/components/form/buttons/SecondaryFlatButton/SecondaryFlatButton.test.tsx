import '@testing-library/jest-dom';
import React from 'react';
import SecondaryFlatButton from '.';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('SecondaryFlatButton', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <SecondaryFlatButton type="button">Click me</SecondaryFlatButton>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
