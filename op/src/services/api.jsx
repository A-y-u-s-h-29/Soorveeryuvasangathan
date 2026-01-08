// services/api.jsx - UPDATED VERSION

import axios from 'axios';

const API_URL = 'https://soorveeryuvasangathan.onrender.com/api';

// ✅ Add timeout configuration for Render cold starts
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds for Render cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Add retry logic for failed requests
const retryRequest = async (requestFn, retries = 2, delay = 3000) => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === retries) {
        console.log('All retry attempts failed');
        throw error;
      }
      console.log(`Retrying request... Attempts left: ${retries - i}`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const volunteerAPI = {
    // Create volunteer with image upload
    createVolunteer: async (formData) => {
        try {
            const response = await retryRequest(() => 
              axiosInstance.post('/volunteers', formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              })
            );
            return response.data;
        } catch (error) {
            console.error('Error creating volunteer:', error);
            // Provide better error message for user
            if (error.response) {
              throw { 
                message: error.response.data?.message || 'Registration failed',
                status: error.response.status 
              };
            } else if (error.request) {
              throw { 
                message: 'Backend is starting up. Please wait 30 seconds and try again.',
                status: 503 
              };
            }
            throw { message: 'Network error', status: 0 };
        }
    },

    // Get all volunteers
    getAllVolunteers: async () => {
        try {
            const response = await retryRequest(() => 
              axiosInstance.get('/volunteers')
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching volunteers:', error.message);
            // Return fallback data instead of throwing
            return { 
              success: false, 
              message: 'Using offline data',
              data: [] 
            };
        }
    },

    // Get volunteers by area
    getVolunteersByArea: async (area) => {
        try {
            const response = await retryRequest(() => 
              axiosInstance.get(`/volunteers/area/${area}`)
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching volunteers by area:', error.message);
            return { 
              success: false, 
              message: 'Failed to fetch area data',
              data: [] 
            };
        }
    },

    // Get area statistics
    getAreaStatistics: async () => {
        try {
            const response = await retryRequest(() => 
              axiosInstance.get('/volunteers/areas/stats')
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching area statistics:', error.message);
            return { 
              success: false, 
              message: 'Failed to fetch statistics',
              data: [] 
            };
        }
    },

    // Get single volunteer by ID
    getVolunteerById: async (id) => {
        try {
            const response = await retryRequest(() => 
              axiosInstance.get(`/volunteers/${id}`)
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching volunteer:', error.message);
            throw error;
        }
    },

    // ADMIN: Update volunteer role
    updateVolunteerRole: async (volunteerId, role, adminSecret) => {
        try {
            const response = await retryRequest(() => 
              axiosInstance.put(`/volunteers/${volunteerId}/role`, {
                role,
                adminSecret
              })
            );
            return response.data;
        } catch (error) {
            console.error('Error updating volunteer role:', error.message);
            if (error.response) {
              throw { 
                message: error.response.data?.message || 'Failed to update role',
                status: error.response.status 
              };
            }
            throw { message: 'Network error', status: 0 };
        }
    },

    // ADMIN: Get volunteers for assignment
    getVolunteersForAssignment: async (adminSecret) => {
        try {
            const response = await retryRequest(() => 
              axiosInstance.get(`/volunteers/admin/assignments?adminSecret=${adminSecret}`)
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching volunteers for assignment:', error.message);
            if (error.response?.status === 403) {
              throw { 
                message: 'Admin access required. Please enter valid admin secret.',
                status: 403 
              };
            }
            throw { message: 'Failed to fetch assignment data', status: 0 };
        }
    },

    // Delete volunteer
    deleteVolunteer: async (id) => {
        try {
            const response = await retryRequest(() => 
              axiosInstance.delete(`/volunteers/${id}`)
            );
            return response.data;
        } catch (error) {
            console.error('Error deleting volunteer:', error.message);
            throw error;
        }
    },

    // Health check
    healthCheck: async () => {
        try {
            const response = await axiosInstance.get('/health');
            return response.data;
        } catch (error) {
            console.error('Health check failed:', error.message);
            return { 
              status: 'down', 
              message: 'Backend is starting up. Please wait 30 seconds.' 
            };
        }
    }
};

export { volunteerAPI };