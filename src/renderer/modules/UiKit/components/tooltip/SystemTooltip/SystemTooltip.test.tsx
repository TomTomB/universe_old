import '@testing-library/jest-dom';
import React, { useRef } from 'react';
import SystemTooltip from '.';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('SystemTooltip', () => {
  const TooltipWrapper = () => {
    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <button ref={triggerRef}>My button</button>
        <SystemTooltip triggerRef={triggerRef.current}>
          Test Tooltip
        </SystemTooltip>
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
