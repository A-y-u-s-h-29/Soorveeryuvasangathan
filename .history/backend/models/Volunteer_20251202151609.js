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
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Mobile number must be 10 digits'
        }
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

// Auto-increment uniqueId
volunteerSchema.pre('save', async function(next) {
    if (this.isNew) {
        const lastVolunteer = await mongoose.models.Volunteer.findOne().sort('-uniqueId');
        this.uniqueId = lastVolunteer ? lastVolunteer.uniqueId + 1 : 1;
    }
    next();
});

module.exports = mongoose.model('Volunteer', volunteerSchema);