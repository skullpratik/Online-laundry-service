import React from 'react';
import './services.css'

const services = [
  {
    title: "Wash & Fold",
    description: "Affordable and quick laundry service for everyday clothes. Perfect for regular laundry with convenient folding.",
  },
  {
    title: "Dry Cleaning",
    description: "Special care for delicate fabrics, suits, saris, and formal wear using eco-friendly solvents.",
  },
  {
    title: "Ironing & Pressing",
    description: "Professional steam ironing for crisp, wrinkle-free clothes. Available as a standalone or add-on service.",
  },
  {
    title: "Pickup & Delivery",
    description: "Free home pickup and doorstep delivery. Schedule with one tap and let us handle the rest.",
  },
  {
    title: "Stain Removal",
    description: "Expert stain treatment for oil, ink, food, and other tough marks using advanced stain-removal techniques.",
  },
  {
    title: "Curtains & Drapes Cleaning",
    description: "Thorough cleaning of curtains, drapes, and blinds without damage to fabric or colors.",
  },
  {
    title: "Carpet & Rug Cleaning",
    description: "Deep-cleaning for carpets and rugs with powerful yet fabric-safe processes.",
  },
  {
    title: "Shoe Cleaning",
    description: "Restore your favorite shoes with our professional cleaning and deodorizing services.",
  },
  {
    title: "Premium Laundry Packages",
    description: "Customized monthly packages for families, bachelors, and businesses with priority service and discounts.",
  },
];

const ServicesPage = () => {
  return (
    <div className="page-section">
      <h1>Our Services</h1>
      <p>Complete laundry, dry cleaning, and premium care solutions.</p>

      <div className="services-container">
        {services.map(({ title, description }, idx) => (
          <div key={idx} className="service-card">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
