import React from "react";
import { Link } from "@reach/router";
import useDataAPI from "../../useDataApi";
import {
  ContainerFluid,
  HeroImage,
  TvShowGridContainer,
  Wrapper
} from "./TvShowsStyles";
import Video from "../Video";
import Loader from "../Loader";

const TvShows = () => {
  const [videos, isError] = useDataAPI("tv");

  return (
    <Wrapper>
      {isError && <h2>Oops something went wrong...</h2>}
      {videos.length === 0 && !isError ? (
        <Loader />
      ) : (
        <>
          <HeroImage />
          <ContainerFluid>
            <TvShowGridContainer>
              {videos.map(show => (
                <Link to={`/tv/${show.id}`} key={show.id}>
                  <Video key={show.id} type="tv" video={show} />
                </Link>
              ))}
            </TvShowGridContainer>
          </ContainerFluid>
        </>
      )}
    </Wrapper>
  );
};

export default TvShows;
