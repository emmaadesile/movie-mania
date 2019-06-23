import React, { Component } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Routes from "./routes";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./App.css";

const theme = {
  specialFont: "DINNextW01-Bold"
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "DINNextW01-Bold";
    src: url("./assets/fonts/DINNextW01-Bold.otf") format(otf);
  }

  * {
    outline: none;
  }

  body {
    font-size: 1rem;
  }

  html {
    font-family: ${props =>
      props.theme.specialFont ? "DINNextW01-Bold" : "Helvetica Neue"};
    box-sizing: border-box;
    font-size: 14px;
  }

  a {
    text-decoration: none;
  }

  img {
    width: 100%;
  }
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <GlobalStyle />
          <Navigation />
          <Routes />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
