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
    // NEW: Area field (free text)
    area: {
        type: String,
        required: true,
        trim: true
    },
    // NEW: Role field with 3 options
    role: {
        type: String,
        enum: ['member', 'president', 'vice-president'],
        default: 'member'
    },
    // NEW: Appointment details
    appointedBy: {
        type: String,
        default: 'system'
    },
    appointmentDate: {
        type: Date
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
    },
    // NEW: Admin-only fields
    isActive: {
        type: Boolean,
        default: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index for area and role (for efficient queries)
volunteerSchema.index({ area: 1, role: 1 });

// Add pre-save hook for uniqueId
volunteerSchema.pre('save', async function(next) {
    if (this.isNew && !this.uniqueId) {
        try {
            const lastVolunteer = await this.constructor.findOne().sort('-uniqueId');
            this.uniqueId = lastVolunteer ? lastVolunteer.uniqueId + 1 : 1;
        } catch (error) {
            // Fallback to timestamp if DB query fails
            this.uniqueId = Date.now() % 100000;
        }
    }
    next();
});

module.exports = mongoose.model('Volunteer', volunteerSchema);