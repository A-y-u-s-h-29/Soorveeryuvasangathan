const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const upload = require('../middleware/upload');

// Routes
router.post('/', upload.single('image'), volunteerController.createVolunteer);
router.get('/', volunteerController.getAllVolunteers);
router.get('/:id', volunteerController.getVolunteerById);
router.delete('/:id', volunteerController.deleteVolunteer);
router.get('/download/card/:id', volunteerController.downloadCard);

module.exports = router;