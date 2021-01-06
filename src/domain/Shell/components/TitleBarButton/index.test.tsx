import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TitleBarButton from '.';

describe('TitleBarButton', () => {
  it('should render', () => {
    expect(render(<TitleBarButton label="Test" />)).toBeTruthy();
  });
});
