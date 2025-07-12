import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

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

        {/* Hamburger icon */}
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>

        {/* Nav + Buttons */}
        <div className={`menu-content ${isMenuOpen ? 'open' : ''}`}>
          <nav className="nav-links">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          </nav>
          <div className="login-buttons">
            <Link to="/admin-login" className="btn admin" onClick={() => isMenuOpen && toggleMenu()}>
  Admin Login
</Link>

            <Link to="/customer-login" className="btn customer" onClick={() => isMenuOpen && toggleMenu()}>
  Customer Login
</Link>


          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
