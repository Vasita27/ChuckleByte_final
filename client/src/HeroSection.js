import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css'; // Ensure Bootstrap is included
import { ReactTyped } from 'react-typed'; // Correctly importing ReactTyped

const HeroSection = ({ theme, toggleTheme }) => {
    const [isToggled, setIsToggled] = useState(false);
    const navigate=useNavigate();
    const handleClick=()=>{
      navigate("/login")
    }
    const handleClickTwo=()=>{
      navigate("/register")
    }

    const handle=()=>{
      navigate("/signup")
    }
  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
    toggleTheme(); // Call the function to toggle theme in parent component
  };
  return (
    <div className={`App ${theme}`}>
    
      
      <div className={`container-fluid hero-container ${theme}`}>
        {/* First Row: Half the page height */}
        
        
          <div className="col-md-12 text-center">
          <div className={`row first-row ${theme} align-items-center`}>
        <div className="toggle-wrapper" style={{alignContent:"end",display:"flex",justifyContent:"end"}}>
          {/* Sun Icon */}
         
          
          <FontAwesomeIcon 
            icon={faSun} 
            className={`theme-icon ${isToggled ? 'hidden' : ''}`} 
            size="lg" 
          />
          <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
            <div className="toggle-switch-slider"></div>
          </div>
          {/* Moon Icon */}
          <FontAwesomeIcon style={{color:"white"}}
            icon={faMoon} 
            className={`theme-icon ${isToggled ? '' : 'hidden'}`} 
            size="lg" 
          />
          <div className="top-left-image-container">
  <img src="./images/Logo ChuckleByte Technologies.png" alt="Profile" className="top-left-image" style={{height:"50px",width:"50px"}}/>
</div>

        </div>
            <h1 className="display-4">Welcome to ChuckleByte Technologies</h1>
            <p className={`lead ${theme}`}>Explore our innovative solutions designed to bring your ideas to life with cutting-edge technology and creative insights.</p>

            <div className="button-container">
  <button className={`custom-button one ${theme}`}onClick={handleClick}>Login</button>
  <button onClick={handle} className={`custom-button two ${theme}`}>Signup</button>
</div>


          </div>
        </div>

        {/* Second Row: Other half of the page height */}
        <div className={`row second-row ${theme}`}>
          {/* Left Column */}
          <div className={`col-md-6 left-col ${theme}`}>
            <div className="row one align-items-center">
              <div className="col-md-7">
                <h2 className={`headertext ${theme}`}>
                  <ReactTyped
                    strings={['Are you a passinate student?','Want to improve careerwise?']} // The text to type out
                    typeSpeed={50}  // Speed of typing
                    backSpeed={30}  // Speed of deleting (backspace)
                    loop={true}    // No loop
                  />
                </h2>
                <p  className={`sub ${theme}`}>Explore our internship opputunities and stepup up your career!</p>
                <button className={`intern ${theme}`} onClick={handleClickTwo}>Apply Now!</button>
              </div>
              <div className="col-md-5">
                <img src="./images/undraw_interview_re_e5jn (1).svg" height={"100px"} alt="Interview" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={`col-md-6 left-col ${theme}`}>
            <div className="row one align-items-center">
              <div className="col-md-7">
                <h2 className={`headertext ${theme}`}>
                  <ReactTyped
                    strings={['Are you a client?','Collaborate with us to get your products delivered']} // The text to type out
                    typeSpeed={50}  // Speed of typing
                    backSpeed={30}  // Speed of deleting (backspace)
                    loop={true}    // No loop
                  />
                </h2>
                <p  className={`sub ${theme}`}>We have various services which can help grow your team.Contact us now by signing up and sending your details</p>
                <button className={`intern ${theme}`} onClick={handle}>Apply Now!</button>
              </div>
              <div className="col-md-5">
                <img src="./images/undraw_undraw_applications_vaxx_-1-_2qra.svg" height={"100px"} alt="Interview" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
