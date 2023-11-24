import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/" className="header__page">
          <h1 className="header__title">Imglish</h1>
        </Link>
      </div>
      <ul className="header__container">
        <li>
          <Link to="/" className="header__page">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="header__page">
            About
          </Link>
        </li>
        <li>
          <Link to="/service" className="header__page">
            Services
          </Link>
        </li>
        <li>
          <Link to="/Contact" className="header__page">
            Contact
          </Link>
        </li>
      </ul>
      <div className="header__button-container">
        <Link to="/student/1">
          <button className="header__signin-button button">Sign In</button>
          <button className="header__signup-button button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
