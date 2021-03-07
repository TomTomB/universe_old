import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import BackgroundSwitcher from '.';
import dianaBloodmoon from '@assets/background/splash/image-splash-dianabloodmoon.jpg';

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
