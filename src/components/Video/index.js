import React from "react";
import { format } from "date-fns";
import { Video, VideoInfo } from "./VideoStyles";

const VideoCard = ({ video, type }) => {
  let releaseDate;
  let title;

  if (type === "tv") {
    releaseDate = new Date(video.first_air_date);
    title = video.original_name;
  } else {
    releaseDate = new Date(video.release_date);
    title = video.title;
  }

  const formattedDate = format(releaseDate, "MMM DD, YYYY");

  return (
    <Video>
      <img
        src={`https://image.tmdb.org/t/p/w342/${video.poster_path}`}
        alt="movie_poster"
      />
      <VideoInfo>
        <p className="movieTitle">{title}</p>
        <p className="releaseDate">{formattedDate}</p>
      </VideoInfo>
    </Video>
  );
};

export default VideoCard;
