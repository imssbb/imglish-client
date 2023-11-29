import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo-container">
        <Link to="/" className="header__page">
          <h1 className="header__title">Imglish</h1>
        </Link>
      </div>
      <ul className="header__container">
        <li className="header__page">
          <Link to="/">Home</Link>
        </li>
        <li className="header__page">
          <Link to="/">About</Link>
        </li>
        <li className="header__page">
          <Link to="/">Services</Link>
        </li>
        <li className="header__page">
          <Link to="/">Contact</Link>
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
