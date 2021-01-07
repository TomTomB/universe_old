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

import externalLinkMask from '../assets/app/external-link-mask.png';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    box-sizing: border-box;
    font-family: LoL Body;
  }

  *, *::before,  *::after{
    box-sizing: inherit;
    user-select: none;
  }

  input,
  textarea,
  select,
  button {
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
  }

  embed,
  iframe,
  img,
  object,
  video {
    display: block;
    max-width: 100%;
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

  h1, h2, h3, h4, h5, h6, a, p, label, li{
    font-kerning: normal;
    font-feature-settings: 'kern' 1;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6{
    font-family: LoL Display;
    margin: 0 0 0.5em;

    :not(.preserve-case){
      text-transform: uppercase;
    }
  }

  h1{
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 40px;
    font-weight: 700;
    line-height: 42px;
    letter-spacing: 0.05em;

    &.preserve-case {
      letter-spacing: 0.025em;
    }

    &.subhead{
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  h2{
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 30px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0.05em;

    &.preserve-case {
      letter-spacing: 0.025em;
    }

    &.subhead{
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  h3{
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0.05em;

    &.preserve-case {
      letter-spacing: 0.025em;
    }

    &.subhead{
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  h4{
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0.05em;

    &.preserve-case {
      letter-spacing: 0.025em;
    }

    &.subhead{
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  h5{
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.075em;

    &.preserve-case {
      letter-spacing: 0.0375em;
    }

    &.subhead{
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  h6{
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.075em;

    &.preserve-case {
      letter-spacing: 0.0375em;
    }

    &.subhead{
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  p {
    color: ${(props) => props.theme.colors.grey[1]};
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
    letter-spacing: 0.025em;
    margin-top: 0;
    -webkit-font-smoothing: subpixel-antialiased;
  }

  label {
    color: ${(props) => props.theme.colors.grey[1]};
    font-size: 12px;
    font-weight: normal;
    line-height: 16px;
    letter-spacing: 0.1em;
    -webkit-font-smoothing: subpixel-antialiased;
    transition: 300ms color ${(props) => props.theme.easing.soft};

    &.is-invalid {
      color: ${(props) => props.theme.colors.mage[2]};
    }
  }

  a{
    color: ${(props) => props.theme.colors.gold[2]};
    font-size: 12px;
    font-weight: normal;
    outline: 0;
    letter-spacing: 0.05em;
    -webkit-font-smoothing: subpixel-antialiased;
    transition: 300ms color ${(props) => props.theme.easing.soft};

    &:hover{
      color: ${(props) => props.theme.colors.gold[1]};
    }

    &.external{
      color: ${(props) => props.theme.colors.blue[3]};
      text-decoration: none;

      &::after{
        width: 9px;
        height: 9px;
        content: '';
        display: inline-block;
        vertical-align: middle;
        mask: url(${externalLinkMask}) no-repeat;
        mask-size: contain;
        background-color: ${(props) => props.theme.colors.blue[3]};
        margin-left: 5px;
        transition: 300ms background-color ${(props) =>
          props.theme.easing.soft};
      }

      &:hover{
        color: ${(props) => props.theme.colors.blue[1]};

        &::after{
          background-color: ${(props) => props.theme.colors.blue[1]};
        }
      }
    }
  }

  ul{
    li{
      color: ${(props) => props.theme.colors.grey[1]};
      font-size: 12px;
      font-weight: normal;
      line-height: 16px;
      letter-spacing: 0.025em;
      -webkit-font-smoothing: subpixel-antialiased;
    }
    &.title-list {
      li{
        font-family: LoL Display;
        color: ${(props) => props.theme.colors.gold[1]};
        font-size: 14px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0.0375em;

        &.subhead{
          color: ${(props) => props.theme.colors.grey[1]};
        }
      }
    }
  }
`;

export default GlobalStyle;
