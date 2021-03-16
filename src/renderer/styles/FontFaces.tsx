import beaufortBold from '@assets/fonts/BeaufortForLoL-Bold.otf';
import beaufortBoldItalic from '@assets/fonts/BeaufortForLoL-BoldItalic.otf';
import beaufortHeavy from '@assets/fonts/BeaufortForLoL-Heavy.otf';
import beaufortHeavyItalic from '@assets/fonts/BeaufortForLoL-HeavyItalic.otf';
import beaufortItalic from '@assets/fonts/BeaufortForLoL-Italic.otf';
import beaufortLight from '@assets/fonts/BeaufortForLoL-Light.otf';
import beaufortLightItalic from '@assets/fonts/BeaufortForLoL-LightItalic.otf';
import beaufortMedium from '@assets/fonts/BeaufortForLoL-Medium.otf';
import beaufortMediumItalic from '@assets/fonts/BeaufortForLoL-MediumItalic.otf';
import beaufortRegular from '@assets/fonts/BeaufortForLoL-Regular.otf';
import { createGlobalStyle } from 'styled-components';
import shentox from '@assets/fonts/shentox.ttf';
import shentoxLight from '@assets/fonts/shentox-light.ttf';
import shentoxSemiBold from '@assets/fonts/shentox-semibold.ttf';
import spiegelBold from '@assets/fonts/Spiegel-Bold.otf';
import spiegelBoldItalic from '@assets/fonts/Spiegel-BoldItalic.otf';
import spiegelRegular from '@assets/fonts/Spiegel-Regular.otf';
import spiegelRegularItalic from '@assets/fonts/Spiegel-RegularItalic.otf';
import spiegelSemiBold from '@assets/fonts/Spiegel-SemiBold.otf';
import spiegelSemiBoldItalic from '@assets/fonts/Spiegel-SemiBoldItalic.otf';

const FontFaces = createGlobalStyle`
  @font-face {
    font-family: 'LoL Body';
    font-weight: 400;
    font-style: normal;
    src: url(${spiegelRegular}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 600;
    font-style: normal;
    src: url(${spiegelSemiBold}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 700;
    font-style: normal;
    src: url(${spiegelBold}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 400;
    font-style: italic;
    src: url(${spiegelRegularItalic}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 600;
    font-style: italic;
    src: url(${spiegelSemiBoldItalic}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 700;
    font-style: italic;
    src: url(${spiegelBoldItalic}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 300;
    font-style: normal;
    src: url(${beaufortLight}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 400;
    font-style: normal;
    src: url(${beaufortRegular}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 500;
    font-style: normal;
    src: url(${beaufortMedium}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 700;
    font-style: normal;
    src: url(${beaufortBold}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 900;
    font-style: normal;
    src: url(${beaufortHeavy}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 300;
    font-style: italic;
    src: url(${beaufortLightItalic}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 400;
    font-style: italic;
    src: url(${beaufortItalic}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 500;
    font-style: italic;
    src: url(${beaufortMediumItalic}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 700;
    font-style: italic;
    src: url(${beaufortBoldItalic}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 900;
    font-style: italic;
    src: url(${beaufortHeavyItalic}) format('opentype');
  }

  @font-face {
    font-family: 'LoL ESport';
    font-weight: 300;
    font-style: normal;
    src: url(${shentoxLight}) format('truetype');
  }

  @font-face {
    font-family: 'LoL ESport';
    font-weight: 600;
    font-style: normal;
    src: url(${shentoxSemiBold}) format('truetype');
  }

  @font-face {
    font-family: 'LoL ESport';
    font-weight: 400;
    font-style: normal;
    src: url(${shentox}) format('truetype');
  }
`;

export default FontFaces;
