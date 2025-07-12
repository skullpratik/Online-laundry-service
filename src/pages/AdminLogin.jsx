import React from 'react';
import './login.css';

const AdminLogin = () => {
  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form className="login-form">
        <input type="email" placeholder="Admin Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
