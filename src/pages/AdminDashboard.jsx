import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simple client-side admin check
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin-login');
      return;
    }
    setLoading(true);
    fetch('/api/bookings')
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
  }, [navigate]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setBookings(bookings.map(b => b._id === updated._id ? updated : b));
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

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
              <td style={{ border: '1px solid #ccc', padding: 8 }}>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 12px',
                  borderRadius: 12,
                  background: b.status === 'delivered' ? '#16a085' : b.status === 'on the way' ? '#f6c90e' : b.status === 'processed' ? '#f98d3a' : b.status === 'accepted' ? '#0077b6' : '#e74c3c',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.98rem',
                  textTransform: 'capitalize',
                  marginRight: 8
                }}>{b.status}</span>
                <select
                  value={b.status}
                  onChange={e => handleStatusChange(b._id, e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 8,
                    border: '1px solid #ccc',
                    fontSize: '0.98rem',
                    marginLeft: 4
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="processed">Processed</option>
                  <option value="on the way">On the Way</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{new Date(b.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard; 