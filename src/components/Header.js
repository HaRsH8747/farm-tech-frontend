import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const { currentDBUser } = useAuth();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0); // State to manage notification count

  const navigate = useNavigate();


  useEffect(() => {
    const fetchApplications = async () => {
      const response = await axios.get("http://192.168.2.18:8000/api/landapplications");
      if (response.data && storedUserData) {
        if (isLandOwner) {
          const currentApplications = response.data.filter(application => application.landowner === storedUserData.id);
          setNotificationCount(len(currentApplications));
        }
      } else {
        setNotificationCount(0);
      }
    };

    fetchApplications();
  }, []);

  const storedDBData = JSON.parse(localStorage.getItem('storedDBData'));
  let isLandOwner = false;
  if (storedDBData) {
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

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleScroll = (anchor) => (e) => {
    e.preventDefault();
    document.querySelector(anchor).scrollIntoView({ behavior: 'smooth' });
  };

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
        <NavLink to="/landapplications" className={`relative ${getActiveLinkStyles}`}>
          Applications
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notificationCount}
            </span>
          )}
        </NavLink>
        {isLandOwner && (
          <NavLink to="/landposting" className={getActiveLinkStyles}>Postings</NavLink>
          )}
          <NavLink to="/crop-recommendation" className={getActiveLinkStyles}>Crop Recommendation</NavLink>
        {/* <a href="#about" className={getActiveLinkStyles} onClick={handleScroll('#about')}>
          About
        </a>
        <a href="#contact" className={getActiveLinkStyles} onClick={handleScroll('#contact')}>
          Contact
        </a> */}
      </nav>
      {!storedDBData && <NavLink to="/login" className="bg-white text-green-900 px-4 py-2 rounded-full shadow-lg hover:bg-teal-600 transition-colors">
        Login
      </NavLink>
      }
      {storedDBData && <button onClick={() => {
        localStorage.removeItem("storedDBData");
        navigate('/');
      }} className="bg-white text-green-900 px-4 py-2 rounded-full shadow-lg hover:bg-teal-600 transition-colors">
        Logout
      </button>
      }

    </header>
  );
};

export default Header;
