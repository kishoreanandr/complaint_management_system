import React, { useState } from 'react';
import axios from '../api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });

  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form); // becomes http://localhost:8080/api/auth/register
      alert('User registered successfully');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={register} className="card p-4">
      <h3>Register</h3>
      <input type="text" className="form-control mb-2" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} required />
      <input type="email" className="form-control mb-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input type="password" className="form-control mb-2" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
      <button className="btn btn-primary">Register</button>
    </form>
  );
}
