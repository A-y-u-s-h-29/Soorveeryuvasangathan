// backend/models/Volunteer.js
const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    aakNo: {
        type: String,
        required: [true, 'AAK number is required'],
        unique: true
    },
    mobileNo: {
        type: String,
        required: [true, 'Mobile number is required'],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Mobile number must be 10 digits'
        }
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    imageUrl: {
        type: String,
        default: ''
    },
    uniqueId: {
        type: Number,
        unique: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// CORRECTED: Auto-increment uniqueId with async/await
volunteerSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            // Find the last volunteer to get the highest uniqueId
            const lastVolunteer = await this.constructor.findOne().sort('-uniqueId');
            this.uniqueId = lastVolunteer ? lastVolunteer.uniqueId + 1 : 1;
        }
        next(); // Call next() to continue
    } catch (error) {
        next(error); // Pass error to next()
    }
});

// Alternative SIMPLER version (if above doesn't work):
/*
volunteerSchema.pre('save', function(next) {
    if (this.isNew) {
        // For now, use timestamp as uniqueId
        this.uniqueId = Date.now();
    }
    next();
});
*/

module.exports = mongoose.model('Volunteer', volunteerSchema);