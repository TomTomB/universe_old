import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TitleBarButton, { TitleBarButtonType } from '.';

describe('TitleBarButton', () => {
  it('should render', () => {
    expect(
      render(<TitleBarButton label="Test" type={TitleBarButtonType.Close} />)
    ).toBeTruthy();
  });
});
