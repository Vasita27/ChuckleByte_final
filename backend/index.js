const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// MongoDB connection (default is localhost)

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


const app = express();
const PORT = process.env.PORT || 5000;
  // Secret key for JWT

app.use(cors(
  {
    origin:["https://final-task-chucklebyte-qohm.vercel.app"],
    methods:["POST","GET"],
    credentials:true
));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the uploads directory path
const uploadDir = path.join(__dirname, 'uploads');

// Create uploads directory if it does not exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory with recursive option
}

// User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);
const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    message: { type: String, required: true },
  });
  
  // Create a model
const Client = mongoose.model('Client', clientSchema);
// Middleware to verify JWT


// Internship Registration model
const internshipRegistrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    internshipId: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String, required: true },
    resume: { type: String, required: true }, // Store the path to the resume file
}, {
    timestamps: true,
});

const InternshipRegistration = mongoose.model('InternshipRegistration', internshipRegistrationSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use the defined uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
});

const upload = multer({ storage });

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
            const token = jwt.sign({ email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in: ' + error.message });
    }
});
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
    console.log("ugfkegg;i")
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
        res.status(500).json({ message: 'Serverjlhjvjh error' });
    }
});

// Registration route for internships
app.post('/api/register', upload.single('resume'), async (req, res) => {
    const { name, email, internshipId, phone, college, department } = req.body;
    
    try {
        const newRegistration = new InternshipRegistration({
            name,
            email,
            internshipId,
            phone,
            college,
            department,
            resume: req.file.path, // Save the file path
        });

        await newRegistration.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.get('/internships/:username', async (req, res) => {
    const username = req.params.username;
    console.log(username)

  
    try {
      const internships = await InternshipRegistration .find({ name:username });
  
      if (internships.length === 0) {
        return res.status(404).json({ message: 'No internships found for this user.' });
      }
  
      res.json(internships); // Respond with the array of internships
    } catch (error) {
      console.error('Error fetching internships:', error);
      res.status(500).json({ message: 'Error fetching internships', error });
    }
  });


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
