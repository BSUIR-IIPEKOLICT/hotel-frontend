import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Roboto', 'Fira Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .root {
    min-height: 100vh;
    background-color: black;
    color: white;
    transition: 0.3s ease;

    &.light {
      background-color: #dcdcdc;
      color: #121212;
    }

    .container {
      min-height: calc(100vh - 64px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .form {
    margin: 20vh auto 0;
    max-width: 50ch;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 0 5px 1px #666;

    & .MuiTextField-root {
      margin: 5px;
      width: 40ch;
    }
  }
`;
