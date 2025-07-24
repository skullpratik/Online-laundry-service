import React from 'react';
import './hero.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Hero = ({ onLoginClick }) => {
  const { user } = useAuth();

  return (
  <section className="hero">
    <div className="hero-content">
      <div className="hero-text">
        <p className="intro-text">Very proud to introduce</p>
        <h1 className="hero-heading">Seamless Drycleaning Services in Vile Parle East</h1>
        <p className="hero-description">
          Trusted Laundry Service — Now Online!<br/>
          We’ve been serving your laundry needs for years with care and quality.<br/>
          Now, we're making it easier than ever! Clean clothes, just a click away!<br/>
        </p>
        <div className="hero-extra-text">
          <span style={{color:'#0077b6',fontWeight:600}}>Experience the difference with Shiv Krupa Laundry — your local, trusted, and tech-enabled laundry partner!</span>
        </div>
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
          {/* Removed Login button from hero section as requested */}
        </div>
          {/* Removed 'View your booking' link from hero section as requested */}
      </div>
      <div className="hero-image"></div>
    </div>
  </section>
);
};

export default Hero;

