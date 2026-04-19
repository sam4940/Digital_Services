import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💊 Pharmaceutical Services - Dhofar
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/staff" className="nav-links">Staff Services</Link>
          </li>
          <li className="nav-item">
            <Link to="/patient" className="nav-links">Patient Services</Link>
          </li>
          {!isAuthenticated ? (
            <li className="nav-item">
              <Link to="/admin/login" className="nav-links nav-links-btn">Admin Login</Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-links">Dashboard</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links nav-links-btn">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;