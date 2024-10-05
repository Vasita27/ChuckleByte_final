import React, { useState } from 'react';
import './signup.css'; // Scoped styles for signup form
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState(''); // New username state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isPasswordStrong = (password) => {
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isPasswordStrong(password)) {
      setError('Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setError('');
    console.log('Signup form submitted:', { name, username, email, password }); // Include username in console log

    // Redirect to the login page or any other route after successful signup
    navigate("/dashboard");
  };

  return (
    <div className='signup'>
      <div className="signup-container">
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Username</label> {/* New username label */}
            <input
              type="text" // Input type for username
              value={username} // State for username
              onChange={(e) => setUsername(e.target.value)} // Update state on change
              required
            />
          </div>
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-btn">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
