const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
app.use(cors({
  origin: ["https://final-task-chucklebyte-qohm.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // Allow all OPTIONS requests

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Client model
const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    message: { type: String, required: true },
});
const Client = mongoose.model('Client', clientSchema);

// Internship Registration model without resume
const internshipRegistrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    internshipId: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String, required: true },
}, {
    timestamps: true,
});

const InternshipRegistration = mongoose.model('InternshipRegistration', internshipRegistrationSchema);

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in: ' + error.message });
    }
});

// Client gathering route
app.post('/api/client-gathering', async (req, res) => {
    try {
        const clientData = new Client(req.body);
        await clientData.save();
        res.status(201).json({ message: 'Client data saved successfully!' });
    } catch (error) {
        console.error('Error saving client data:', error);
        res.status(500).json({ message: 'Error saving client data.' });
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUserByEmail = await User.findOne({ email });
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByEmail || existingUserByUsername) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Registration route for internships
app.post('/api/register', async (req, res) => {
    const { name, email, internshipId, phone, college, department } = req.body;

    // Validate required fields
    if (!name || !email || !internshipId || !phone || !college || !department) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newRegistration = new InternshipRegistration({
            name,
            email,
            internshipId,
            phone,
            college,
            department,
        });

        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get internships by username
app.get('/internships/:username', async (req, res) => {
    const username = req.params.username;

    try {
        const internships = await InternshipRegistration.find({ name: username });

        if (internships.length === 0) {
            return res.status(404).json({ message: 'No internships found for this user.' });
        }

        res.json(internships);
    } catch (error) {
        console.error('Error fetching internships:', error);
        res.status(500).json({ message: 'Error fetching internships', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
