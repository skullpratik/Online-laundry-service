import React, { useEffect, useState } from 'react';
import './hero.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import SignInModal from './SignInModal';

const Hero = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setShowModal(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

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
          </div>
          {user && (
            <div style={{ marginTop: 16, textAlign: 'left' }}>
              <a href="/my-bookings" className="view-booking-link">
                View your booking
              </a>
        </div>
          )}
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

