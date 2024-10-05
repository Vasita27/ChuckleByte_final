// LoginForm.js
import React, { useState } from 'react';
import './login.css'; // Scoped styles for login form
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log('Login form submitted:', { email, password });
    // Example error check (you can replace this with your actual logic)
    if (!email || !password) {
      setError('Please enter your email and password.');
    } else {
      setError('')
      navigate("/dashboard")
    }
  };

  return (
    <div className='login'>
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="login-btn" onClick={handleSubmit}>Login</button>
      </form>
    </div></div>
  );
};

export default LoginForm; // Ensure this is a default export
