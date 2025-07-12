import React from 'react';
import './Reviewform.css';

const ReviewForm = () => {
  return (
    <section className="review-form-section">
      <h2>Leave Us a Review</h2>
      <form className="review-form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="review" rows="4" placeholder="Write your review here..." required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </section>
  );
};

export default ReviewForm;
