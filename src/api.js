import axios from 'axios';

// Base URL for backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the Token in all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    studentLogin: (accessCode) => api.post('/auth/student-login', { accessCode }),
    getHint: (email) => api.get(`/auth/hint/${email}`)
};

export const studentAPI = {
    getAll: (teacherId) => api.get(`/students?teacherId=${teacherId}`),
    getProfile: (id) => api.get(`/students/${id}`),
    create: (data) => api.post('/students', data),
    delete: (id) => api.delete(`/students/${id}`)
};

export const quizAPI = {
    getAll: (teacherId) => api.get(`/quizzes/teacher/${teacherId}`),
    getForStudent: (studentId) => api.get(`/quizzes/student/${studentId}`),
    create: (data) => api.post('/quizzes', data),
    assign: (quizId, studentId) => api.post(`/quizzes/${quizId}/assign`, { studentId }),
    delete: (id) => api.delete(`/quizzes/${id}`)
};

export const attemptAPI = {
    create: (data) => api.post('/attempts', data)
};

export default api;
