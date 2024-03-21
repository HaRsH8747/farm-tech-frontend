import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = () => {
  return (
    <MainHeader>
      <NavLinkStyled to="/">
        <img src="./images/logo.png" alt="my logo img" />
      </NavLinkStyled>
      <NavContainer>
        <Nav /> 
      </NavContainer>
    </MainHeader>
  );
};

const NavLinkStyled = styled(NavLink)`
  position: absolute;
`;

const NavContainer = styled.div`
  flex-grow: 1;
  text-align: center;
`;


const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 8 rem;
  background-color: ${({ theme }) => theme.colors.nav_bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
  }
`;
export default Header;
