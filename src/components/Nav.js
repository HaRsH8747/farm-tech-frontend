import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState(false);

  const Navbar = styled.nav`
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 1.6rem 4.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 999;

    .nav-link {
      font-weight: bold;
      font-family: 'NavFont';
      font-size: 14px;
      text-transform: uppercase;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.white};
      padding: 20px 0px;
      margin: 0px 20px;
      display: inline-block;
      position: relative;
    }
    
    .nav-link:hover {
      opacity: 1;
    }
    
    .nav-link::before {
      transition: 300ms;
      height: 5px;
      content: "";
      position: absolute;
      background-color: ${({ theme }) => theme.colors.white};
    }
    
    .nav-link-ltr::before {
      width: 0%;
      bottom: 10px;
    }
    
    .nav-link-ltr:hover::before {
      width: 100%;
    }
  

    .navbar-lists {
      display: flex;
      gap: 25px;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;

      .navbar-link {
        font-size: 18px;
        font-weight: 500;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.white};
        text-decoration: none;
        transition: color 0.3s ease-in-out;

        &:hover {
          color: ${({ theme }) => theme.colors.secondary};
        }
      }
    }

    .login-button {
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.white};
      text-decoration: none;
      padding: 0.8rem 1.6rem;
      border: 2px solid ${({ theme }) => theme.colors.white};
      border-radius: 2rem;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-2px);
      }
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .navbar-lists {
        display: ${({ menuIcon }) => (menuIcon ? "flex" : "none")};
        position: absolute;
        top: 100%;
        left: 0;
        background-color: ${({ theme }) => theme.colors.primary};
        padding: 2.4rem 0;
        width: 100%;
        flex-direction: column;
        gap: 2.4rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }
  `;

  return (
    <Navbar menuIcon={menuIcon}>
      <ul className="navbar-lists" style={{ margin: "auto" }}>
        <li>
          <NavLink
            to="/"
            className="nav-link nav-link-ltr navbar-link"
            onClick={() => setMenuIcon(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className="nav-link nav-link-ltr navbar-link"
            onClick={() => setMenuIcon(false)}
          >
            Explore Lands
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/digitalstorage"
            className="nav-link nav-link-ltr navbar-link"
            onClick={() => setMenuIcon(false)}>
            Digital Storage
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="nav-link nav-link-ltr navbar-link"
            onClick={() => setMenuIcon(false)}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="nav-link nav-link-ltr navbar-link"
            onClick={() => setMenuIcon(false)}
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <NavLink to="/login" className="login-button">
        Login
      </NavLink>
    </Navbar>
  );
};

export default Nav;
