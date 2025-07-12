// App.jsx
import React from 'react';
import { Routes, Route,Link } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/header';
import HeroSection from './components/hero';
import WhyChooseUs from './components/whychooseus';
import TestimonialSlider from './components/testimonial';
import ReviewForm from './components/reviewform';
import Footer from './components/footer';

// Pages
import PricingPage from './pages/pricing';
import ServicesPage from './pages/services';
import AboutPage from './pages/about';
import AdminLogin from './pages/admin';         
import CustomerLogin from './pages/customer'; 
import BookingForm from './pages/Booking';

function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <TestimonialSlider />
      <ReviewForm />
    </>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/book-now" element={<BookingForm />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
