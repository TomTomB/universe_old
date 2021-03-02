import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import Option from '.';

describe('Option', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Option index={1} onClick={() => {}}>
            Option
          </Option>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
