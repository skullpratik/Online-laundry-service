import React from 'react';
import './about.css';

const AboutPage = () => {
  return (
    <div className="about-wrapper">
      <div className="about-hero">
        <h1>About Shiv Krupa Laundry</h1>
        <p>Your trusted partner for fresh, clean, and crisp clothes — delivered to your doorstep.</p>
      </div>

      <div className="about-section">
        <h2>Who We Are</h2>
        <p>
          Shiv Krupa Laundry is a locally rooted laundry business with a mission to simplify your daily life by handling your clothes with professional care. We pride ourselves in being reliable, punctual, and affordable for all your laundry needs.
        </p>
      </div>

      <div className="about-section">
        <h2>What We Do</h2>
        <ul>
          <li>✔️ Morning pickup and next-morning doorstep delivery</li>
          <li>✔️ Ironing at ₹9 per cloth for regular customers</li>
          <li>✔️ Dry Cleaning at ₹80 per cloth</li>
          <li>✔️ Bleaching at ₹70 (₹50 if bleach is provided)</li>
          <li>✔️ Stain removal starting at ₹120 (no guarantee but best effort)</li>
          <li>✔️ Raffu (minor cloth repair)</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          We are committed to consistency and customer satisfaction. Whether it's your daily wear, festive attire, or delicate fabrics — we treat each garment with special attention. Our team ensures timely pickup, transparent pricing, and great results.
        </p>
      </div>

      <div className="about-contact">
        <h2>Get in Touch</h2>
        <p>
          📍 Located in: [Vile Parle(E), Mubai] <br />
          📞 Call or WhatsApp us: <a href="https://wa.me/9324125329?text=Hi%20I%20want%20to%20book%20a%20laundry%20pickup" target="_blank" rel="noreferrer">+91-9324125329</a> <br />
          🕒 Timings: 8:00 AM – 10:00 PM (All Days)
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
