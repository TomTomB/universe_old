import '@testing-library/jest-dom';
import Option from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('Option', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Option id="foo" label="Foo" name="foo" />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
