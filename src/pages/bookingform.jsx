import React, { useState } from 'react';
import './bookingform.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    clothCount: '',
    serviceType: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Enter valid 10-digit phone';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.clothCount || isNaN(formData.clothCount) || formData.clothCount <= 0)
      newErrors.clothCount = 'Enter a valid number of clothes';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // ✅ Submit logic here
      console.log('Form submitted:', formData);
      alert('Booking submitted!');
      setFormData({
        name: '',
        phone: '',
        address: '',
        clothCount: '',
        serviceType: '',
        notes: ''
      });
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Laundry Pickup</h2>
      <form onSubmit={handleSubmit} className="booking-form">

        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <small className="error">{errors.name}</small>}
        </label>

        <label>
          Phone Number:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </label>

        <label>
            Address:
            <textarea name="address" value={formData.address} onChange={handleChange} rows="3" />
            {errors.address && <small className="error">{errors.address}</small>}
            </label>

         <label>
          Number of Clothes:
          <input type="number" name="clothCount" value={formData.clothCount} onChange={handleChange} />
          {errors.clothCount && <small className="error">{errors.clothCount}</small>}
        </label>

        <label>
          Service Type:
          <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
            <option value="">Select a service</option>
            <option value="Ironing">Ironing</option>
            <option value="Dry Cleaning">Dry Cleaning</option>
            <option value="Bleach">Bleach</option>
            <option value="Stain Removal">Stain Removal</option>
            <option value="Raffu">Raffu</option>
            <option value="Other">Other</option>
          </select>
          {errors.serviceType && <small className="error">{errors.serviceType}</small>}
        </label>

        <label>
          Notes / Cloth Description:
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" />
        </label>

        <button type="submit" className="btn book-btn">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
