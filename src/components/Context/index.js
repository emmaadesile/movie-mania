import React, { Component } from "react";
import { format } from "date-fns";

const MovieManiaContext = React.createContext();

const baseURL = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

export class Provider extends Component {
  state = {
    loading: false,
    error: "",
    tvShows: [],
    movies: [],
    videoDetails: {
      vote_average: "",
      backdrop_path: "",
      overview: "",
      videoTitle: "",
      releaseDate: ""
    }
  };

  componentDidMount() {
    this.fetchVideoDetails();
  }

  fetchVideoDetails = () => {
    const { url, videoId } = this.props;
    const regEx = /movie/;
    const videoType = regEx.test(url) ? "movie" : "tv";

    const endpoint = `${baseURL}/${videoType}/${videoId}?api_key=${apiKey}&language=en-US`;

    fetch(endpoint)
      .then(resp => resp.json())
      .then(details => this.storeVideoDetails(details))
      .catch(error => this.setState({ error }));
  };

  storeVideoDetails = data => {
    const {
      vote_average,
      backdrop_path,
      overview,
      original_name,
      title,
      first_air_date,
      release_date
    } = data;

    const { url } = this.props.match;
    const regEx = /movie/;

    let date;
    let videoTitle;

    if (regEx.test(url)) {
      videoTitle = title;
      date = new Date(release_date);
    } else {
      videoTitle = original_name;
      date = new Date(first_air_date);
    }

    const releaseDate = format(date, "MMM DD, YYYY");

    this.setState({
      videoDetails: {
        vote_average,
        backdrop_path,
        overview,
        videoTitle,
        releaseDate
      }
    });
  };

  render() {
    const {
      tvShows,
      movies,
      videoDetails: {
        vote_average,
        backdrop_path,
        overview,
        videoTitle,
        releaseDate
      }
    } = this.state;

    return (
      <>
        <MovieManiaContext.Provider
          value={{
            tvShows,
            movies,
            videoDetails: {
              vote_average,
              backdrop_path,
              overview,
              videoTitle,
              releaseDate
            },
            actions: {
              fetchVideoDetails: this.fetchVideoDetails()
            }
          }}
        >
          {this.props.children}
        </MovieManiaContext.Provider>
      </>
    );
  }
}

export const Consumer = MovieManiaContext.Consumer;
