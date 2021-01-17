import { createGlobalStyle } from 'styled-components';
import beaufortBold from '@assets/fonts/BeaufortForLoL-Bold.woff2';
import beaufortBoldItalic from '@assets/fonts/BeaufortForLoL-BoldItalic.woff2';
import beaufortHeavy from '@assets/fonts/BeaufortForLoL-Heavy.woff2';
import beaufortHeavyItalic from '@assets/fonts/BeaufortForLoL-HeavyItalic.woff2';
import beaufortItalic from '@assets/fonts/BeaufortForLoL-Italic.woff2';
import beaufortLight from '@assets/fonts/BeaufortForLoL-Light.woff2';
import beaufortLightItalic from '@assets/fonts/BeaufortForLoL-LightItalic.woff2';
import beaufortMedium from '@assets/fonts/BeaufortForLoL-Medium.woff2';
import beaufortMediumItalic from '@assets/fonts/BeaufortForLoL-MediumItalic.woff2';
import beaufortRegular from '@assets/fonts/BeaufortForLoL-Regular.woff2';
import spiegelBold from '@assets/fonts/Spiegel-Bold.woff2';
import spiegelBoldItalic from '@assets/fonts/Spiegel-BoldItalic.woff2';
import spiegelRegular from '@assets/fonts/Spiegel-Regular.woff2';
import spiegelRegularItalic from '@assets/fonts/Spiegel-RegularItalic.woff2';
import spiegelSemiBold from '@assets/fonts/Spiegel-SemiBold.woff2';
import spiegelSemiBoldItalic from '@assets/fonts/Spiegel-SemiBoldItalic.woff2';

const FontFaces = createGlobalStyle`
  @font-face {
    font-family: 'LoL Body';
    font-weight: 400;
    font-style: normal;
    src: url(${spiegelRegular}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 600;
    font-style: normal;
    src: url(${spiegelSemiBold}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 700;
    font-style: normal;
    src: url(${spiegelBold}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 400;
    font-style: italic;
    src: url(${spiegelRegularItalic}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 600;
    font-style: italic;
    src: url(${spiegelSemiBoldItalic}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 700;
    font-style: italic;
    src: url(${spiegelBoldItalic}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 300;
    font-style: normal;
    src: url(${beaufortLight}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 400;
    font-style: normal;
    src: url(${beaufortRegular}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 500;
    font-style: normal;
    src: url(${beaufortMedium}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 700;
    font-style: normal;
    src: url(${beaufortBold}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 900;
    font-style: normal;
    src: url(${beaufortHeavy}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 300;
    font-style: italic;
    src: url(${beaufortLightItalic}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 400;
    font-style: italic;
    src: url(${beaufortItalic}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 500;
    font-style: italic;
    src: url(${beaufortMediumItalic}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 700;
    font-style: italic;
    src: url(${beaufortBoldItalic}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 900;
    font-style: italic;
    src: url(${beaufortHeavyItalic}) format('woff2');
  }
`;

export default FontFaces;
