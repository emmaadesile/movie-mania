import { useState, useEffect } from "react";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const baseURL = process.env.REACT_APP_BASE_URL;

const useDataAPI = videoType => {
  const [videos, setVideos] = useState([]);
  const [isError, setIsError] = useState(false);

  const endpoint =
    videoType === "movie"
      ? `${baseURL}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`
      : `${baseURL}/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await axios(endpoint);

        storeVideos(fetchedVideos.data.results);
      } catch (error) {
        console.log(error)
        setIsError(true);
      }
    };
    fetchVideos();
  }, [endpoint]);

  const storeVideos = data => {
    const storedVideos = data.map(result => {
      const {
        title,
        vote_count,
        id,
        genre_ids,
        poster_path,
        original_name,
        vote_average,
        first_air_date,
        release_date
      } = result;
      return {
        title,
        vote_count,
        id,
        genre_ids,
        poster_path,
        original_name,
        vote_average,
        first_air_date,
        release_date
      };
    });
    
    setVideos(storedVideos);
  };

  return [videos, isError];
};

export default useDataAPI;
