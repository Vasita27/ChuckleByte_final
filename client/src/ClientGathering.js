// ClientGatheringSection.js

import React, { useState } from 'react';
import './ClientGathering.css';
import axios from 'axios'; // Import Axios

const ClientGatheringSection = ({ theme, toggleTheme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://finaltask-c-2.onrender.com/api/client-gathering', formData);
      console.log(response.data); // Handle success
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', company: '', message: '' }); // Reset the form
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="client-gathering-container">
      <div className={`client-gathering-section ${theme}`}>
        <h2>Work with Us</h2>
        <p>We provide top-notch services for our clients. Let’s work together.</p>
        <form className="client-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className={`submit-button ${theme}`}>Send</button>
        </form>
      </div>
      <div className="image-container">
        <img src='./images/undraw_agreement_re_d4dv.svg' alt="Agreement Illustration"/>
      </div>
    </div>
  );
};

export default ClientGatheringSection;
