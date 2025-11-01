// API utility file - Structure for backend integration
// Currently using static data, but this will be replaced with actual API calls

import axios from 'axios';

// Base URL - will be updated when backend is ready
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
};

// Influencer APIs
export const influencerAPI = {
    getAll: () => api.get('/influencers'),
    getById: (id) => api.get(`/influencers/${id}`),
    update: (id, data) => api.put(`/influencers/${id}`, data),
    delete: (id) => api.delete(`/influencers/${id}`),
    search: (filters) => api.get('/influencers/search', { params: filters }),
};

// Client APIs
export const clientAPI = {
    getAll: () => api.get('/clients'),
    getById: (id) => api.get(`/clients/${id}`),
    update: (id, data) => api.put(`/clients/${id}`, data),
    delete: (id) => api.delete(`/clients/${id}`),
    search: (filters) => api.get('/clients/search', { params: filters }),
};

// Admin APIs
export const adminAPI = {
    getAllUsers: () => api.get('/admin/users'),
    getAllInfluencers: () => api.get('/admin/influencers'),
    getAllClients: () => api.get('/admin/clients'),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
};

// Request/Subscription APIs (for future implementation)
export const requestAPI = {
    sendRequest: (data) => api.post('/requests', data),
    getRequests: () => api.get('/requests'),
    updateRequest: (id, data) => api.put(`/requests/${id}`, data),
};

export default api;
