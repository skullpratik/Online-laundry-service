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
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Close menu on navigation (optional, improves UX)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="logo-box">
          <img src="/logo.jpg" alt="Logo" className="logo-img" />
          <span className="logo-text">SKLdrycleaner's</span>
        </Link>

        {/* Hamburger icon */}
        <div className="menu-toggle" onClick={() => setMenuOpen((open) => !open)}>
          ☰
        </div>

        {/* Nav + Buttons */}
        <div ref={menuContentRef} className={`menu-content${menuOpen ? ' open' : ''}`}>
          {/* User/Admin dropdown at top of menu on mobile */}
          {(isAdmin || user) && (
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 600, color: '#222', fontSize: '1rem', gap: 8, position: 'relative', width: '100%', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <FaUserCircle size={28} style={{ marginRight: 6 }} />
              {isAdmin ? (
                <div ref={adminDropdownRef} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    className="user-menu-btn"
                    onClick={() => setAdminDropdownOpen((open) => !open)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: '#222',
                      fontSize: '1rem',
                      padding: 0
                    }}
                  >
                    Admin
                  </button>
                  <button
                    className="user-menu-btn"
                    title="View Dashboard"
                    onClick={() => navigate('/admin-dashboard')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#16a085',
                      fontSize: '1.2rem',
                      marginLeft: 2
                    }}
                  >
                    <FaClipboardList size={22} style={{ marginRight: 2 }} />
                    <span style={{ fontSize: '1rem', fontWeight: 500 }}>View Dashboard</span>
                  </button>
                  {adminDropdownOpen && (
                    <div
                      className="user-dropdown"
                      style={{
                        position: 'absolute',
                        top: 36,
                        left: 0,
                        background: '#fff',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                        borderRadius: 8,
                        minWidth: 120,
                        zIndex: 100,
                        padding: 0
                      }}
                    >
                      <button
                        className="user-dropdown-item"
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '12px 18px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          color: '#e74c3c',
                          borderRadius: '0 0 8px 8px',
                        }}
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
                <div ref={dropdownRef} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                  <button
                    className="user-menu-btn"
                    onClick={() => setDropdownOpen((open) => !open)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: '#222',
                      fontSize: '1rem',
                      padding: 0
                    }}
                  >
                    {getDisplayName()}
                  </button>
                  {/* Always show View Booking text link to the right of user name */}
                  <span
                    onClick={() => navigate('/my-bookings')}
                    style={{
                      color: '#16a085',
                      textDecoration: 'underline',
                      fontWeight: 500,
                      fontSize: '1rem',
                      marginLeft: 8,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    View Booking
                  </span>
                  {dropdownOpen && (
                    <div
                      className="user-dropdown"
                      style={{
                        position: 'absolute',
                        top: 36,
                        left: 0,
                        background: '#fff',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                        borderRadius: 8,
                        minWidth: 120,
                        zIndex: 100,
                        padding: 0
                      }}
                    >
                      <button
                        className="user-dropdown-item"
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          padding: '12px 18px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          color: '#e74c3c',
                          borderRadius: '0 0 8px 8px',
                        }}
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
            <div style={{ width: '100%', padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', gap: 8 }}>
              <button className="btn admin" style={{ background: '#29307a', color: '#fff' }} onClick={() => setAdminModalOpen(true)}>
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
