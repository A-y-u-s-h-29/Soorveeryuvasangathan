// backend/controllers/volunteerController.js - UPDATED
const Volunteer = require('../models/Volunteer');
const fs = require('fs');
const path = require('path');

// Create new volunteer
exports.createVolunteer = async (req, res) => {
    try {
        const { name, aakNo, mobileNo, address } = req.body;
        
        console.log('Creating volunteer with data:', { name, aakNo, mobileNo, address });
        
        // Check if AAK no already exists
        const existingVolunteer = await Volunteer.findOne({ aakNo });
        if (existingVolunteer) {
            return res.status(400).json({ 
                success: false, 
                message: 'AAK number already registered' 
            });
        }

        // Generate uniqueId
        const lastVolunteer = await Volunteer.findOne().sort('-uniqueId');
        const uniqueId = lastVolunteer ? lastVolunteer.uniqueId + 1 : 1;
        
        // Handle image upload
        let imageUrl = '';
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const volunteer = new Volunteer({
            name,
            aakNo,
            mobileNo,
            address,
            imageUrl,
            uniqueId // Manually set uniqueId
        });

        await volunteer.save();

        console.log('Volunteer created successfully:', volunteer);

        res.status(201).json({
            success: true,
            message: 'Volunteer registered successfully',
            data: volunteer
        });
    } catch (error) {
        console.error('Error creating volunteer:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error',
            error: error.message 
        });
    }
};

// Get all volunteers
exports.getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: volunteers.length,
            data: volunteers
        });
    } catch (error) {
        console.error('Error getting volunteers:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};

// Get single volunteer
exports.getVolunteerById = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer) {
            return res.status(404).json({ 
                success: false, 
                message: 'Volunteer not found' 
            });
        }
        res.json({
            success: true,
            data: volunteer
        });
    } catch (error) {
        console.error('Error getting volunteer:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};

// Delete volunteer
exports.deleteVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        
        if (!volunteer) {
            return res.status(404).json({ 
                success: false, 
                message: 'Volunteer not found' 
            });
        }

        // Delete image file if exists
        if (volunteer.imageUrl) {
            const imagePath = path.join(__dirname, '..', volunteer.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await volunteer.deleteOne();

        res.json({
            success: true,
            message: 'Volunteer deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting volunteer:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};

// Simple health check
exports.healthCheck = (req, res) => {
    res.json({
        success: true,
        message: 'Volunteer API is working',
        timestamp: new Date()
    });
};