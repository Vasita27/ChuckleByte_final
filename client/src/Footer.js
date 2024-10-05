import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({ theme, toggleTheme }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <p className="copyright">
          &copy; {currentYear} ChuckleByte Technologies. All Rights Reserved.
        </p>
        <ul className={`footer-links ${theme}`}>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service">Terms of Service</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
