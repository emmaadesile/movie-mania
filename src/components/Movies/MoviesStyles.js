import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const ContainerFluid = styled.div`
  display: grid;
  padding: 0 50px;
`;

const HeroImage = styled.div`
  height: 600px;
  clip-path: polygon(0 0, 0 98%, 100% 92%, 100% 0);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://res.cloudinary.com/dn6fnuhxr/image/upload/v1560424199/avengers_endgame.jpg');
`;

const MovieGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  justify-items: center;
  align-items: start;
  background: white;
  margin: -80px 0 auto;
  z-index: 1000;
  padding: 30px 20px;
`;

export { Wrapper, ContainerFluid, HeroImage, MovieGridContainer };
