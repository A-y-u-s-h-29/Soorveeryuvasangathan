// backend/models/Volunteer.js - SIMPLE VERSION
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    aakNo: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    uniqueId: {
        type: Number
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
});

// Remove the pre-save hook for now
// We'll handle uniqueId in controller

module.exports = mongoose.model('Volunteer', volunteerSchema);