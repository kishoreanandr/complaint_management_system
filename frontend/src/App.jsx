// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Protected routes */}
          <Route path="/" element={<PrivateRoute><ComplaintList /></PrivateRoute>} />
          <Route path="/submit" element={<PrivateRoute><ComplaintForm /></PrivateRoute>} />

          {/* Public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
