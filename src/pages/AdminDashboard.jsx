import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/bookings`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading bookings...</div>;
  if (error) return <div style={{ color: 'red', padding: 40 }}>{error}</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! Here you can view all bookings and manage the system.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Phone</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Service</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Status</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{b.name}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{b.phone}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{b.serviceType}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{b.status}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{new Date(b.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard; 