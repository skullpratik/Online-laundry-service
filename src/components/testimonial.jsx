import './testimonial.css';
import { useEffect, useState } from 'react';

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reviews`);
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const data = await res.json();
        setTestimonials(data);
      } catch {
        setTestimonials([]);
      }
    }
    fetchReviews();
  }, []);

  return (
    <section className="testimonial-section">
      <h2 className="testimonial-title">What Our Customers Say</h2>
      <div className="testimonial-slider-wrapper">
        <div className="testimonial-slider">
          {testimonials.length === 0 ? (
            <div className="testimonial-card">
              <p>No reviews yet. Be the first to leave a review!</p>
            </div>
          ) : (
            testimonials.map((item, index) => (
              <div className="testimonial-card" key={index}>
                <p>"{item.text}"</p>
                <h4>{item.name}</h4>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;



