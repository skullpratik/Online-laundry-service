import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="logo-box">
          <img src="/logo.jpg" alt="Logo" className="logo-img" />
          <span className="logo-text">SKLdrycleaner's</span>
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>

        {/* Nav + buttons - toggleable */}
        <div className={`menu-content ${isMenuOpen ? 'open' : ''}`}>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
          </nav>
          <div className="login-buttons">
            <a href="#" className="btn admin">Admin Login</a>
            <a href="#" className="btn customer">Customer Login</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
