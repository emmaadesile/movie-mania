import React from 'react';
import { Router } from '@reach/router';
import Movies from '../components/Movies';
import Tvshows from '../components/TvShows';
import VideoDetails from '../components/VideoDetails';

const Routes = () => (
  <Router>
    <Movies path="/" />
    <Movies path="/movies" />
    <Tvshows path="/tv" />
    <VideoDetails path="/tv/:videoId/" />
    <VideoDetails path="/movie/:videoId/" />
  </Router>
);

export default Routes;
