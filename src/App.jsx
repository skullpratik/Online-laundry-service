// App.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/header';
import HeroSection from './components/hero';
import WhyChooseUs from './components/whychooseus';
import TestimonialSlider from './components/testimonial';
import ReviewForm from './components/reviewform';
import Footer from './components/footer';
import SignInModal from './components/SignInModal';

// Pages
import PricingPage from './pages/pricing';
import ServicesPage from './pages/services';
import AboutPage from './pages/about';
import AdminLogin from './pages/admin';         
import CustomerLogin from './pages/customer'; 
import BookingForm from './pages/Booking';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';

function HomePage({ onLoginClick }) {
  return (
    <>
      <HeroSection onLoginClick={onLoginClick} />
      <WhyChooseUs />
      <TestimonialSlider />
      <ReviewForm />
    </>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('login');
  const loginTimerRef = useRef(null);

  useEffect(() => {
    loginTimerRef.current = setTimeout(() => {
      setModalMode('login');
      setShowModal(true);
    }, 2000);
    return () => clearTimeout(loginTimerRef.current);
  }, []);

  const handleLoginClick = () => {
    clearTimeout(loginTimerRef.current);
    setModalMode('login');
    setShowModal(true);
  };

  return (
    <>
      <Header onLoginClick={handleLoginClick} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage onLoginClick={handleLoginClick} />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/book-now" element={<BookingForm onLoginClick={handleLoginClick} />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <SignInModal open={showModal} onClose={() => setShowModal(false)} defaultMode={modalMode} />
      <Footer />
    </>
  );
}

export default App;
