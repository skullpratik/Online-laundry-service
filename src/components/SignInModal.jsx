import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const SignInModal = ({ open, onClose }) => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: '', phone: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await register(form);
        setIsRegister(false);
        setError('Registration successful! Please log in.');
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
    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="modal" style={{ position: 'relative', background: '#fff', padding: 32, borderRadius: 12, minWidth: 320, maxWidth: 400 }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 14,
            background: 'none',
            border: 'none',
            fontSize: 32,
            color: '#888',
            cursor: 'pointer',
            zIndex: 10,
            lineHeight: 1,
            fontWeight: 700
          }}
          aria-label="Close sign in modal"
        >
          &times;
        </button>
        <h2 style={{ marginBottom: 16 }}>{isRegister ? 'Register' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Name (optional)"
              value={form.name}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: 10, padding: 8 }}
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
            required
          />
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          <button type="submit" style={{ width: '100%', padding: 10, background: '#16a085', color: '#fff', border: 'none', borderRadius: 6 }} disabled={loading}>
            {loading ? (isRegister ? 'Registering...' : 'Signing in...') : (isRegister ? 'Register' : 'Sign In')}
          </button>
        </form>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <button onClick={() => setIsRegister(!isRegister)} style={{ background: 'none', border: 'none', color: '#0077b6', cursor: 'pointer' }}>
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal; 