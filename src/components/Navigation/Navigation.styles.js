import styled from "styled-components";

const Nav = styled.nav`
  height: 92px;
  background: #22262a;
`;

const UpperNav = styled.div`
  height: 52px;
  border: 1px solid #393939;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
`;

const LowerNav = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
  color: white;

  .navItems {
    width: 200px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;

    a {
      text-decoration: none;
      color: #fff !important;
      transition: 0.3s color ease-in-out;
      display: block;
    }

    a:hover {
      color: #777 !important;
    }

    li {
      list-style: none;
    }
  }
`;

const Logo = styled.img`
  height: 2.5rem;
  width: auto;
`;

export { Nav, UpperNav, LowerNav, Logo };
