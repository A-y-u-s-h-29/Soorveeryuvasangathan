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
  try {
    return await requestFn();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying request... Attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return await retryRequest(requestFn, retries - 1, delay);
    }
    throw error;
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
                message: error.response.data.message || 'Registration failed',
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
            console.error('Error fetching volunteers:', error);
            // Return fallback data instead of throwing
            return { 
              success: false, 
              message: 'Using offline data',
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
            console.error('Error fetching volunteer:', error);
            throw error;
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
            console.error('Error deleting volunteer:', error);
            throw error;
        }
    },

    // Health check
    healthCheck: async () => {
        try {
            const response = await axiosInstance.get('/health');
            return response.data;
        } catch (error) {
            console.error('Health check failed:', error);
            return { 
              status: 'down', 
              message: 'Backend is starting up. Please wait 30 seconds.' 
            };
        }
    }
};

export { volunteerAPI };