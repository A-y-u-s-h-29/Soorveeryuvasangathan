// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const volunteerRoutes = require('./routes/volunteers');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection - UPDATED VERSION
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shoorveer_trust')
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => {
    console.log('MongoDB Connection Error:', err);
    console.log('Please make sure MongoDB is running on your system');
    console.log('You can install MongoDB from: https://www.mongodb.com/try/download/community');
});

// Alternative connection string for newer MongoDB versions
// mongoose.connect('mongodb://127.0.0.1:27017/shoorveer_trust')

// Routes
app.use('/api/volunteers', volunteerRoutes);

// Test Route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Shoorveer Yuva Trust API',
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}`);
});