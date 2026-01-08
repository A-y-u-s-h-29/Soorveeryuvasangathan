const Volunteer = require('../models/Volunteer');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// Create new volunteer with Cloudinary
exports.createVolunteer = async (req, res) => {
  try {
    const { name, aakNo, mobileNo, address, area } = req.body;
    
    console.log('Creating volunteer:', { name, aakNo, mobileNo, address, area });
    console.log('File received:', req.file ? 'Yes' : 'No');
    
    // Validate required fields
    if (!name || !aakNo || !mobileNo || !address || !area) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (name, AAK no, mobile, address, area)'
      });
    }

    // Check if AAK number already exists
    const existingVolunteer = await Volunteer.findOne({ aakNo });
    if (existingVolunteer) {
      return res.status(400).json({
        success: false,
        message: 'AAK number already registered'
      });
    }

    // Validate area (simple check for non-empty string)
    if (area.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Area must be at least 2 characters'
      });
    }

    let imageUrl = '';
    
    // Handle image upload to Cloudinary
    if (req.file) {
      try {
        console.log('Uploading image to Cloudinary...');
        console.log('File details:', {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size
        });

        // Upload to Cloudinary
        const result = await uploadToCloudinary(
          req.file.buffer,
          `volunteer_${Date.now()}`
        );

        imageUrl = result.secure_url;
        console.log('Image uploaded to Cloudinary:', imageUrl);
      } catch (uploadError) {
        console.error('Cloudinary upload failed:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Image upload failed',
          error: uploadError.message
        });
      }
    }

    // Create volunteer
    const volunteer = new Volunteer({
      name,
      aakNo,
      mobileNo,
      address,
      area: area.trim(),
      imageUrl
    });

    await volunteer.save();

    console.log('Volunteer created successfully:', volunteer._id);

    res.status(201).json({
      success: true,
      message: 'Volunteer registered successfully',
      data: volunteer
    });

  } catch (error) {
    console.error('Error creating volunteer:', error);
    
    // Clean up uploaded image if volunteer creation failed
    if (imageUrl) {
      try {
        await deleteFromCloudinary(imageUrl);
      } catch (cleanupError) {
        console.error('Cleanup failed:', cleanupError);
      }
    }

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
    const volunteers = await Volunteer.find().sort({ area: 1, role: 1, name: 1 });
    
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

// Get volunteers by area
exports.getVolunteersByArea = async (req, res) => {
  try {
    const { area } = req.params;
    
    if (!area) {
      return res.status(400).json({
        success: false,
        message: 'Area parameter is required'
      });
    }

    const volunteers = await Volunteer.find({ 
      area: new RegExp(area, 'i') 
    }).sort({ role: 1, name: 1 });

    res.json({
      success: true,
      count: volunteers.length,
      area: area,
      data: volunteers
    });
  } catch (error) {
    console.error('Error getting volunteers by area:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get area statistics
exports.getAreaStatistics = async (req, res) => {
  try {
    const stats = await Volunteer.aggregate([
      {
        $group: {
          _id: '$area',
          total: { $sum: 1 },
          presidents: { 
            $sum: { $cond: [{ $eq: ['$role', 'president'] }, 1, 0] } 
          },
          vicePresidents: { 
            $sum: { $cond: [{ $eq: ['$role', 'vice-president'] }, 1, 0] } 
          },
          members: { 
            $sum: { $cond: [{ $eq: ['$role', 'member'] }, 1, 0] } 
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting area statistics:', error);
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

// ADMIN: Update volunteer role (role assignment)
exports.updateVolunteerRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, adminSecret } = req.body;

    // Check for admin secret (simple admin authentication)
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    // Validate role
    const validRoles = ['member', 'president', 'vice-president'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be: member, president, or vice-president'
      });
    }

    const volunteer = await Volunteer.findById(id);
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    // Check for duplicate president in same area
    if (role === 'president') {
      const existingPresident = await Volunteer.findOne({
        area: volunteer.area,
        role: 'president',
        _id: { $ne: id }
      });

      if (existingPresident) {
        return res.status(400).json({
          success: false,
          message: `Area "${volunteer.area}" already has a president: ${existingPresident.name}`
        });
      }
    }

    // Check for duplicate vice-president in same area
    if (role === 'vice-president') {
      const existingVicePresident = await Volunteer.findOne({
        area: volunteer.area,
        role: 'vice-president',
        _id: { $ne: id }
      });

      if (existingVicePresident) {
        return res.status(400).json({
          success: false,
          message: `Area "${volunteer.area}" already has a vice-president: ${existingVicePresident.name}`
        });
      }
    }

    // Update role
    const oldRole = volunteer.role;
    volunteer.role = role;
    volunteer.appointedBy = 'admin';
    volunteer.appointmentDate = new Date();
    volunteer.lastUpdated = new Date();

    await volunteer.save();

    res.json({
      success: true,
      message: `Role updated from ${oldRole} to ${role} for ${volunteer.name}`,
      data: volunteer
    });
  } catch (error) {
    console.error('Error updating volunteer role:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// ADMIN: Get volunteers needing role assignment
exports.getVolunteersForAssignment = async (req, res) => {
  try {
    const { adminSecret } = req.query;

    // Check for admin secret
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const volunteers = await Volunteer.find().sort({ area: 1, name: 1 });
    
    // Get area-wise role availability
    const areaStats = await Volunteer.aggregate([
      {
        $group: {
          _id: '$area',
          hasPresident: { $max: { $cond: [{ $eq: ['$role', 'president'] }, 1, 0] } },
          hasVicePresident: { $max: { $cond: [{ $eq: ['$role', 'vice-president'] }, 1, 0] } }
        }
      }
    ]);

    res.json({
      success: true,
      count: volunteers.length,
      data: volunteers,
      areaStats: areaStats
    });
  } catch (error) {
    console.error('Error getting volunteers for assignment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete volunteer with Cloudinary cleanup
exports.deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
    }

    // Delete image from Cloudinary if exists
    if (volunteer.imageUrl && volunteer.imageUrl.includes('cloudinary')) {
      try {
        await deleteFromCloudinary(volunteer.imageUrl);
        console.log('Image deleted from Cloudinary');
      } catch (deleteError) {
        console.error('Failed to delete image from Cloudinary:', deleteError);
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

// Health check
exports.healthCheck = (req, res) => {
  res.json({
    success: true,
    message: 'Volunteer API is working',
    timestamp: new Date(),
    features: ['area-management', 'role-assignment', 'admin-api']
  });
};