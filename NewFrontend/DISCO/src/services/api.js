import axios from 'axios';

// API Base URL - update this to match your backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.detail || error.response.data?.message || 'Server error';
      console.error('Server Error:', message);
      throw new Error(message);
    } else if (error.request) {
      // Request made but no response
      console.error('No response from server');
      throw new Error('Cannot connect to server. Please check if the backend is running.');
    } else {
      // Something else happened
      console.error('Request Error:', error.message);
      throw error;
    }
  }
);

// API Service Methods
export const apiService = {
  // Health Check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Get Agents
  getAgents: async () => {
    const response = await api.get('/agents');
    return response.data;
  },

  // Create Order
  createOrder: async (orderData) => {
    const response = await api.post('/order', orderData);
    return response.data;
  },

  // Get Blockchain
  getBlockchain: async () => {
    const response = await api.get('/blockchain');
    return response.data;
  },

  // Get Specific Block
  getBlock: async (blockIndex) => {
    const response = await api.get(`/blockchain/${blockIndex}`);
    return response.data;
  },
};

// WebSocket Connection
export const createWebSocket = (path = '/ws/tracking') => {
  const wsUrl = API_BASE_URL.replace('http', 'ws') + path;
  return new WebSocket(wsUrl);
};

export default api;
