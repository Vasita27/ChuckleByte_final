import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './DashboardPreview.css';
import Success from './Success';
import './Success.css';
import Footer from './Footer';

import Services from './Services';
import ApplyForInternship from './ApplyForInternship';
import ClientGatheringSection from './ClientGathering';
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
const DashboardPreview = ({ theme, toggleTheme }) => {
  
  const [isToggled, setIsToggled] = useState(false);
  const [content, setContent] = useState('Select a button to see content here.');
  const [image, setImage] = useState('./images/undraw_private_data_re_4eab.svg');

  // State for todos without strike-through tracking
  const [todos, setTodos] = useState([
    { text: 'Complete the project setup', completed: false },
    { text: 'Write the documentation', completed: false },
    { text: 'Test all features', completed: false }
  ]);

  const navigate = useNavigate();
  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
    toggleTheme();
  };

  const handleButtonClick = (buttonName) => {
    switch (buttonName) {
      case 'Project Status':
        setContent(
          <div>
            <h4>Your Todos</h4>
            <ul className="todo-list">
  {todos.map((todo, index) => (
    <li key={index}>
      <input
        type="checkbox"
        id={`todo${index + 1}`}
        // Added for toggling
        // Bind checkbox state to todo completion
      />
      <label htmlFor={`todo${index + 1}`}>
        {todo.text}
      </label>
    </li>
  ))}
</ul>


            <h4>Project Progress</h4>
            <div>
              <label>Frontend Completion</label>
              <div className="progress">
                <div className="progress-bar" style={{ width: '70%' }}>70%</div>
              </div>
            </div>
            <div>
              <label>Backend Completion</label>
              <div className="progress">
                <div className="progress-bar" style={{ width: '50%' }}>50%</div>
              </div>
            </div>
          </div>
        );
        setImage('./images/undraw_private_data_re_4eab.svg');
        break;
      case 'Profile':
        setContent(
          <div className="project-status-content">
            <h4>Project Status</h4>
            <p>You clicked Project Status!</p>
            {/* You can add more content related to the project status here */}
          </div>
        );
        setImage('./images/undraw_project_complete_lwss.svg');
        break;
        case 'Notifications':
          setContent(
            <div>
              <h4>Notifications</h4>
              <ul className="notification-list">
                <li>
                  <strong>New Message from Client:</strong> You have received a new message from John Doe regarding the recent project updates.
                </li>
                <li>
                  <strong>Internship Application Status:</strong> Your application for the Summer Internship has been reviewed. Check your dashboard for more details.
                </li>
                <li>
                  <strong>System Maintenance Scheduled:</strong> Please be informed that there will be scheduled maintenance on the system from 2 AM to 4 AM on October 10th.
                </li>
                <li>
                  <strong>New Feature Release:</strong> We are excited to announce the release of the new reporting feature. Explore the updated dashboard to see what's new!
                </li>
              </ul>
            </div>
          );
          setImage('./images/undraw_push_notifications_re_t84m.svg');
          break;
        
      default:
        setContent('Explore the variations options here.');
    }
  };

  // Function to toggle todo completion
  const toggleTodoCompletion = (index) => {
    const newTodos = [...todos]; // Clone the current todos
    newTodos[index].completed = !newTodos[index].completed; // Toggle the completion status
    setTodos(newTodos); // Update the state with the new todos array
  };

 

  return (
    <div className={`App dashboard ${theme}`} style={{ minHeight: '100vh' }} id="dashboard">
      <nav className={`actual ${theme} navbar navbar-expand-sm`}>
        <div className="container-fluid dashboard">
          <a className="navbar-brand" href="#">
            <img
              src="./images/Logo ChuckleByte Technologies.png"
              alt="Logo"
              style={{
                height: '50px',
                width: '50px',
                borderRadius: '50%',
                marginLeft: '20px'
              }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="nav-link btn-link" onClick={() => scrollToSection('dashboard')}>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-link" onClick={() => scrollToSection('internship')}>
                  Internships
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-link" onClick={() => scrollToSection('services')}>
                  Our Services
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-link" onClick={() => scrollToSection('success')}>
                  Success Stories
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-link" onClick={() => scrollToSection('client')}>
                  Client Contact
                </button>
              </li>
            </ul>

            <div className="toggle-wrapper d-flex align-items-center ms-3">
              <FontAwesomeIcon
                icon={faSun}
                className={`theme-icon ${isToggled ? 'hidden' : ''}`}
                size="lg"
              />
              <div
                className={`toggle-switch ${isToggled ? 'toggled' : ''}`}
                onClick={handleToggle}
              >
                <div className="toggle-switch-slider"></div>
              </div>
              <FontAwesomeIcon
                icon={faMoon}
                style={{ color: 'black' }}
                className={`theme-icon ${isToggled ? '' : 'hidden'}`}
                size="lg"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className={`container-fluid dashboard ${theme}`} style={{ padding: '20px' }}>
        <div className="content-container">
          {/* Left Section */}
          <div className="left-section">
            <div className="button-container">
              <button className={`btn ${theme} square-button`} onClick={() => handleButtonClick('Profile')}>
                Profile
              </button>
              <button className={`btn ${theme} square-button`} onClick={() => handleButtonClick('Project Status')}>
                Project Status
              </button>
              <button className={`btn ${theme} square-button`} onClick={() => handleButtonClick('Notifications')}>
                Notifications
              </button>
            </div>

            {/* Content Box with scrolling */}
            <div className={`content-box ${theme} scrollable`}>
              {content}
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            <img src={image} alt="Description" className="dashboard-image" style={{ height: '270px' }} />
          </div>
        </div>
      </div>

      <div className={`about-us-heading ${theme}`} style={{ padding: '5px' }} id="internship">
        <h2>Internships</h2>
      </div>
      <ApplyForInternship theme={theme} toggleTheme={toggleTheme}/>

      <div className={`about-us-heading ${theme}`} style={{ padding: '5px' }} id="services">
        <h2>Services</h2>
      </div>
      <Services theme={theme} toggleTheme={toggleTheme} />

      <div className={`about-us-heading ${theme}`} style={{ padding: '5px' }} id="success">
        <h2>Success Stories</h2>
      </div>
      <Success theme={theme} toggleTheme={toggleTheme}  />

      <div className={`about-us-heading ${theme}`} style={{ padding: '5px' }} id="client">
        <h2>Client Contact</h2>
      </div>
      <ClientGatheringSection theme={theme} toggleTheme={toggleTheme} />

      <Footer theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export {DashboardPreview,scrollToSection};
