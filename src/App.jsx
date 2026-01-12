import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import CreateQuiz from './pages/CreateQuiz';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import TakeQuiz from './pages/TakeQuiz';
import QuizResult from './pages/QuizResult';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiesPolicy from './pages/CookiesPolicy';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/parent/login" element={<Login />} />
          <Route
            path="/parent/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/create-quiz"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          <Route path="/parent/edit-quiz/:id" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
          <Route path="/parent/quiz-result/:attemptId" element={<ProtectedRoute><QuizResult /></ProtectedRoute>} />
          {/* Student Routes */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/take-quiz/:id" element={<ProtectedRoute userType="student"><TakeQuiz /></ProtectedRoute>} />
          <Route path="/student/quiz-result/:attemptId" element={<ProtectedRoute userType="student"><QuizResult /></ProtectedRoute>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
