import React, { useEffect, useState } from 'react';
import axios from '../api'; // axios instance with baseURL
import { useNavigate } from 'react-router-dom';

export default function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchComplaints = async () => {
      try {
        const response = await axios.get('/complaints', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        alert('Session expired or error fetching complaints. Please login again.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate]);

  if (loading) return <div className="text-center mt-4">Loading complaints...</div>;

  return (
    <div className="card p-4 shadow">
      <h2 className="mb-3">Your Complaints</h2>
      {complaints.length === 0 ? (
        <div>No complaints found.</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={complaint.id}>
                <td>{index + 1}</td>
                <td>{complaint.title}</td>
                <td>{complaint.description}</td>
                <td>{complaint.status}</td>
                <td>{new Date(complaint.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
