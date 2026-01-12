import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, userType }) => {
    const { isAuthenticated } = useAuth();

    if (userType === 'student') {
        const studentAuth = localStorage.getItem('studentAuth');
        if (!studentAuth) {
            return <Navigate to="/student/login" replace />;
        }
        return children;
    }

    if (!isAuthenticated) {
        return <Navigate to="/parent/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
