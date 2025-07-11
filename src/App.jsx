// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import HeroSection from './components/hero';
import WhyChooseUs from './components/whychooseus';
import TestimonialSlider from './components/testimonial';
import ReviewForm from './components/reviewform';
import Footer from './components/footer';
import PricingPage from './pages/pricing';
import ServicesPage from './pages/services';
import AboutPage from './pages/about';

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
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
