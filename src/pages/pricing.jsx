import React from 'react';
import './Pricing.css';

const pricingPlans = [
  {
    title: "Ironing ",
    price: "₹9",
    frequency: "Per cloth",
    features: [
      "Daily doorstep pickup & delivery",
      "Clothes ironed and neatly folded",
      "Delivered next day morning",
    ],
  },
  {
    title: "Dry Cleaning",
    price: "₹80",
    frequency: "Per cloth",
    features: [
      "Eco-friendly dry cleaning process",
      "Suitable for delicate and formal wear",
      "Next day doorstep delivery",
    ],
  },
  {
    title: "Bleaching",
    price: "₹70",
    frequency: "Per cloth",
    features: [
      "Safe and fabric-friendly bleach",
      "Color & fabric handled with care",
      "If customer provides bleach, price: ₹50",
    ],
    note: "Price reduces to ₹50 if you provide your own bleach.",
  },
  {
    title: "Stain Removal",
    price: "₹120+",
    frequency: "Starting price per cloth",
    features: [
      "Effective on oil, ink, curry & tough stains",
      "Handled by expert staff",
      "No guarantee, but we give our best!",
    ],
    note: "Prices may vary depending on stain type. No guarantee of full removal.",
  },
  {
    title: "Curtain & Bedsheet Laundry",
    price: "₹50–₹100",
    frequency: "Per piece",
    features: [
      "Large items professionally cleaned",
      "Ironed and folded neatly",
      "Pickup & delivery included",
    ],
  },
  {
    title: "Shoe Cleaning & Deodorizing",
    price: "₹120",
    frequency: "Per pair",
    features: [
      "Deep cleaning + odor treatment",
      "Sole & surface cleaned gently",
      "Canvas, leather & sports shoes accepted",
    ],
  },
];

const PricingPage = () => {
  return (
    <div className="page-section">
      <h1>Our Pricing</h1>
      <p>Affordable laundry services with next-day doorstep delivery.</p>

      <div className="pricing-container">
        {pricingPlans.map(({ title, price, frequency, features, note }, index) => (
          <div key={index} className="pricing-card">
            <h3>{title}</h3>
            <div className="price">{price}</div>
            <div className="frequency">{frequency}</div>
            <ul>
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            {note && <div className="note">{note}</div>}
            
          </div>
        ))}
      </div>

      {/* Delivery Note */}
      <div className="delivery-note">
        <strong>Note:</strong> Free delivery for regular customers. <br />
        For others, ₹20 per km delivery charge applies.
      </div>
    </div>
  );
};

export default PricingPage;
