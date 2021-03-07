import React, { useRef } from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import Tooltip from '.';

describe('Tooltip', () => {
  const TooltipWrapper = () => {
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <button ref={triggerRef}>My button</button>
        <Tooltip triggerRef={triggerRef.current}>Test Tooltip</Tooltip>
      </>
    );
  };

  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <TooltipWrapper />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
