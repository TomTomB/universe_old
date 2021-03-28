import '@testing-library/jest-dom';
import PrimaryFlatButton from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('PrimaryFlatButton', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <PrimaryFlatButton type="button">Click me</PrimaryFlatButton>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
