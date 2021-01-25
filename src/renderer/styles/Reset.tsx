import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
  body {
    margin: 0;
    box-sizing: border-box;
    font-family: LoL Body;
    scroll-behavior: smooth;
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
`;

export default Reset;
