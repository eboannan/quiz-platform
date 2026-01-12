import axios from 'axios';

// Base URL for backend. 
// We are making this extra robust to handle common deployment mistakes.
let rawURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Ensure the URL ends with /api (but not /api/)
let cleanURL = rawURL.trim();
if (!cleanURL.includes('/api')) {
    cleanURL = cleanURL.replace(/\/$/, '') + '/api';
}
if (!cleanURL.endsWith('/')) {
    cleanURL += '/';
}

const api = axios.create({
    baseURL: cleanURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log("API Base URL configured as:", cleanURL);

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

// Endpoints should NEVER start with a slash to properly append to baseURL
export const authAPI = {
    login: (credentials) => api.post('auth/login', credentials),
    register: (userData) => api.post('auth/register', userData),
    studentLogin: (credentials) => api.post('auth/student-login', credentials),
    getHint: (email) => api.get(`auth/hint/${email}`)
};

export const studentAPI = {
    getAll: (teacherId) => api.get(`students?teacherId=${teacherId}`),
    getProfile: (id) => api.get(`students/${id}`),
    create: (data) => api.post('students', data),
    delete: (id) => api.delete(`students/${id}`)
};

export const quizAPI = {
    getAll: (teacherId) => api.get(`quizzes/teacher/${teacherId}`),
    getForStudent: (studentId) => api.get(`quizzes/student/${studentId}`),
    create: (data) => api.post('quizzes', data),
    update: (id, data) => api.put(`quizzes/${id}`, data),
    assign: (quizId, studentId) => api.post(`quizzes/${quizId}/assign`, { studentId }),
    delete: (id) => api.delete(`quizzes/${id}`)
};

export const attemptAPI = {
    create: (data) => api.post('attempts', data),
    get: (id) => api.get(`attempts/${id}`)
};

export default api;
