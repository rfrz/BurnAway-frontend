import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
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
    window.location.href = '/login';
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
  createPrediction: (metrics) => api.post('/users/me/predictions', metrics),
  listPredictions: () => api.get('/users/me/predictions'),
  getPrediction: (id) => api.get(`/users/me/predictions/${id}`),
  deletePrediction: (id) => api.delete(`/users/me/predictions/${id}`)
};

export default apiService;
