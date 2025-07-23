import React, { useState } from 'react';
import './login.css';

const CustomerLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <h2>Customer Login</h2>
      <p className="login-note">Note: This login is only for regular customers with registered accounts.</p>
      <form className="login-form">
        <input
          type="text"
          name="email"
          placeholder="Email or Phone"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default CustomerLogin;
