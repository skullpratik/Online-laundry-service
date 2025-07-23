import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { useAuth } from '../AuthContext';
import AdminLoginModal from './AdminLoginModal';
import { FaUserCircle, FaClipboardList } from 'react-icons/fa';

const Header = ({ onLoginClick }) => {
  const { user, logout } = useAuth();
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const adminDropdownRef = useRef(null);
  const menuContentRef = useRef(null);
  const navigate = useNavigate();

  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true';

  const getDisplayName = () => {
    if (isAdmin) return 'Admin';
    if (user?.name) return user.name.split(' ')[0];
    if (user?.email) return user.email.split('@')[0];
    if (user?.phone) return user.phone;
    return '';
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(e.target)) {
        setAdminDropdownOpen(false);
      }
      if (menuOpen && menuContentRef.current && !menuContentRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Hamburger and Logo Row for mobile */}
        <div className="logo-row">
          <div
            className={`menu-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="bar1"></span>
            <span className="bar2"></span>
            <span className="bar3"></span>
          </div>
          <Link to="/" className="logo-box">
            <img src="/logo.jpg" alt="Logo" className="logo-img" />
            <span className="logo-text">SKLdrycleaner's</span>
          </Link>
        </div>

        {/* Desktop nav + buttons (hidden on mobile) */}
        <div className="nav-actions desktop-only">
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
          </nav>
          {(isAdmin || user) ? (
            <div className="user-desktop">
              <FaUserCircle size={28} className="header-user-icon" />
              {isAdmin ? (
                <div className="header-admin-dropdown-row">
                  <button
                    className="user-menu-btn"
                    onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                  >
                    Admin
                  </button>
                  <button
                    className="user-menu-btn view-dashboard-btn"
                    title="View Dashboard"
                    onClick={() => navigate('/admin-dashboard')}
                  >
                    <FaClipboardList size={22} />
                    <span>Dashboard</span>
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
                <div className="header-user-dropdown-row">
                  <div style={{ position: 'relative' }}>
                    <button
                      className="user-menu-btn"
                      onClick={() => setDropdownOpen((open) => !open)}
                    >
                      {getDisplayName()}
                    </button>
                    {dropdownOpen && (
                      <div className="user-dropdown" style={{zIndex: 9999}}>
                        <button
                          className="user-dropdown-item"
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                            navigate('/');
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                  <span
                    className="view-booking-link"
                    onClick={() => navigate('/my-bookings')}
                  >
                    View Booking
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="login-buttons-bar">
              <button className="btn admin" onClick={() => setAdminModalOpen(true)}>
                Admin
              </button>
              <button className="btn customer" onClick={onLoginClick}>
                Login
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Content (hidden on desktop) */}
        <div ref={menuContentRef} className={`menu-content mobile-only${menuOpen ? ' open' : ''}`}>
          {/* Show user/admin dropdown in mobile menu if logged in */}
          {(isAdmin || user) && (
            <div className="header-user-row">
              <FaUserCircle size={28} className="header-user-icon" />
              {isAdmin ? (
                <div className="header-admin-dropdown-row">
                  <button
                    className="user-menu-btn"
                    onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                  >
                    Admin
                  </button>
                  <button
                    className="user-menu-btn view-dashboard-btn"
                    title="View Dashboard"
                    onClick={() => navigate('/admin-dashboard')}
                  >
                    <FaClipboardList size={22} />
                    <span>Dashboard</span>
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
                <div className="header-user-dropdown-row">
                  <div style={{ position: 'relative' }}>
                    <button
                      className="user-menu-btn"
                      onClick={() => setDropdownOpen((open) => !open)}
                    >
                      {getDisplayName()}
                    </button>
                    {dropdownOpen && (
                      <div className="user-dropdown" style={{zIndex: 9999}}>
                        <button
                          className="user-dropdown-item"
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                            navigate('/');
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                  <span
                    className="view-booking-link"
                    onClick={() => navigate('/my-bookings')}
                  >
                    View Booking
                  </span>
                </div>
              )}
            </div>
          )}
          <nav className="nav-links">
            <Link to="/" onClick={handleNavClick}>Home</Link>
            <Link to="/services" onClick={handleNavClick}>Services</Link>
            <Link to="/pricing" onClick={handleNavClick}>Pricing</Link>
            <Link to="/about" onClick={handleNavClick}>About</Link>
          </nav>
          {!(isAdmin || user) && (
            <div className="login-buttons-bar">
              <button className="btn admin" onClick={() => setAdminModalOpen(true)}>
                Admin
              </button>
              <button className="btn customer" onClick={onLoginClick}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AdminLoginModal open={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </header>
  );
};

export default Header;
