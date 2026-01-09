// backend/server.js - UPDATED
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const volunteerRoutes = require('./routes/volunteers');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
   
    'http://localhost:5173',
    'https://soorveeryuvasangathan.vercel.app/',
    'https://soorveeryuvasangthan.com/',
  
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));


// Body parsing with increased limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Connection - SIMPLIFIED (without deprecated options)
const connectDB = async () => {
  try {
    // Try production MongoDB first
    if (process.env.MONGODB_URI) {
      console.log('🔗 Connecting to MongoDB Atlas...');
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB Atlas Connected Successfully');
    } else {
      // Fallback to local MongoDB
      console.log('🔗 Connecting to local MongoDB...');
      await mongoose.connect('mongodb://127.0.0.1:27017/shoorveer_trust');
      console.log('✅ Local MongoDB Connected Successfully');
    }
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    
    // For Vercel deployment without MongoDB
    if (process.env.VERCEL) {
      console.log('⚠️  Vercel detected - Running without database (using mock data)');
    } else {
      console.log('💡 Tips to fix MongoDB connection:');
      console.log('1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
      console.log('2. Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas');
      console.log('3. Set MONGODB_URI in .env file');
    }
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/volunteers', volunteerRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    environment: process.env.NODE_ENV || 'development',
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not Configured',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`☁️  Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Ready' : 'Not Configured'}`);
  console.log(`🗄️  MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
});