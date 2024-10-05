// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from './Services';
import HeroSection from './HeroSection';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import RegisterForm from './RegisterForm';
import {DashboardPreview } from './DashboardPreview';
import Carousel from './Success';
import ApplicationPage from './Application';

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
          {/* Pass theme and toggleTheme as props to HeroSection */}
          <Route path="/" element={<HeroSection theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/success" element={<Carousel theme={theme} toggleTheme={toggleTheme} />}/>
          <Route path="/services" element={<Services theme={theme} toggleTheme={toggleTheme} />}/>
          <Route path="/application" element={<ApplicationPage  theme={theme} toggleTheme={toggleTheme}/>}/>
          <Route path="/dashboard" element={<DashboardPreview theme={theme} toggleTheme={toggleTheme}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
