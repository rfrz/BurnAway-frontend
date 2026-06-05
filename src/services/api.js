import axios from 'axios';
import { normalizePrediction, normalizePredictions } from '../utils/prediction';

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || '/api';
  // Remove trailing slash if exists
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  // Append /api if not already there and url is not exactly '/api'
  if (url !== '/api' && !url.endsWith('/api')) {
    url += '/api';
  }
  return url;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor: add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('burnaway_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor: handle 401 & unwrap data
api.interceptors.response.use((response) => {
  // Assuming backend returns { success, message, data }
  return response.data?.data || response.data;
}, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('burnaway_token');
    // Karena menggunakan HashRouter, kita perlu mengecek dan mengubah bagian hash-nya
    if (window.location.hash !== '#/login' && window.location.hash !== '#/register' && window.location.hash !== '#/') {
      window.location.hash = '#/login';
    }
  }
  
  // Extract custom error message from backend if available
  const message = error.response?.data?.message || error.message || 'Something went wrong';
  return Promise.reject(new Error(message));
});

const apiService = {
  // Auth
  login: (email, password) => api.post('/sessions', { email, password }),
  register: (data) => api.post('/users', data),
  
  // Profile
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.patch('/users/me', data),
  updatePassword: (data) => api.patch('/users/me/password', data),
  deleteAccount: () => api.delete('/users/me'),
  
  // Predictions
  createPrediction: async (metrics) => normalizePrediction(await api.post('/users/me/predictions', metrics)),
  listPredictions: async () => normalizePredictions(await api.get('/users/me/predictions')),
  getPrediction: async (id) => normalizePrediction(await api.get(`/users/me/predictions/${id}`)),
  deletePrediction: (id) => api.delete(`/users/me/predictions/${id}`)
};

export default apiService;
