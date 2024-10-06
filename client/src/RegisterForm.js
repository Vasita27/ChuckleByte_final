import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './register.css'; // Scoped styles for register form

const RegisterForm = () => {
  const { internshipId,user} = useParams();
  console.log(internshipId,user) // Get the internship ID from the route parameters
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    internshipId: internshipId || '', // Set the internshipId from params
    phone: '',
    college: '',
    department: '',
    resume: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example error validation
    if (!formData.name || !formData.email || !formData.internshipId || !formData.phone || !formData.college || !formData.department || !formData.resume) {
      setError('Please fill in all required fields.');
      return; // Stop further execution
    } else {
      setError('');
    }

    // Create a FormData object for file upload
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      // Send the form data to the backend API
      const response = await axios.post('https://finaltask-c-2.onrender.com/api/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success
      setSuccess('Registration successful!');
      alert("Registration Successful");
      console.log('Response:', response.data);
      // Navigate to success page or dashboard
      navigate("/dashboard",{ state: { user } });
    } catch (error) {
      // Handle error
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Internship Registration</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>} {/* Display success message */}
        <div className="scrollable-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={user}
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
                readOnly // Optionally, make it read-only
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
