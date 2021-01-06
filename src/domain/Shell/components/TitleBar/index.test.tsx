import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TitleBar from '.';

describe('TitleBar', () => {
  it('should render', () => {
    expect(render(<TitleBar />)).toBeTruthy();
  });
});
