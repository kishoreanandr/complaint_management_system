import React, { useState, useEffect } from 'react';
import axios from '../api';

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    userEmail: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
      setFormData((prev) => ({ ...prev, userEmail: user.email }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/complaints/', formData);
      alert('✅ Complaint submitted successfully!');
      setFormData({ title: '', description: '', userEmail: formData.userEmail }); // keep email
    } catch (err) {
      alert('❌ Failed to submit complaint. Please try again.');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4 text-primary">📝 Submit a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter detailed description"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit Complaint 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
