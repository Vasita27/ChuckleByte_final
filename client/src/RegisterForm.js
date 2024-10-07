import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'; // Add your CSS file for styling

const RegisterForm = () => {
    const { internshipId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        internshipId: internshipId || '',
        phone: '',
        college: '',
        department: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Function to set form data on blur
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form Data before submission:', formData); // Debugging line

        // Check if all required fields are filled
        if (!formData.name || !formData.email || !formData.internshipId || !formData.phone || !formData.college || !formData.department) {
            setError('Please fill in all required fields.');
            return;
        } else {
            setError('');
        }

        try {
            const response = await axios.post('https://final-task-c.vercel.app/api/register', formData, {
                headers: {
                    'Content-Type': 'application/json', // Set the content type as JSON
                },
            });

            setSuccess('Registration successful!');
            alert("Registration Successful");
            console.log('Response:', response.data);
            navigate("/dashboard");
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register">
            <div className="register-container">
                <h2>Internship Registration</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onBlur={handleBlur} // Using onBlur to set value
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            onBlur={handleBlur} // Using onBlur to set value
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Internship ID</label>
                        <input
                            type="text"
                            name="internshipId"
                            value={formData.internshipId} // Read-only since it comes from URL
                            onBlur={handleBlur} // Using onBlur to set value
                            required
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            onBlur={handleBlur} // Using onBlur to set value
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>College/University</label>
                        <input
                            type="text"
                            name="college"
                            onBlur={handleBlur} // Using onBlur to set value
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            onBlur={handleBlur} // Using onBlur to set value
                            required
                        />
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
