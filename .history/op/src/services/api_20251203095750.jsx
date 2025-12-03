// services/api.js
import axios from 'axios';

const API_URL = 'https://ngo-t3ob.onrender.com/api';

const volunteerAPI = {
    // Create volunteer with image upload
    createVolunteer: async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/volunteers`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating volunteer:', error);
            throw error;
        }
    },

    // Get all volunteers
    getAllVolunteers: async () => {
        try {
            const response = await axios.get(`${API_URL}/volunteers`);
            return response.data;
        } catch (error) {
            console.error('Error fetching volunteers:', error);
            throw error;
        }
    },

    // Get single volunteer by ID
    getVolunteerById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/volunteers/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching volunteer:', error);
            throw error;
        }
    },

    // Delete volunteer
    deleteVolunteer: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/volunteers/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting volunteer:', error);
            throw error;
        }
    },

    // Health check
    healthCheck: async () => {
        try {
            const response = await axios.get(`${API_URL}/health`);
            return response.data;
        } catch (error) {
            console.error('Health check failed:', error);
            throw error;
        }
    }
};

export { volunteerAPI };