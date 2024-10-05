import {React,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faMobileAlt, faBuilding, faCloud, faShieldAlt, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import './Services.css'; // Assuming you will apply custom styles in this file


const services = [
  { title: "Custom Software Development", description: "We craft bespoke software tailored to meet the unique challenges and needs of your business, ensuring high performance, scalability, and security.", icon: faCode },
  { title: "Web & Mobile Development", description: "From responsive websites to feature-rich mobile apps, we develop digital experiences that engage users and drive results.", icon: faMobileAlt },
  { title: "Enterprise Solutions", description: "We deliver enterprise-level solutions for automation, productivity enhancement, and seamless operations management.", icon: faBuilding },
  { title: "Cloud Solutions & DevOps", description: "Our cloud computing services enable businesses to leverage scalable, secure, and cost-effective infrastructure, while our DevOps practices ensure efficient deployment and maintenance.", icon: faCloud },
  { title: "Cybersecurity Services", description: "Protecting your digital assets is our priority. We provide end-to-end cybersecurity solutions to safeguard data and ensure compliance.", icon: faShieldAlt },
  { title: "IT Consulting", description: "We help businesses make informed technology decisions by providing strategic IT consulting and support to enhance overall performance and growth.", icon: faHandsHelping },
];

const Services = ({ theme, toggleTheme }) => {
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
    toggleTheme();
  };
  return (
    <div className="services-container">
      {services.map((service, index) => (
        <div className={`service-card ${theme}`} key={index}>
          <div className={`service-icon ${theme}`}>
            <FontAwesomeIcon icon={service.icon} size="2x" />
          </div>
          <div className={`service-info ${theme}`}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
