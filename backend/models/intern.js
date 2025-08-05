// server/models/intern.js
const mongoose = require('mongoose');

const InternSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    referralCode: {
        type: String,
        required: true,
        unique: true
    },
    donations: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Intern', InternSchema);