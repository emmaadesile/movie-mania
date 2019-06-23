import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import Navigation from './components/Navigation';
import Movies from './components/Movies';
import Tvshows from './components/TvShows';
import VideoDetails from './components/VideoDetails';
import Footer from './components/Footer';
import './index.css';

const theme = {
  specialFont: 'DINNextW01-Bold'
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
      props.theme.specialFont ? 'DINNextW01-Bold' : 'Helvetica Neue'};
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

          <Router>
            <Movies path="/" />
            <Movies path="/movies" />
            <Tvshows path="/tv" />
            <VideoDetails path="/tv/:videoId/" />
            <VideoDetails path="/movie/:videoId/" />
          </Router>

          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

render(<App />, document.getElementById('root'));
