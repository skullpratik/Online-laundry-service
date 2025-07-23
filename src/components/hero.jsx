import React, { useEffect, useState, useRef } from 'react';
import './hero.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import SignInModal from './SignInModal';

const Hero = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const hasShownPopup = useRef(false);
  const loginTimerRef = useRef(null);

  useEffect(() => {
    if (!user && !hasShownPopup.current) {
      loginTimerRef.current = setTimeout(() => {
        setShowModal(true);
        hasShownPopup.current = true;
      }, 2000);
      return () => clearTimeout(loginTimerRef.current);
    }
  }, [user]);

  const handleLoginClick = () => {
    clearTimeout(loginTimerRef.current);
    if (!hasShownPopup.current) {
      setShowModal(true);
      hasShownPopup.current = true;
    }
  };

  return (
  <section className="hero">
    <div className="hero-content">
      <div className="hero-text">
        <p className="intro-text">Very proud to introduce</p>
        <h1 className="hero-heading">Seamless Drycleaning Services in Vile Parle East</h1>
        <p className="hero-description">
          Trusted Laundry Service — Now Online!<br/>
          We’ve been serving your laundry needs for years with care and quality.
          Now, we're making it easier than ever! Clean clothes, just a click away!
        </p>
        <div className="hero-buttons">
           <Link to="/book-now" className="btn book-now">Book Now</Link>
          <a
            href="https://wa.me/9324125329?text=Hi%20I%20want%20to%20book%20a%20laundry%20pickup"
            className="btn whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
          <button className="btn login-btn" onClick={handleLoginClick} style={{marginLeft: 8}}>Login</button>
          </div>
          {/* Removed 'View your booking' link from hero section as requested */}
      </div>
      <div className="hero-image">
        <img src="/online-laundry-service-1.png" alt="Laundry Hero"/>
      </div>
    </div>
      <SignInModal open={showModal} onClose={() => setShowModal(false)} />
  </section>
);
};

export default Hero;

