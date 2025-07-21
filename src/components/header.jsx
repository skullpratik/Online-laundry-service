import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { useAuth } from '../AuthContext';
import SignInModal from './SignInModal';
import { FaUserCircle } from 'react-icons/fa';
import AdminLoginModal from './AdminLoginModal';

const Header = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  const getFirstName = (nameOrEmailOrPhone) => {
    if (!nameOrEmailOrPhone) return '';
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

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="logo-box">
          <img src="/logo.jpg" alt="Logo" className="logo-img" />
          <span className="logo-text">SKLdrycleaner's</span>
        </Link>

        {/* Hamburger icon */}
        <div className="menu-toggle" onClick={() => setShowModal(false)}>
          ☰
        </div>

        {/* Nav + Buttons */}
        <div className={`menu-content`}>
          <nav className="nav-links">
            <Link to="/" onClick={() => setShowModal(false)}>Home</Link>
            <Link to="/services" onClick={() => setShowModal(false)}>Services</Link>
            <Link to="/pricing" onClick={() => setShowModal(false)}>Pricing</Link>
            <Link to="/about" onClick={() => setShowModal(false)}>About</Link>
          </nav>
          <div className="login-buttons">
            <button className="btn admin" style={{ background: '#29307a', color: '#fff' }} onClick={() => setAdminModalOpen(true)}>
              Admin
            </button>
            {user ? (
              <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
                <button
                  className="user-menu-btn"
                  onClick={() => setDropdownOpen((open) => !open)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500,
                    color: '#222',
                    fontSize: '1rem',
                    padding: 0
                  }}
                >
                  <FaUserCircle size={28} style={{ marginRight: 6 }} />
                  {getFirstName(user.name || user.email || user.phone)}
                </button>
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
                      minWidth: 160,
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
                        color: '#16a085',
                        borderBottom: '1px solid #eee',
                      }}
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/my-bookings');
                      }}
                    >
                      View your booking
                    </button>
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
                        setDropdownOpen(false);
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn customer" onClick={() => setShowModal(true)}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      <SignInModal open={showModal} onClose={() => setShowModal(false)} />
      <AdminLoginModal open={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </header>
  );
};

export default Header;
