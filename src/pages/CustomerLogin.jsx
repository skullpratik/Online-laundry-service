import React from 'react';
import './Login.css';

const CustomerLogin = () => {
  return (
    <div className="login-container">
      <h2>Customer Login</h2>
      <p className="login-note">Note: This login is only for regular customers with registered accounts.</p>
      <form className="login-form">
        <input type="text" placeholder="Email or Phone" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default CustomerLogin;
