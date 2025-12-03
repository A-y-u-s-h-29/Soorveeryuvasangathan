// services/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const volunteerAPI = {
    // Create new volunteer
    createVolunteer: async (formData) => {
        const response = await API.post('/volunteers', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // Get all volunteers
    getAllVolunteers: async () => {
        const response = await API.get('/volunteers');
        return response.data;
    },

    // Get single volunteer
    getVolunteerById: async (id) => {
        const response = await API.get(`/volunteers/${id}`);
        return response.data;
    },

    // Delete volunteer
    deleteVolunteer: async (id) => {
        const response = await API.delete(`/volunteers/${id}`);
        return response.data;
    },

    // Download ID card
    downloadCard: async (id) => {
        const response = await API.get(`/volunteers/download/card/${id}`, {
            responseType: 'blob'
        });
        return response.data;
    }
};