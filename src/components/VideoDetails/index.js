import React, { useState, useEffect } from "react";
import dotenv from 'dotenv';
import { format } from "date-fns";
import Loader from "../Loader";
import {
  Video,
  PlayButton,
  VideoInfo,
  VideoTrailer,
  MoviePoster
} from "./VideoDetailsStyles";
import ErrorBoundary from "../../ErrorBoundary";

dotenv.config();

const baseURL = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

// get the props for fetching the video details
const getVideoProps = () => {
  const { pathname } = window.location;
  const videoId = pathname.replace(/[\D]/g, "");

  const regEx = /movie/;
  const videoType = regEx.test(pathname) ? "movie" : "tv";

  const videoDetailsEndpoint = `${baseURL}/${videoType}/${videoId}?api_key=${apiKey}&append_to_response=credits`;
  const videoTrailerEndpoint = `${baseURL}/${videoType}/${videoId}?api_key=${apiKey}&append_to_response=videos`;

  return { videoDetailsEndpoint, videoTrailerEndpoint };
};

const VideoDetails = props => {
  const initialVideoDetails = {
    vote_average: "",
    backdrop_path: "",
    overview: "",
    videoTitle: "",
    releaseDate: "",
    trailerId: ""
  };
  const { videoDetailsEndpoint, videoTrailerEndpoint } = getVideoProps();

  const [videoDetails, setVideoDetails] = useState(initialVideoDetails);
  const [isLoading, setisLoading] = useState(false);
  const [showVideoTrailer, setShowVideoTrailer] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // store video details
    const storeVideoDetails = data => {
      const {
        vote_average,
        backdrop_path,
        overview,
        original_name,
        title,
        first_air_date,
        release_date
      } = data[0];

      const {
        videos: { results }
      } = data[1];

      const trailerId = results[0].key;
      const { uri } = props;
      const regEx = /movie/;

      let date;
      let videoTitle;

      if (regEx.test(uri)) {
        videoTitle = title;
        date = new Date(release_date);
      } else {
        videoTitle = original_name;
        date = new Date(first_air_date);
      }

      const releaseDate = format(date, "MMM DD, YYYY");

      setVideoDetails({
        vote_average,
        backdrop_path,
        overview,
        videoTitle,
        releaseDate,
        trailerId
      });
    };

    const fetchVideoDetails = async () => {
      try {
        const fetchedVideoDetails = await Promise.all([
          fetch(videoDetailsEndpoint).then(resp => resp.json()),
          fetch(videoTrailerEndpoint).then(resp => resp.json())
        ]);

        storeVideoDetails(fetchedVideoDetails);

        setisLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchVideoDetails();
  }, [videoDetailsEndpoint, videoTrailerEndpoint, props]);

  const {
    backdrop_path,
    videoTitle,
    overview,
    releaseDate,
    vote_average,
    trailerId
  } = videoDetails;

  return (
    <>
      {isError && <h2>Oops, something went wrong</h2>}
      {isLoading && !isError ? (
        <Loader />
      ) : (
        <>
          <Video>
            <MoviePoster
              src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
              alt="video_backdrop"
            />
            <div className="backdrop">
              <div className="backdropBg">
                <VideoInfo>
                  <h1>{videoTitle}</h1>
                  <p className="releaseDate">Release Date: {releaseDate}</p>
                  <p className="overview">{overview}</p>

                  <div className="moreDetails">
                    <PlayButton
                      type="button"
                      onClick={() => setShowVideoTrailer(true)}
                      aria-labelledby="play-button"
                    >
                      <i className="fas fa-play"></i>
                      <span>Play Trailer</span>
                    </PlayButton>

                    <div className="videoRating">
                      <i className="fas fa-fire"></i>
                      <span>{vote_average} / 10</span>
                    </div>
                  </div>
                </VideoInfo>
              </div>
            </div>
          </Video>
          {showVideoTrailer && (
            <VideoTrailer>
              <div className="closeTrailer">
                <i
                  role="close-button"
                  className="fa fa-times"
                  aria-labelledby="close-trailer"
                  onClick={() => setShowVideoTrailer(false)}
                ></i>
              </div>
              <iframe
                src={`https://www.youtube.com/embed/${trailerId}`}
                title="videoTrailer"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </VideoTrailer>
          )}
        </>
      )}
    </>
  );
};

// export default VideoDetails;

export default function VideoDetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <VideoDetails {...props} />
    </ErrorBoundary>
  );
}
