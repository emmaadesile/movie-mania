import React from "react";
import styled from "styled-components";

const Background = styled.div`
  height: 70px;
  background: #393939;
  color: #fff;
  text-align: center;
  display: grid;
  place-items: center;

  a {
    text-decoration: none;
    color: red;
  }
`;

const Footer = () => (
  <Background>
    <p>
      Made with ❤ by <a href="https://twitter.com/emma_adesile">Emmanuel</a>
    </p>
  </Background>
);

export default Footer;
