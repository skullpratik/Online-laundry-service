import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import './SignInModal.css';

const SignInModal = ({ open, onClose, defaultMode = 'login' }) => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(defaultMode === 'register');
  const [form, setForm] = useState({ email: '', phone: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  // Add a ref for the password input
  const passwordInputRef = React.useRef(null);

  // If the modal is opened and defaultMode changes, update isRegister
  React.useEffect(() => {
    if (open) {
      setIsRegister(defaultMode === 'register');
    }
  }, [open, defaultMode]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (isRegister) {
      // Registration validation
      if (!form.phone.trim()) {
        setError('Phone number is required.');
        setLoading(false);
        return;
      }
      if (!/^\d{10}$/.test(form.phone)) {
        setError('Phone number must be exactly 10 digits.');
        setLoading(false);
        return;
      }
      if (!form.name.trim()) {
        setError('Name is required.');
        setLoading(false);
        return;
      }
      if (/\d/.test(form.name)) {
        setError('Name cannot contain numbers.');
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
    } else {
      // Login validation: require phone, password only
      if (!form.phone.trim()) {
        setError('Phone number is required.');
        setLoading(false);
        return;
      }
      if (!/^\d{10}$/.test(form.phone)) {
        setError('Phone number must be exactly 10 digits.');
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
    }
    setLoading(true);
    try {
      if (isRegister) {
        const regPayload = { name: form.name, phone: form.phone, password: form.password };
        if (form.email) regPayload.email = form.email;
        await register(regPayload);
        setIsRegister(false);
        setSuccess('Registration successful! Please log in.');
      } else {
        await login(form);
        onClose();
      }
    } catch (err) {
      // Try to show backend error message if available
      if (err && err.message) {
        setError(err.message);
      } else if (err && err.response) {
        setError(err.response.data?.message || 'An error occurred.');
      } else {
        setError('An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target.classList.contains('modal-backdrop')) onClose(); }}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="modal-close"
          aria-label="Close sign in modal"
        >
          &times;
        </button>
        <h2 className="modal-title">{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="modal-form" autoComplete="off">
          {isRegister ? (
            <>
              <input
                type="text"
                name="phone"
                placeholder="Phone (required, 10 digits)"
                value={form.phone}
                onChange={handleChange}
                className="modal-input"
                autoComplete="off"
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Name (required)"
                value={form.name}
                onChange={handleChange}
                className="modal-input"
                autoComplete="off"
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Email (optional)"
                value={form.email}
                onChange={handleChange}
                className="modal-input"
                autoComplete="off"
              />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={form.password}
                onChange={handleChange}
                className="modal-input"
                required
                ref={passwordInputRef}
                autoComplete="off"
                minLength={6}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="phone"
                placeholder="Phone (required, 10 digits)"
                value={form.phone}
                onChange={handleChange}
                className="modal-input"
                autoComplete="off"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={form.password}
                onChange={handleChange}
                className="modal-input"
                required
                ref={passwordInputRef}
                autoComplete="off"
                minLength={6}
              />
            </>
          )}
          {error && <div className="modal-error">{error}</div>}
          {success && <div className="modal-success">{success}</div>}
          <button type="submit" className="modal-submit" disabled={loading}>
            {loading ? (isRegister ? 'Registering...' : 'Logging in...') : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>
        <div className="modal-switch">
          <button
            onClick={() => {
              if (isRegister || success) {
                setIsRegister(false);
                setError('');
                setSuccess('');
                setTimeout(() => passwordInputRef.current && passwordInputRef.current.focus(), 0);
              } else {
                setIsRegister(true);
                setError('');
                setSuccess('');
              }
            }}
            className="modal-switch-btn"
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal; 