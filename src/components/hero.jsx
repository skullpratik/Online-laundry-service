import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';


const Hero = () => (
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
            href="https://wa.me/9819740701?text=Hi%20I%20want%20to%20book%20a%20laundry%20pickup"
            className="btn whatsapp-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>

        </div>
      </div>
      <div className="hero-image">
        <img src="/online-laundry-service-1.png" alt="Laundry Hero"/>
      </div>
    </div>
  </section>
);

export default Hero;

