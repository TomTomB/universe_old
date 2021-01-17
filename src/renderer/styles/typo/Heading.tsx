import { createGlobalStyle } from 'styled-components';

const HeadingTypography = createGlobalStyle`
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
`;

export default HeadingTypography;
