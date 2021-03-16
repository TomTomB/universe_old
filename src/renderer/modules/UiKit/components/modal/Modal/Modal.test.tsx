import '@testing-library/jest-dom';
import Modal from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('Modal', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <Modal bottomButtons={[]} show>
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
