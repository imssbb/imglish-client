// Footer.js
import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <h1>Imglish</h1>
        </div>
        <div className="footer__info">
          <p>123 Street, City, Country</p>
          <p>Email: info@imglish.com</p>
        </div>
      </div>
      <div className="footer__copyright">
        <p>&copy; 2023 Imglish. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
