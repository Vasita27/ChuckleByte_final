// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeroSection from './HeroSection';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import {DashboardPreview} from './DashboardPreview';
import PrivateRoute from './PrivateRoute';
import ApplicationPage from './Application';
import RegisterForm from './RegisterForm';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Routes>
          <Route path="/" element={<HeroSection theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/dashboard"
            element={<DashboardPreview theme={theme} toggleTheme={toggleTheme} />}
          />
              <Route path="/application" element={<ApplicationPage theme={theme} toggleTheme={toggleTheme}/>} />
              <Route path="/register/:internshipId" element={<RegisterForm  theme={theme} toggleTheme={toggleTheme}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
