import '@testing-library/jest-dom';
import FilterFader from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('FilterFader', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <FilterFader />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
