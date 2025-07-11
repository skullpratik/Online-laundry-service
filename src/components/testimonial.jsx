import './testimonial.css';

const testimonials = [
  { text: "Clothes come back so fresh!", name: "- Ramesh P." },
  { text: "Affordable, professional service!", name: "- Neha S." },
  { text: "Eco-friendly and fast!", name: "- Ankit M." },
  { text: "Pickup and delivery is amazing!", name: "- Priya D." },
  { text: "Highly recommended!", name: "- Aryan J." },
];

const TestimonialSlider = () => {
  return (
    <section className="testimonial-section">
      <h2 className="testimonial-title">What Our Customers Say</h2>
      <div className="testimonial-slider-wrapper">
        <div className="testimonial-slider">
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <p>"{item.text}"</p>
              <h4>{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;



