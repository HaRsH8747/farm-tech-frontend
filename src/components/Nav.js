import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState();

  const Nav = styled.nav`
  
  
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
      gap: 4.8rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          font-family: NavFont
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.white};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

  return (
    <Nav>
      <div className={menuIcon ? "navbar active" : "navbar"} style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/"
              className="nav-link nav-link-ltr"
              onClick={() => setMenuIcon(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="nav-link nav-link-ltr"
              onClick={() => setMenuIcon(false)}>
              Explore Lands
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="nav-link nav-link-ltr"
              onClick={() => setMenuIcon(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="nav-link nav-link-ltr"
              onClick={() => setMenuIcon(false)}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </Nav>
  );
};

export default Nav;
