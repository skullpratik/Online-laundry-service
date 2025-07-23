import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './SignInModal.css';

const SignInModal = ({ open, onClose }) => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: '', phone: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (isRegister) {
        await register(form);
        setIsRegister(false);
        setSuccess('Registration successful! Please log in.');
      } else {
        await login(form);
        onClose();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Close sign in modal"
        >
          &times;
        </button>
        <h2 className="modal-title">{isRegister ? 'Register' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            className="modal-input"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={handleChange}
            className="modal-input"
          />
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Name (optional)"
              value={form.name}
              onChange={handleChange}
              className="modal-input"
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="modal-input"
            required
          />
          {error && <div className="modal-error">{error}</div>}
          {success && <div className="modal-success">{success}</div>}
          <button type="submit" className="modal-submit" disabled={loading}>
            {loading ? (isRegister ? 'Registering...' : 'Signing in...') : (isRegister ? 'Register' : 'Sign In')}
          </button>
        </form>
        <div className="modal-switch">
          <button onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess(''); }} className="modal-switch-btn">
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal; 