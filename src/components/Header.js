import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {

  const {currentDBUser} = useAuth();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const storedDBData = JSON.parse(localStorage.getItem('storedDBData'));
  let isLandOwner = false;
  if(storedDBData){
    isLandOwner = storedDBData.designation === "L";
  }
  
  const navigationLinks = [
    { path: "/", title: "Home" },
    { path: "/lands", title: "Explore Lands" },
    { path: "/digitalstorage", title: "Digital Storage" }
  ];

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const getActiveLinkStyles = ({ isActive }) =>
    isActive ? "text-teal-200" : "text-white hover:text-teal-200";

  return (
    <header className={`flex justify-between items-center px-8 lg:px-12 py-4 bg-green-900 text-white fixed w-full z-10 shadow-2xl transition-transform duration-300 ${showHeader ? '' : '-translate-y-full'}`}>
      <NavLink to="/" className="flex items-center space-x-3">
        <img src="./images/logo1.webp" alt="FarmTech logo" className="h-12" />
        <span className="text-xl font-bold">FARMTECH</span>
      </NavLink>
      <nav className="flex justify-center items-center gap-16 text-lg flex-1">
        {navigationLinks.map(({ path, title }) => (
          <NavLink key={path} to={path} className={getActiveLinkStyles}>{title}</NavLink>
        ))}
        {isLandOwner && (
          <>
            <NavLink to="/landapplications" className={getActiveLinkStyles}>Applications</NavLink>
            <NavLink to="/landposting" className={getActiveLinkStyles}>Postings</NavLink>
          </>
        )}
        <NavLink to="/about" className={getActiveLinkStyles}>About</NavLink>
        <NavLink to="/contact" className={getActiveLinkStyles}>Contact</NavLink>
      </nav>
      <NavLink to="/login" className="bg-white text-green-900 px-4 py-2 rounded-full shadow-lg hover:bg-teal-600 transition-colors">
        Login
      </NavLink>
    </header>
  );
};

export default Header;