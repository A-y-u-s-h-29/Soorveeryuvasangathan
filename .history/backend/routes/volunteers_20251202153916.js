// backend/routes/volunteers.js
const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const upload = require('../middleware/upload');

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Volunteer routes working' });
});

// Routes - FIXED
router.post('/', upload.single('image'), volunteerController.createVolunteer);
router.get('/', volunteerController.getAllVolunteers);
router.get('/:id', volunteerController.getVolunteerById);
router.delete('/:id', volunteerController.deleteVolunteer);

// Remove this line if downloadCard doesn't exist:
// router.get('/download/card/:id', volunteerController.downloadCard);

// Add health check
router.get('/health', volunteerController.healthCheck);

module.exports = router;