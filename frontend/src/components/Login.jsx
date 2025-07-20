// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', form);
      const { token, user } = response.data;
      login(user, token); // Update context
      alert('Login successful');
      navigate('/'); // Redirect to complaint form or home
    } catch (error) {
      console.error(error);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h3>Login</h3>
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />
      <button className="btn btn-success">Login</button>
    </form>
  );
}
