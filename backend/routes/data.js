// server/routes/data.js
const express = require('express');
const router = express.Router();
const Intern = require('../models/intern');

// @route   GET /api/dashboard
// @desc    Get dashboard data for a single intern (we'll just get the first one for this task)
router.get('/dashboard', async (req, res) => {
    try {
        // For this task, we'll just find the first intern in the database as dummy data
        const internData = await Intern.findOne();
        if (!internData) {
            return res.status(404).json({ msg: 'No intern data found. Please seed the database.' });
        }
        res.json(internData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/leaderboard (BONUS)
// @desc    Get top 10 interns sorted by donations
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await Intern.find().sort({ donations: -1 }).limit(10);
        res.json(leaderboard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;