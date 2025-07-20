import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">ComplaintApp</Link>

      <div className="ml-auto">
        {user ? (
          <>
            <Link to="/submit" className="btn btn-outline-light mx-2">Add Complaint</Link>
            <button onClick={logout} className="btn btn-outline-light">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light mx-2">Login</Link>
            <Link to="/register" className="btn btn-outline-light">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
