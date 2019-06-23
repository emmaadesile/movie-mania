import React from "react";
import styled from "styled-components";

const HeroImage = styled.div`
  background: ${props =>
    props.type === "movie"
      ? "url(https://res.cloudinary.com/dn6fnuhxr/image/upload/v1560424209/arrow-wallpaper.jpg)"
      : "url(https://res.cloudinary.com/dn6fnuhxr/image/upload/v1560424199/avengers_endgame.jpg)"};
  height: 520px;
  clip-path: polygon(0 0, 0 98%, 100% 92%, 100% 0);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Header = type => <HeroImage type={type} />;

export default Header;
