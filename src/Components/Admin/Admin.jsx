import React, { useState, useEffect } from 'react';
import { useAutoLogout } from './useAutoLogout'; // Adjust the import based on your file structure

function Admin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [donations, setDonations] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [editingId, setEditingId] = useState(null);

  useAutoLogout(5); // Auto logout after 5 minutes of inactivity

  // Fetch donations after login
  const fetchDonations = async (query = '') => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:5000/api/admin/donations${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/Admin'; // or use navigate('/Admin') if using react-router
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setDonations(data);
      // Initialize amounts state
      const amtObj = {};
      data.forEach(d => { amtObj[d.id] = d.amount || ''; });
      setAmounts(amtObj);
    } else {
      setError('Failed to fetch donations');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        const { token } = data;
        localStorage.setItem('adminToken', token);
        // Add this line to force re-render in the same tab:
        window.dispatchEvent(new Event('storage'));
        setLoggedIn(true);
        fetchDonations();
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch {
      setError('Server error');
    }
  };

  const handleAmountChange = (id, value) => {
    setAmounts({ ...amounts, [id]: value });
  };

  const handleAmountSubmit = async (id) => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch('http://localhost:5000/api/admin/set-amount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id, amount: amounts[id] })
    });
    if (res.ok) {
      fetchDonations();
    } else {
      alert('Failed to update amount');
    }
  };

  // Delete donation handler
  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    const res = await fetch(`http://localhost:5000/api/admin/delete-donation/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      fetchDonations();
    } else {
      alert('Failed to delete entry');
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setLoggedIn(false);
    setDonations([]);
    setForm({ username: '', password: '' });
    setError('');
  };

  // Fetch donations if already logged in (e.g. after refresh)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setLoggedIn(true);
      fetchDonations();
    }
    // eslint-disable-next-line
  }, []);

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6e9]">
        <form
          onSubmit={handleLogin}
          className="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Admin Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-gray-700 text-white rounded px-4 py-2 font-semibold hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6e9] p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center flex-1">Donations Table</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition ml-4"
        >
          Logout
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border">S.No.</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Date & Time</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, idx) => (
              <tr key={donation.id}>
                <td className="py-2 px-4 border">{idx + 1}</td>
                <td className="py-2 px-4 border">{donation.name}</td>
                <td className="py-2 px-4 border">{donation.address}</td>
                <td className="py-2 px-4 border">{donation.phone}</td>
                <td className="py-2 px-4 border">
                  {editingId === donation.id ? (
                    <input
                      type="number"
                      value={amounts[donation.id] || ''}
                      onChange={e => handleAmountChange(donation.id, e.target.value)}
                      className="border rounded px-2 py-1 w-24"
                      autoFocus
                    />
                  ) : (
                    donation.amount
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {donation.entry_date} {donation.entry_time}
                </td>
                <td className="py-2 px-4 border flex gap-2">
                  {editingId === donation.id ? (
                    <>
                      <button
                        onClick={() => {
                          handleAmountSubmit(donation.id);
                          setEditingId(null);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setAmounts({ ...amounts, [donation.id]: donation.amount || '' });
                        }}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(donation.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditingId(donation.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4">No donations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
