import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAPI } from '../api';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [expandedQuizId, setExpandedQuizId] = useState(null);
    const [isSimulated, setIsSimulated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('studentAuth');
        const simulated = localStorage.getItem('simulationMode');

        if (simulated) setIsSimulated(true);

        if (!stored) {
            navigate('/student/login');
        } else {
            const initialStudent = JSON.parse(stored);
            fetchStudentProfile(initialStudent.id);
        }
    }, [navigate]);

    const fetchStudentProfile = async (id) => {
        setIsLoading(true);
        try {
            const response = await studentAPI.getProfile(id);
            setStudent(response.data);

            // Extract quizzes from assignments
            const assignedQuizzes = response.data.assignments.map(a => a.quiz);
            setQuizzes(assignedQuizzes);
        } catch (error) {
            console.error('Error fetching student profile:', error);
            // Fallback to stored data if offline/error
            const stored = localStorage.getItem('studentAuth');
            if (stored) setStudent(JSON.parse(stored));
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('studentAuth');
        localStorage.removeItem('simulationMode');

        if (isSimulated) {
            navigate('/teacher/dashboard');
        } else {
            navigate('/');
        }
    };

    if (isLoading && !student) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Dashboard...</div>;
    if (!student) return null;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {isSimulated && (
                <div style={{ backgroundColor: '#fff7ed', borderBottom: '1px solid #fed7aa', padding: '0.5rem', textAlign: 'center', color: '#c2410c', fontWeight: '600', fontSize: '0.9rem' }}>
                    👀 You are viewing this page as {student.firstName}. Attempts in this mode will NOT be saved.
                </div>
            )}
            <nav style={{ backgroundColor: 'white', padding: '1rem 2rem', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Quiz<span style={{ color: 'var(--color-primary)' }}>Master</span></h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: '600' }}>👋 Hi, {student.firstName}</span>
                    <button
                        onClick={handleLogout}
                        style={{ border: 'none', background: 'none', color: isSimulated ? 'var(--color-primary)' : '#64748b', cursor: 'pointer', fontWeight: isSimulated ? '700' : '400' }}
                    >
                        {isSimulated ? 'Exit Student View' : 'Logout'}
                    </button>
                </div>
            </nav>

            <div className="container" style={{ padding: '3rem 1.5rem' }}>
                <h1 style={{ marginBottom: '2rem' }}>Your Dashboard</h1>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>Refreshing data...</div>
                ) : (
                    <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '16px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                        {quizzes.length === 0 ? (
                            <>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                                <h3>You're all set!</h3>
                                <p style={{ color: 'var(--color-text)' }}>No quizzes assigned yet. Check back later!</p>
                            </>
                        ) : (
                            <div style={{ textAlign: 'left' }}>
                                <h3 style={{ marginBottom: '1.5rem' }}>Assigned Quizzes ({quizzes.length})</h3>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {quizzes.map(q => {
                                        const attempts = (student.attempts || []).filter(a => a.quizId === q.id);
                                        attempts.sort((a, b) => new Date(b.date) - new Date(a.date));

                                        return (
                                            <div key={q.id} style={{
                                                backgroundColor: 'white',
                                                padding: '1.5rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '12px',
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{q.title}</h4>
                                                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                                            {q.questions?.length || 0} questions
                                                            {attempts.length > 0 && (
                                                                <>
                                                                    {' • '}
                                                                    <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>
                                                                        {attempts.length} Attempt{attempts.length !== 1 && 's'}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => setExpandedQuizId(expandedQuizId === q.id ? null : q.id)}
                                                            className="btn btn-secondary"
                                                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                                        >
                                                            {expandedQuizId === q.id ? 'Hide Details' : 'Details'}
                                                        </button>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => navigate(`/student/take-quiz/${q.id}`)}
                                                        >
                                                            Start Quiz
                                                        </button>
                                                    </div>
                                                </div>

                                                {expandedQuizId === q.id && (
                                                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                                                        <h5 style={{ marginBottom: '1rem', color: '#475569' }}>Attempt History</h5>
                                                        {attempts.length === 0 ? (
                                                            <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>No attempts yet.</p>
                                                        ) : (
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                                {attempts.map((attempt, idx) => (
                                                                    <div key={idx} style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        padding: '0.75rem',
                                                                        backgroundColor: '#f8fafc',
                                                                        borderRadius: '8px',
                                                                        fontSize: '0.95rem'
                                                                    }}>
                                                                        <span style={{ color: '#64748b' }}>
                                                                            {new Date(attempt.date).toLocaleString()}
                                                                        </span>
                                                                        <span style={{ fontWeight: '600', color: attempt.score === attempt.total ? '#16a34a' : 'var(--color-text)' }}>
                                                                            Score: {attempt.score} / {attempt.total}  ({Math.round((attempt.score / attempt.total) * 100)}%)
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
