import React from 'react';
import './ApplyForInternship.css';
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from './DashboardPreview';
import { useState } from 'react';
const ApplyForInternship = ({ theme, toggleTheme ,username }) => {
  const navigate=useNavigate();
  const handleApply = () => {
    // Scroll to the success stories section
    scrollToSection('success');
  };

  return (
    <div className="internship-container">
      <div className="image-section">
        <img src='./images/undraw_mobile_payments_re_7udl.svg' alt="Internship Illustration" />
      </div>
      <div className={`text-section ${theme}`}>
        <h2>Join Our Internship Program</h2>
        <p>
          Are you ready to take the next step in your career? Join our internship program and gain hands-on experience while working alongside industry experts. 
          This is more than just an internship; it’s your gateway to real-world challenges, innovative projects, and the opportunity to make a significant impact. 
          We are committed to fostering your growth and ensuring you develop the skills needed to succeed in your future endeavors. 
          Don’t miss this chance to accelerate your career—apply now and be part of our dynamic team!
        </p>
        <div className="button-container">
        <button onClick={() => window.location.href = `/application?username=${encodeURIComponent(username)}`} className='apply-button'>Apply Now</button>
          <button className="stories-button" onClick={() => scrollToSection('success')}>Read Success Stories</button>
        </div>
      </div>
    </div>
  );
};

export default ApplyForInternship;
