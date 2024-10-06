// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make API call to the backend for login
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Assuming the backend returns a token on successful login
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Navigate to the dashboard
      navigate('/dashboard', { state: { username } });
    } catch (err) {
      // Handle error from the API
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className='login'>
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
