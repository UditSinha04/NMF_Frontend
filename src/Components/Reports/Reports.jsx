import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAutoLogout } from '../Admin/useAutoLogout'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';

function Reports() {
  const [donations, setDonations] = useState([]);
  const [searchType, setSearchType] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const navigate = useNavigate();

  useAutoLogout(5); // Auto logout after 5 minutes of inactivity

  // --- Restrict access if not logged in ---
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/Admin');
    }
  }, [navigate]);
  // ----------------------------------------

  const fetchDonations = async (query = '') => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`http://localhost:5000/api/admin/donations${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setDonations(await res.json());
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleSearch = () => {
    if (searchType === 'name' && searchValue) {
      fetchDonations(`?name=${encodeURIComponent(searchValue)}`);
    } else if (searchType === 'date' && dateRange.from) {
      let query = `?from=${dateRange.from}`;
      if (dateRange.to) query += `&to=${dateRange.to}`;
      fetchDonations(query);
    }
  };

  // CSV download function
  const handleDownloadCSV = () => {
    if (!donations.length) return;
    const header = ['S.No.', 'Name', 'Address', 'Phone', 'Amount', 'Date', 'Time'];
    const rows = donations.map((donation, idx) => [
      idx + 1,
      donation.name,
      donation.address,
      donation.phone,
      donation.amount,
      donation.entry_date,
      donation.entry_time
    ]);
    const csvContent =
      [header, ...rows]
        .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
        .join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'donations_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // PDF download function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Donations Report', 14, 16);
    const tableColumn = ['S.No.', 'Name', 'Address', 'Phone', 'Amount', 'Date', 'Time'];
    const tableRows = donations.map((donation, idx) => [
      idx + 1,
      donation.name,
      donation.address,
      donation.phone,
      donation.amount,
      donation.entry_date,
      donation.entry_time
    ]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 }
    });
    doc.save('donations_report.pdf');
  };

  return (
    <div className="min-h-screen bg-[#f6f6e9] p-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            localStorage.removeItem('adminToken');
            navigate('/Admin');
          }}
          className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
        <button
          onClick={() => navigate('/Admin')}
          className="bg-gray-600 text-white px-4 py-2 rounded font-semibold hover:bg-gray-700 transition"
        >
          Go Back to Admin
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">Donations Report</h2>
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="name">Search by Name</option>
          <option value="date">Search by Date</option>
        </select>
        {searchType === 'name' ? (
          <input
            type="text"
            placeholder="Enter name"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="border rounded px-2 py-1"
          />
        ) : (
          <>
            <input
              type="date"
              value={dateRange.from}
              onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
              className="border rounded px-2 py-1"
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
              className="border rounded px-2 py-1"
            />
          </>
        )}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={() => {
            setSearchValue('');
            setDateRange({ from: '', to: '' });
            fetchDonations();
          }}
          className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
        >
          Reset
        </button>
        <button
          onClick={handleDownloadCSV}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Download CSV
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
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, idx) => (
              <tr key={donation.id}>
                <td className="py-2 px-4 border">{idx + 1}</td>
                <td className="py-2 px-4 border">{donation.name}</td>
                <td className="py-2 px-4 border">{donation.address}</td>
                <td className="py-2 px-4 border">{donation.phone}</td>
                <td className="py-2 px-4 border">{donation.amount}</td>
                <td className="py-2 px-4 border">
                  {donation.entry_date} {donation.entry_time}
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">No donations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;