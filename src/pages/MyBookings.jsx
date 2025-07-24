import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import './mybooking.css';

const initialEditState = {
  _id: '', name: '', phone: '', address: '', clothCount: 1, serviceType: '', notes: '', status: '', date: ''
};

const MyBookings = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editBooking, setEditBooking] = useState(initialEditState);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete booking');
      setBookings(bookings.filter(b => b._id !== id));
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const openEditModal = (booking) => {
    setEditBooking({ ...booking });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditBooking({ ...editBooking, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${editBooking._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editBooking.name,
          phone: editBooking.phone,
          address: editBooking.address,
          clothCount: Number(editBooking.clothCount),
          serviceType: editBooking.serviceType,
          notes: editBooking.notes,
          status: editBooking.status
        })
      });
      if (!res.ok) throw new Error('Failed to update booking');
      const updated = await res.json();
      setBookings(bookings.map(b => b._id === updated._id ? updated : b));
      setEditModalOpen(false);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setEditLoading(false);
    }
  };

  if (!user) return <div style={{ padding: 32 }}>Please sign in to view your bookings.</div>;
  if (loading) return <div style={{ padding: 32 }}>Loading your bookings...</div>;
  if (error) return <div style={{ color: 'red', padding: 32 }}>{error}</div>;

  return (
    <div className="mybookings-container fade-in">
      <h2 className="mybookings-title">Your Bookings</h2>
      {bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <ul className="mybookings-list">
          {bookings.map(b => (
            <li key={b._id} className="mybookings-card animated-card">
              <div><span className="mybookings-label">Service:</span> {b.serviceType}</div>
              <div><span className="mybookings-label">Name:</span> {b.name}</div>
              <div><span className="mybookings-label">Phone:</span> {b.phone}</div>
              <div><span className="mybookings-label">Address:</span> {b.address}</div>
              <div><span className="mybookings-label">Cloth Count:</span> {b.clothCount}</div>
              <div><span className="mybookings-label">Status:</span> <span className={`mybookings-status status-${b.status.replace(/\s/g, '-').toLowerCase()}`}>{b.status}</span></div>

              {/* Payment section: show if status is 'parcel reached the hub', 'processed', 'out for delivery', or 'delivered' */}
              {['parcel reached the hub', 'processed', 'out for delivery', 'delivered'].includes(b.status) && (
                <div className="mybookings-amount-box">
                  {b.status === 'parcel reached the hub' && (!b.amount || b.amount === 0) ? (
                    <span style={{ color: '#888', fontStyle: 'italic' }}>Calculation under process</span>
                  ) : (
                    (typeof b.amount === 'number' && b.amount > 0) ? (
                      <>
                        <strong>Amount Due:</strong> ₹{b.amount}
                        <button
                          className="mybookings-action-btn"
                          style={{ marginLeft: 16 }}
                          onClick={() => alert('Payment gateway integration coming soon!')}
                        >
                          Pay Now
                        </button>
                      </>
                    ) : <span style={{ color: '#888', fontStyle: 'italic' }}>-</span>
                  )}
                </div>
              )}
              {b.status === 'cancelled' && b.cancelReason && (
                <div className="mybookings-cancel">
                  <span>Order Cancelled: {b.cancelReason}</span>
                </div>
              )}
              <div className="mybookings-date"><strong>Date:</strong> {new Date(b.date).toLocaleString()}</div>
              <div className="mybookings-actions">
                {['pending', 'accepted', 'out for pickup'].includes(b.status) && (
                  <>
                    <button className="mybookings-action-btn delete" onClick={() => handleDelete(b._id)}>
                      Delete
                    </button>
                    <button className="mybookings-action-btn edit" onClick={() => openEditModal(b)}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {editModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleEditSubmit} style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 320, maxWidth: 400, position: 'relative' }}>
            <button type="button" onClick={() => setEditModalOpen(false)} style={{ position: 'absolute', top: 10, right: 14, background: 'none', border: 'none', fontSize: 28, color: '#888', cursor: 'pointer', zIndex: 10, lineHeight: 1, fontWeight: 700 }}>&times;</button>
            <h3 style={{ marginBottom: 18 }}>Edit Booking</h3>
            <input type="text" name="name" value={editBooking.name} onChange={handleEditChange} placeholder="Name" style={{ width: '100%', marginBottom: 10, padding: 8 }} required />
            <input type="text" name="phone" value={editBooking.phone} onChange={handleEditChange} placeholder="Phone" style={{ width: '100%', marginBottom: 10, padding: 8 }} required />
            <input type="text" name="address" value={editBooking.address} onChange={handleEditChange} placeholder="Address" style={{ width: '100%', marginBottom: 10, padding: 8 }} required />
            <input type="number" name="clothCount" value={editBooking.clothCount} onChange={handleEditChange} placeholder="Cloth Count" style={{ width: '100%', marginBottom: 10, padding: 8 }} required min={1} />
            <select name="serviceType" value={editBooking.serviceType} onChange={handleEditChange} style={{ width: '100%', marginBottom: 10, padding: 8 }} required>
              <option value="">Select a service</option>
              <option value="Ironing">Ironing</option>
              <option value="Dry Cleaning">Dry Cleaning</option>
              <option value="Bleach">Bleach</option>
              <option value="Stain Removal">Stain Removal</option>
              <option value="Raffu">Raffu</option>
              <option value="Other">Other</option>
            </select>
            <textarea name="notes" value={editBooking.notes} onChange={handleEditChange} placeholder="Notes" rows={3} style={{ width: '100%', marginBottom: 10, padding: 8 }} />
            <button type="submit" className="btn book-btn animated-btn" style={{ width: '100%' }} disabled={editLoading}>
              {editLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyBookings; 