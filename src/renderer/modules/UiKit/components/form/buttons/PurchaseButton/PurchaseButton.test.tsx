import '@testing-library/jest-dom';
import PurchaseButton from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('PurchaseButton', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <PurchaseButton currencyType="be" type="button">
            1200
          </PurchaseButton>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
