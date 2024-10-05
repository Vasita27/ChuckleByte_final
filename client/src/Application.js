import { useState } from 'react';
import React from 'react';
import './Application.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const internships = [
  {
    id: 'INT001',
    title: 'Web Development',
    description: 'Join our team to enhance your skills in web development, working on exciting projects using the latest technologies.',
    image: 'https://futureskillsprime.in//sites/default/files/2021-04/web-development.jpg', // Update with your image path
  },
  {
    id: 'INT002',
    title: 'Digital Marketing',
    description: 'Gain hands-on experience in digital marketing, working with our experts on campaigns that drive results.',
    image: 'https://providerdigital.com.au/wp-content/uploads/2024/04/The-Basics-of-Digital-Marketing-A-Comprehensive-Guide.webp', // Update with your image path
  },
  {
    id: 'INT003',
    title: 'UI/UX Design',
    description: 'Learn the principles of user interface and user experience design while contributing to our innovative projects.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYUrMibF7R9as_QQe8YcLKh2Y8_XtSBgI1Yg&s', // Update with your image path
  },
  {
    id: 'INT004',
    title: 'Data Analytics',
    description: 'Explore data analytics techniques, helping clients make data-driven decisions through insightful analysis.',
    image: 'https://images.ctfassets.net/xj0skx6m69u2/KmgNRa2xROopqQp43uA2o/f2c9fe89e15717b7e734a73fa56ae19e/stockfresh_9557526_data-analytics-systems-software-for-mobile-devices_sizeS.jpg?fm=jpg&w=1200&h=630&fit=fill&f=Center', // Update with your image path
  },
  {
    id: 'INT005',
    title: 'Content Creation',
    description: 'Work with our content team to develop engaging content strategies that resonate with audiences across platforms.',
    image: 'https://images.squarespace-cdn.com/content/v1/5983753d893fc053508807d7/1622563358532-IQU9R7L1XFAOK975FD67/Types+of+Content+Creation+with+Dion+Marketing', // Update with your image path
  },
  {
    id: 'INT006',
    title: 'SEO Optimization',
    description: 'Assist in optimizing websites for search engines, learning the latest SEO strategies and tools to improve visibility.',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/8/VC/AP/JN/70075689/search-engine-optimization-services.jpeg', // Update with your image path
  },
  {
    id: 'INT007',
    title: 'Cloud Internship',
    description: 'Dive into cloud technologies, gaining practical experience in cloud solutions and infrastructure management.',
    image: 'https://www.device42.com/blog/wp-content/uploads/2023/03/14_01edge-cloud-computing-900x600.jpg', // Update with your image path
  },
  {
    id: 'INT008',
    title: 'Mobile App Development',
    description: 'Join our mobile app development team to create user-friendly applications that provide seamless experiences for users.',
    image: 'https://www.seasiainfotech.com/blog/wp-content/uploads/2021/11/Stats-of-mobile-app-development-1024x683.png', // Update with your image path
  },
];

const ApplicationPage = ({ theme, toggleTheme }) => {
    const [isToggled, setIsToggled] = useState(false);
    
  const handleRegister = (internshipId) => {
    // Handle registration logic here (e.g., send to backend)
    console.log(`Registered for internship: ${internshipId}`);
  };
  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
    toggleTheme();
  };

 
  return (
    <div className={`application-page ${theme}`}>
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
                style={{ color: "black" }}
                className={`theme-icon ${isToggled ? '' : 'hidden'}`}
                size="lg"
              />
            </div>
      <h2 className={`headers ${theme}`}>Internships Offered</h2>
      <div className="internship-container">
        {internships.map((internship) => (
          <div className={`internship-box ${theme}`} key={internship.id}>
            <img src={internship.image} alt={internship.title} className="internship-image" />
            <h3>{internship.title}</h3>
            <p>ID: {internship.id}</p>
            <p>{internship.description}</p>
            <button 
              className="register-button" 
              onClick={() => handleRegister(internship.id)}
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationPage;
