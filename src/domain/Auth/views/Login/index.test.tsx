import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LoginView from '.';

describe('LoginView', () => {
  it('should render', () => {
    expect(render(<LoginView />)).toBeTruthy();
  });
});
