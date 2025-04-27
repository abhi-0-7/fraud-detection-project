const mongoose = require('mongoose');

// Define the Transaction schema
const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    description: String,
    isFraud: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

// Create the Transaction model
module.exports = mongoose.model('Transaction', transactionSchema);
