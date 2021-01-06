import { createGlobalStyle } from 'styled-components';
import beaufortBold from '../assets/app/fonts/BeaufortForLoL-Bold.otf';
import beaufortBoldItalic from '../assets/app/fonts/BeaufortForLoL-BoldItalic.otf';
import beaufortHeavy from '../assets/app/fonts/BeaufortForLoL-Heavy.otf';
import beaufortHeavyItalic from '../assets/app/fonts/BeaufortForLoL-HeavyItalic.otf';
import beaufortItalic from '../assets/app/fonts/BeaufortForLoL-Italic.otf';
import beaufortLight from '../assets/app/fonts/BeaufortForLoL-Light.otf';
import beaufortLightItalic from '../assets/app/fonts/BeaufortForLoL-LightItalic.otf';
import beaufortMedium from '../assets/app/fonts/BeaufortForLoL-Medium.otf';
import beaufortMediumItalic from '../assets/app/fonts/BeaufortForLoL-MediumItalic.otf';
import beaufortRegular from '../assets/app/fonts/BeaufortForLoL-Regular.otf';
import spiegelBold from '../assets/app/fonts/Spiegel-Bold.otf';
import spiegelBoldItalic from '../assets/app/fonts/Spiegel-BoldItalic.otf';
import spiegelRegular from '../assets/app/fonts/Spiegel-Regular.otf';
import spiegelRegularItalic from '../assets/app/fonts/Spiegel-RegularItalic.otf';
import spiegelSemiBold from '../assets/app/fonts/Spiegel-SemiBold.otf';
import spiegelSemiBoldItalic from '../assets/app/fonts/Spiegel-SemiBoldItalic.otf';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: LoL Body;
  }

  *, *::before,  *::after{
    box-sizing: border-box;
    user-select: none;
  }

  @font-face {
  font-family: 'LoL Body';
  font-weight: normal;
  font-style: normal;
  src: url(${spiegelRegular}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 700;
    font-style: normal;
    src: url(${spiegelSemiBold}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 900;
    font-style: normal;
    src: url(${spiegelBold}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: normal;
    font-style: italic;
    src: url(${spiegelRegularItalic}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 700;
    font-style: italic;
    src: url(${spiegelSemiBoldItalic}) format('opentype');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 900;
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
    font-weight: normal;
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
    font-weight: normal;
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
`;

export default GlobalStyle;
