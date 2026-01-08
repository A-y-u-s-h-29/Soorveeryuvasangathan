const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const upload = require('../middleware/upload');

// Test route
router.get('/test', (req, res) => {
    res.json({ 
        message: 'Volunteer routes working',
        features: ['create', 'list', 'area-filter', 'role-assignment']
    });
});

// Public routes
router.post('/', upload.single('image'), volunteerController.createVolunteer);
router.get('/', volunteerController.getAllVolunteers);
router.get('/area/:area', volunteerController.getVolunteersByArea);
router.get('/areas/stats', volunteerController.getAreaStatistics);
router.get('/:id', volunteerController.getVolunteerById);

// Admin routes (protected by admin secret)
router.put('/:id/role', volunteerController.updateVolunteerRole);
router.get('/admin/assignments', volunteerController.getVolunteersForAssignment);

// Delete route
router.delete('/:id', volunteerController.deleteVolunteer);

// Health check
router.get('/health', volunteerController.healthCheck);

module.exports = router;