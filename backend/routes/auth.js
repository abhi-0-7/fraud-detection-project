const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');  // User model

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 */
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check for missing fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create and save the new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        // Respond with success (include the new user ID for testing)
        res.status(201).json({ message: 'User registered successfully.', userId: newUser._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @route   POST /api/auth/login
 * @desc    Log in an existing user
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check for missing fields
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }
        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found. Please sign up.' });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        // If successful
        res.json({ message: 'Login successful.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
