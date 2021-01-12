import { createGlobalStyle } from 'styled-components';
import beaufortBold from '@assets/app/fonts/woff2/BeaufortForLoL-Bold.woff2';
import beaufortBoldItalic from '@assets/app/fonts/woff2/BeaufortForLoL-BoldItalic.woff2';
import beaufortHeavy from '@assets/app/fonts/woff2/BeaufortForLoL-Heavy.woff2';
import beaufortHeavyItalic from '@assets/app/fonts/woff2/BeaufortForLoL-HeavyItalic.woff2';
import beaufortItalic from '@assets/app/fonts/woff2/BeaufortForLoL-Italic.woff2';
import beaufortLight from '@assets/app/fonts/woff2/BeaufortForLoL-Light.woff2';
import beaufortLightItalic from '@assets/app/fonts/woff2/BeaufortForLoL-LightItalic.woff2';
import beaufortMedium from '@assets/app/fonts/woff2/BeaufortForLoL-Medium.woff2';
import beaufortMediumItalic from '@assets/app/fonts/woff2/BeaufortForLoL-MediumItalic.woff2';
import beaufortRegular from '@assets/app/fonts/woff2/BeaufortForLoL-Regular.woff2';
// import spiegelBold from '@assets/app/fonts/woff2/Spiegel-Bold.woff2';
// import spiegelBoldItalic from '@assets/app/fonts/woff2/Spiegel-BoldItalic.woff2';
// import spiegelRegular from '@assets/app/fonts/woff2/Spiegel-Regular.woff2';
// import spiegelRegularItalic from '@assets/app/fonts/woff2/Spiegel-RegularItalic.woff2';
// import spiegelSemiBold from '@assets/app/fonts/woff2/Spiegel-SemiBold.woff2';
// import spiegelSemiBoldItalic from '@assets/app/fonts/woff2/Spiegel-SemiBoldItalic.woff2';

import externalLinkMask from '@assets/app/external-link-mask.png';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    box-sizing: border-box;
    font-family: LoL Body;
  }

  *, *::before,  *::after {
    box-sizing: inherit;
    user-select: none;
  }

  img {
    -webkit-user-drag: none;
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
    src: url("../assets/app/fonts/woff2/Spiegel-Regular.woff2") format('woff2');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 700;
    font-style: normal;
    src: url("../assets/app/fonts/woff2/Spiegel-SemiBold.woff2") format('woff2');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 900;
    font-style: normal;
    src: url("../assets/app/fonts/woff2/Spiegel-Bold.woff2") format('woff2');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: normal;
    font-style: italic;
    src: url("../assets/app/fonts/woff2/Spiegel-RegularItalic.woff2") format('woff2');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 700;
    font-style: italic;
    src: url("../assets/app/fonts/woff2/Spiegel-SemiBoldItalic.woff2") format('woff2');
  }

  @font-face {
    font-family: 'LoL Body';
    font-weight: 900;
    font-style: italic;
    src: url("../assets/app/fonts/woff2/Spiegel-BoldItalic.woff2") format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: 300;
    font-style: normal;
    src: url(${beaufortLight}) format('woff2');
  }

  @font-face {
    font-family: 'LoL Display';
    font-weight: normal;
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
    font-weight: normal;
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

  h1, h2, h3, h4, h5, h6, a, p, label, li {
    font-kerning: normal;
    font-feature-settings: 'kern' 1;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: LoL Display;
    margin: 0 0 0.5em;

    :not(.preserve-case) {
      text-transform: uppercase;
    }
  }

  h1 {
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 40px;
    font-weight: 700;
    line-height: 42px;
    letter-spacing: 0.05em;

    &.preserve-case {
      letter-spacing: 0.025em;
    }

    &.subhead {
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  h2 {
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 30px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0.05em;

    &.preserve-case {
      letter-spacing: 0.025em;
    }

    &.subhead {
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  h3 {
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0.05em;

    &.preserve-case {
      letter-spacing: 0.025em;
    }

    &.subhead {
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  h4 {
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0.05em;

    &.preserve-case {
      letter-spacing: 0.025em;
    }

    &.subhead {
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  h5 {
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.075em;

    &.preserve-case {
      letter-spacing: 0.0375em;
    }

    &.subhead {
      color: ${(props) => props.theme.colors.grey[1]};
    }
  }

  h6 {
    color: ${(props) => props.theme.colors.gold[1]};
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.075em;

    &.preserve-case {
      letter-spacing: 0.0375em;
    }

    &.subhead {
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

  a {
    color: ${(props) => props.theme.colors.gold[2]};
    font-size: 12px;
    font-weight: normal;
    outline: 0;
    letter-spacing: 0.05em;
    -webkit-font-smoothing: subpixel-antialiased;
    transition: 300ms color ${(props) => props.theme.easing.soft};

    &:hover, &:focus-visible {
      color: ${(props) => props.theme.colors.gold[1]};
    }

    &.external {
      color: ${(props) => props.theme.colors.blue[3]};
      text-decoration: none;

      &::after {
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

      &:hover, &:focus-visible {
        color: ${(props) => props.theme.colors.blue[1]};

        &::after {
          background-color: ${(props) => props.theme.colors.blue[1]};
        }
      }
    }
  }

  ul {
    li {
      color: ${(props) => props.theme.colors.grey[1]};
      font-size: 12px;
      font-weight: normal;
      line-height: 16px;
      letter-spacing: 0.025em;
      -webkit-font-smoothing: subpixel-antialiased;
    }
    &.title-list {
      li {
        font-family: LoL Display;
        color: ${(props) => props.theme.colors.gold[1]};
        font-size: 14px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0.0375em;

        &.subhead {
          color: ${(props) => props.theme.colors.grey[1]};
        }
      }
    }
  }
`;

export default GlobalStyle;
