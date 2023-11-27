// Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo-container">
        <h1 className="footer__logo">Imglish</h1>
      </div>
      <div className="footer__info">
        <a className="footer__email" href="mailto:info@imglish.com">
          info@imglish.com
        </a>
      </div>
      <div className="footer__social-container">
        <p className="footer__social-title">Follow us:</p>
        <div className="social">
          <a
            className="social__icon"
            href="https://www.facebook.com/imglish"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            className="social__icon"
            href="https://twitter.com/imglish"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            className="social__icon"
            href="https://www.instagram.com/imglish"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="footer__copyright">
        <p>&copy; 2023 Imglish. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
