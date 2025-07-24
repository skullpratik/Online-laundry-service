import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleStatusChange = async (id, newStatus, amount) => {
    let cancelReason = '';
    if (newStatus === 'cancelled') {
      cancelReason = prompt('Enter reason for cancellation:', 'Order cancelled: out of range') || 'Order cancelled: out of range';
    }
    try {
      const body = cancelReason ? { status: newStatus, cancelReason } : { status: newStatus };
      if (typeof amount === 'number') body.amount = amount;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/status/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
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
              <th>Amount (₹)</th>
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
                    onChange={e => handleStatusChange(b._id, e.target.value, b.amount)}
                    className="admin-status-select"
                    style={{ display: b.status === 'picked up' ? 'none' : undefined }}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="out for pickup">Out for Pickup</option>
                    <option value="picked up">Picked Up</option>
                    <option value="parcel reached the hub">Parcel Reached the Hub</option>
                    <option value="processed">Processed</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  {b.status === 'parcel reached the hub' ? (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleStatusChange(b._id, b.status, b.amount);
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <input
                        type="number"
                        min="0"
                        value={b.amount || ''}
                        onChange={e => {
                          const newAmount = e.target.value === '' ? undefined : Number(e.target.value);
                          setBookings(bookings.map(x => x._id === b._id ? { ...x, amount: newAmount } : x));
                        }}
                        style={{ width: 70 }}
                        placeholder="Set ₹"
                      />
                      <button type="submit" style={{ padding: '4px 10px', borderRadius: 6, background: '#0077b6', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                        Save
                      </button>
                    </form>
                  ) : (
                    typeof b.amount === 'number' && b.amount > 0 ? `₹${b.amount}` : <span style={{ color: '#888', fontStyle: 'italic' }}>-</span>
                  )}
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