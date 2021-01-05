import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RootView from '.';

describe('RootView', () => {
  it('should render', () => {
    expect(render(<RootView />)).toBeTruthy();
  });
});
