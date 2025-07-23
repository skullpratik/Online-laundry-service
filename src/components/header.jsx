import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { useAuth } from '../AuthContext';
import SignInModal from './SignInModal';
import { FaUserCircle, FaClipboardList } from 'react-icons/fa';
import AdminLoginModal from './AdminLoginModal';

const Header = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const adminDropdownRef = useRef(null);
  const menuContentRef = useRef(null);

  const getFirstName = (nameOrEmailOrPhone) => {
    if (!nameOrEmailOrPhone) return '';
    if (user?.name) return user.name.split(' ')[0];
    if (user?.email) return user.email.split('@')[0];
    if (user?.phone) return user.phone;
    return '';
  };

  // Check if admin is logged in
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';

  // Helper to get display name
  const getDisplayName = () => {
    if (isAdmin) return 'Admin';
    if (user?.name) return user.name.split(' ')[0];
    if (user?.email) return user.email.split('@')[0];
    if (user?.phone) return user.phone;
    return '';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Close admin dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
        setAdminDropdownOpen(false);
      }
    }
    if (adminDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [adminDropdownOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuOpen && menuContentRef.current && !menuContentRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  // Close menu on navigation (optional, improves UX)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-content">
        {/* Hamburger icon on the right with animated bars */}
        <div
          className={`menu-toggle${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="bar1"></span>
          <span className="bar2"></span>
          <span className="bar3"></span>
        </div>
        {/* Logo */}
        <Link to="/" className="logo-box">
          <img src="/logo.jpg" alt="Logo" className="logo-img" />
          <span className="logo-text">SKLdrycleaner's</span>
        </Link>
        {/* Nav + Buttons */}
        <div ref={menuContentRef} className={`menu-content${menuOpen ? ' open' : ''}`}>
          {/* User/Admin dropdown at top of menu on mobile */}
          {(isAdmin || user) && (
            <div className="header-user-row">
              <FaUserCircle size={28} className="header-user-icon" />
              {isAdmin ? (
                <div ref={adminDropdownRef} className="header-admin-dropdown-row">
                  <button
                    className="user-menu-btn"
                    onClick={() => setAdminDropdownOpen((open) => !open)}
                  >
                    Admin
                  </button>
                  <button
                    className="user-menu-btn view-dashboard-btn"
                    title="View Dashboard"
                    onClick={() => navigate('/admin-dashboard')}
                  >
                    <FaClipboardList size={22} className="header-dashboard-icon" />
                    <span className="header-dashboard-text">View Dashboard</span>
                  </button>
                  {adminDropdownOpen && (
                    <div className="user-dropdown">
                      <button
                        className="user-dropdown-item"
                        onClick={() => {
                          localStorage.removeItem('isAdmin');
                          navigate('/');
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div ref={dropdownRef} className="header-user-dropdown-row">
                  <button
                    className="user-menu-btn"
                    onClick={() => setDropdownOpen((open) => !open)}
                  >
                    {getDisplayName()}
                  </button>
                  <span
                    className="view-booking-link"
                    onClick={() => navigate('/my-bookings')}
                  >
                    View Booking
                  </span>
                  {dropdownOpen && (
                    <div className="user-dropdown">
                      <button
                        className="user-dropdown-item"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {/* Show Admin and Login buttons at top if no one is logged in */}
          {!(isAdmin || user) && (
            <div className="login-buttons-bar">
              <button className="btn admin" onClick={() => setAdminModalOpen(true)}>
                Admin
              </button>
              <button className="btn customer" onClick={() => setShowModal(true)}>
                Login
              </button>
            </div>
          )}
          <nav className="nav-links">
            <Link to="/" onClick={handleNavClick}>Home</Link>
            <Link to="/services" onClick={handleNavClick}>Services</Link>
            <Link to="/pricing" onClick={handleNavClick}>Pricing</Link>
            <Link to="/about" onClick={handleNavClick}>About</Link>
          </nav>
        </div>
      </div>
      <SignInModal open={showModal} onClose={() => setShowModal(false)} />
      <AdminLoginModal open={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </header>
  );
};

export default Header;
