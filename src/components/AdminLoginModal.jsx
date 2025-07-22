import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_ID = 'admin';
const ADMIN_PASS = '9819';

const AdminLoginModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('isAdmin', 'true');
        setLoading(false);
        onClose();
        navigate('/admin-dashboard');
      } else {
        setError(data.message || 'Login failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Server error');
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
          aria-label="Close admin login modal"
        >
          &times;
        </button>
        <h2 style={{ marginBottom: 16 }}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
            required
          />
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
          <button type="submit" style={{ width: '100%', padding: 10, background: '#29307a', color: '#fff', border: 'none', borderRadius: 6 }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal; 