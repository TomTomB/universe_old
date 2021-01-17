import { createGlobalStyle } from 'styled-components';
import externalLinkMask from '@assets/external-link-mask.png';

const BodyTypography = createGlobalStyle`
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

export default BodyTypography;
