import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

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
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#f9f9ff', borderRadius: 12 }} className="fade-in">
      <h2 style={{ marginBottom: 24 }}>Your Bookings</h2>
      {bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookings.map(b => (
            <li key={b._id} className="animated-card" style={{ marginBottom: 24, padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div><strong>Service:</strong> {b.serviceType}</div>
              <div><strong>Name:</strong> {b.name}</div>
              <div><strong>Phone:</strong> {b.phone}</div>
              <div><strong>Address:</strong> {b.address}</div>
              <div><strong>Cloth Count:</strong> {b.clothCount}</div>
              <div><strong>Status:</strong> <span style={{
                display: 'inline-block',
                padding: '2px 12px',
                borderRadius: 12,
                background: b.status === 'delivered' ? '#16a085' : b.status === 'on the way' ? '#f6c90e' : b.status === 'processed' ? '#f98d3a' : b.status === 'accepted' ? '#0077b6' : b.status === 'cancelled' ? '#888' : b.status === 'parcel reached the hub' ? '#6c63ff' : b.status === 'out for pickup' ? '#00b894' : b.status === 'out for delivery' ? '#fdcb6e' : '#e74c3c',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.98rem',
                textTransform: 'capitalize',
                marginLeft: 6
              }}>{b.status}</span></div>

              {/* Payment section: show if status is 'parcel reached the hub', 'processed', 'out for delivery', or 'delivered' */}
              {['parcel reached the hub', 'processed', 'out for delivery', 'delivered'].includes(b.status) && (
                <div style={{ marginTop: 8, background: '#f3f7ff', padding: 10, borderRadius: 8, border: '1px solid #dbeafe' }}>
                  {b.status === 'parcel reached the hub' && (!b.amount || b.amount === 0) ? (
                    <span style={{ color: '#888', fontStyle: 'italic' }}>Calculation under process</span>
                  ) : (
                    (typeof b.amount === 'number' && b.amount > 0) ? (
                      <>
                        <strong>Amount Due:</strong> ₹{b.amount}
                        <button
                          style={{ marginLeft: 16, padding: '6px 18px', background: '#0077b6', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }}
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
                <div style={{ color: '#e74c3c', marginTop: 6, fontWeight: 600 }}>
                  <span>Order Cancelled: {b.cancelReason}</span>
                </div>
              )}
              <div><strong>Date:</strong> {new Date(b.date).toLocaleString()}</div>
              <div style={{ marginTop: 10, display: 'flex', gap: 18 }}>
                {/* Edit and Delete options only if status is before 'picked up' */}
                {['pending', 'accepted', 'out for pickup'].includes(b.status) && (
                  <>
                    <span style={{ color: '#e74c3c', cursor: 'pointer', fontWeight: 600 }} onClick={() => handleDelete(b._id)}>
                      Delete
                    </span>
                    <span style={{ color: '#2980b9', cursor: 'pointer', fontWeight: 600 }} onClick={() => openEditModal(b)}>
                      Edit
                    </span>
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