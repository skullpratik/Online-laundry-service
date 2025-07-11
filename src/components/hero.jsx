import React from 'react';
import './Hero.css';

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
          <a href="#" className="btn primary-btn">Book Pickup</a>
          <a href="#" className="btn whatsapp-btn">WhatsApp Us</a>
        </div>
      </div>
      <div className="hero-image">
        <img src="/online-laundry-service-1.png" alt="Laundry Hero"/>
      </div>
    </div>
  </section>
);

export default Hero;

