import React, { useState } from 'react';
import './register.css'; // Scoped styles for register form
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    internshipId: '',
    phone: '',
    college: '',
    department: '',
    resume: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example error validation
    if (!formData.name || !formData.email || !formData.internshipId || !formData.phone || !formData.college || !formData.department) {
      setError('Please fill in all required fields.');
    } else {
      setError('');
      console.log('Registration form submitted:', formData);
      // Navigate to success page or dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Internship Registration</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="scrollable-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Internship ID</label>
              <input
                type="text"
                name="internshipId"
                value={formData.internshipId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>College/University</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Upload Resume</label>
              <input
                type="file"
                name="resume"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="register-btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
