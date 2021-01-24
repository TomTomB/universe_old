import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { configure } from '@testing-library/dom';
import ScrollContainer from '.';

// TODO(TRB): This should be inside a setup-tests.ts
configure({
  computedStyleSupportsPseudoElements: true,
});

describe('ScrollContainer', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <ScrollContainer />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
