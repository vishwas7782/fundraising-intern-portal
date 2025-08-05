// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Define Routes
app.use('/api', require('./routes/data'));

// Define a simple seed route to add dummy data
const Intern = require('./models/intern');
app.get('/seed', async (req, res) => {
    await Intern.deleteMany({}); // Clear existing data
    const interns = [
        { name: 'Vishwas Singh', referralCode: 'vishwas2025', donations: 15000 },
        { name: 'Jane Doe', referralCode: 'jane2025', donations: 25000 },
        { name: 'Alex Smith', referralCode: 'alex2025', donations: 18000 },
        { name: 'Priya Sharma', referralCode: 'priya2025', donations: 22000 },
        { name: 'John Applessed', referralCode: 'john2025', donations: 9500 },
    ];
    await Intern.insertMany(interns);
    res.send('Database seeded!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));