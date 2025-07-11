import React from 'react';
import './About.css';

const AboutPage = () => {
  return (
    <div className="page-section about-section">
      <h1>About Us</h1>
      <p className="intro">
        Welcome to <strong>FreshFold Laundry</strong> – your trusted neighborhood laundry partner.
      </p>

      <div className="about-content">
        <p>
          We are a locally-owned laundry business dedicated to providing high-quality, affordable, and reliable laundry services.
          From doorstep pickup to next-day delivery, we take pride in making your laundry experience seamless and stress-free.
        </p>

        <p>
          Whether it's regular ironing, delicate dry cleaning, tough stain removal, or mending services like raffu — our team
          of trained professionals handles your clothes with utmost care. We believe in using fabric-safe products, eco-friendly methods,
          and offering transparent pricing with no hidden charges.
        </p>

        <p>
          Our goal is to build long-term relationships with customers through trust, punctuality, and top-notch service.
          We understand your busy schedule — that's why we offer free pickup & delivery for our regular customers.
        </p>

        <p className="closing">
          Give us a try, and you’ll never have to worry about laundry again. Because at FreshFold, <strong>“We care for your clothes like our own.”</strong>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
