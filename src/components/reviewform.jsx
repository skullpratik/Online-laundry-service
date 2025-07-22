import React, { useState } from 'react';
import './reviewform.css';

const ReviewForm = () => {
  const [form, setForm] = useState({ name: '', email: '', review: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, text: form.review })
      });
      if (!res.ok) throw new Error('Failed to submit review');
      setSuccess('Thank you for your review!');
      setForm({ name: '', email: '', review: '' });
    } catch (err) {
      setError('Could not submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="review-form-section">
      <h2>Leave Us a Review</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <textarea name="review" rows="4" placeholder="Write your review here..." value={form.review} onChange={handleChange} required></textarea>
        <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Review'}</button>
        {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>
    </section>
  );
};

export default ReviewForm;
