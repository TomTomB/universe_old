import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import Modal from '.';

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
