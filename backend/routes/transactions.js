const express = require('express');
const nodemailer = require('nodemailer');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

const router = express.Router();

/**
 * @route   POST /api/transactions
 * @desc    Submit a transaction and detect fraud
 */
router.post('/', async (req, res) => {
    try {
        const { userId, amount, description } = req.body;
        // Validate input
        if (!userId || amount == null) {
            return res.status(400).json({ error: 'userId and amount are required.' });
        }
        // Find the user to get email/name
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }

        // Simple fraud detection logic (placeholder):
        // Mark as fraud if amount is over 10000 (for example)
        const isFraud = amount > 10000;

        // Save the transaction
        const newTransaction = new Transaction({
            userId,
            amount,
            description,
            isFraud
        });
        await newTransaction.save();

        // If fraud detected, send an email notification
        if (isFraud) {
            // Create a Nodemailer transporter using Gmail SMTP
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS  // Use an App Password&#8203;:contentReference[oaicite:22]{index=22}
                }
            });
            // Email details
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: '⚠️ Fraudulent Transaction Alert',
                text: `Hello ${user.name},\n\nWe detected a potentially fraudulent transaction of $${amount} on your account. Please review this transaction immediately.\n\nThank you.`
            };
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('❌ Error sending email:', error);
                } else {
                    console.log('✅ Fraud alert email sent:', info.response);
                }
            });
        }

        // Respond with the transaction result
        res.json({ success: true, isFraud, transaction: newTransaction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
