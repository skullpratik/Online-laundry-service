import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

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
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings`)
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
    let cancelReason = '';
    if (newStatus === 'cancelled') {
      cancelReason = prompt('Enter reason for cancellation:', 'Order cancelled: out of range') || 'Order cancelled: out of range';
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cancelReason ? { status: newStatus, cancelReason } : { status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setBookings(bookings.map(b => b._id === updated._id ? updated : b));
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (loading) return <div className="admin-dashboard-loading">Loading bookings...</div>;
  if (error) return <div className="admin-dashboard-error">{error}</div>;

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
      <p className="admin-dashboard-welcome">Welcome, Admin! Here you can view all bookings and manage the system.</p>
      <div className="admin-dashboard-table-wrapper">
        <table className="admin-dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Cloth Count</th>
              <th>Service</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{b.address}</td>
                <td>{b.clothCount}</td>
                <td>{b.serviceType}</td>
                <td>{b.notes || '-'}</td>
                <td>
                  <span className={`admin-status-badge status-${b.status.replace(/\s/g, '-')}`}>{b.status}</span>
                  <select
                    value={b.status}
                    onChange={e => handleStatusChange(b._id, e.target.value)}
                    className="admin-status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="processed">Processed</option>
                    <option value="on the way">On the Way</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{new Date(b.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard; 