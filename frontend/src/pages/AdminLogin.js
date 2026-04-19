import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/admin/login', { email, password });
      localStorage.setItem('adminToken', response.data.token);
      setIsAuthenticated(true);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/admin/dashboard'), 1000);
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h1>Administration Login</h1>
        <p className="subtitle">Pharmaceutical Services Department</p>

        {message && <div className={`message ${message.includes('failed') ? 'error' : 'success'}`}>{message}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-login">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;