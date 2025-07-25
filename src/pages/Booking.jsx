import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthContext';
import './bookingform.css';

const BookingForm = ({ onLoginClick }) => {
  const { user, token } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      clothCount: 1
    }
  });

  const onSubmit = async (data) => {
    if (!user) {
      if (onLoginClick) onLoginClick();
      return;
    }
    const payload = { ...data, clothCount: Number(data.clothCount) };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error('Failed to submit booking');
      const result = await response.json();
      alert('Booking submitted!');
      reset();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="booking-form-container fade-in">
      <h2>Book a Laundry Pickup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="booking-form" noValidate>
        <label>
          Name:
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <small className="error">{errors.name.message}</small>}
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Enter valid 10-digit phone',
              },
            })}
          />
          {errors.phone && <small className="error">{errors.phone.message}</small>}
        </label>

        <label>
            Address:
          <textarea
            rows="3"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <small className="error">{errors.address.message}</small>}
            </label>

         <label>
          Number of Clothes:
          <input
            type="number"
            {...register('clothCount', {
              required: 'Number of clothes is required',
              min: { value: 1, message: 'Enter a valid number of clothes' },
            })}
          />
          {errors.clothCount && <small className="error">{errors.clothCount.message}</small>}
        </label>

        <label>
          Service Type:
          <select
            {...register('serviceType', { required: 'Service type is required' })}
          >
            <option value="">Select a service</option>
            <option value="Ironing">Ironing</option>
            <option value="Dry Cleaning">Dry Cleaning</option>
            <option value="Bleach">Bleach</option>
            <option value="Stain Removal">Stain Removal</option>
            <option value="Raffu">Raffu</option>
            <option value="Other">Other</option>
          </select>
          {errors.serviceType && <small className="error">{errors.serviceType.message}</small>}
        </label>

        <button type="submit" className="btn book-btn animated-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
