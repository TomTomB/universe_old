import '@testing-library/jest-dom';
import BackgroundSwitcher from '.';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import dianaBloodmoon from '@assets/background/splash/image-splash-dianabloodmoon.jpg';
import { render } from '@testing-library/react';
import theme from '@styles/theme';

describe('BackgroundSwitcher', () => {
  it('should render', () => {
    expect(
      render(
        <ThemeProvider theme={theme}>
          <BackgroundSwitcher
            items={[{ src: dianaBloodmoon, alt: 'Diana Bloodmoon' }]}
            currentIndex={0}
          />
        </ThemeProvider>
      )
    ).toBeTruthy();
  });
});
