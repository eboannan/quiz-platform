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

    if (isLoading && !student) return <div style={{ textAlign: 'center', padding: '5rem', color: '#64748b' }}>Loading Dashboard...</div>;
    if (!student) return null;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {isSimulated && (
                <div style={{ backgroundColor: '#fff7ed', borderBottom: '1px solid #fed7aa', padding: '0.75rem', textAlign: 'center', color: '#c2410c', fontWeight: '700', fontSize: '0.85rem' }}>
                    👀 Preview Mode: Viewing as {student.firstName}. Results won't save.
                </div>
            )}

            <nav style={{ backgroundColor: 'white', padding: '1rem clamp(1rem, 5vw, 2rem)', boxShadow: 'var(--shadow-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Quiz<span style={{ color: 'var(--color-primary)' }}>Master</span></h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }} className="hidden-mobile">👋 Hi, {student.firstName}</span>
                    <button
                        onClick={handleLogout}
                        style={{ padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}
                    >
                        {isSimulated ? 'Exit' : 'Logout'}
                    </button>
                </div>
            </nav>

            <div className="container" style={{ padding: 'clamp(1.5rem, 5vw, 3rem) 1rem' }}>
                <h1 style={{ marginBottom: '2rem', fontSize: 'clamp(1.5rem, 6vw, 2.5rem)' }}>Your Learning Hub</h1>

                <div style={{
                    backgroundColor: 'white',
                    padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                    borderRadius: '24px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid #f1f5f9'
                }}>
                    {quizzes.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                            <h3 style={{ marginBottom: '0.5rem' }}>No tasks assigned!</h3>
                            <p style={{ color: 'var(--color-text)' }}>Enjoy your break, or check back later.</p>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'left' }}>
                            <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>My Assignments ({quizzes.length})</h3>
                            <div style={{ display: 'grid', gap: '1.25rem' }}>
                                {quizzes.map(q => {
                                    const attempts = (student.attempts || []).filter(a => a.quizId === q.id);
                                    attempts.sort((a, b) => new Date(b.date) - new Date(a.date));

                                    return (
                                        <div key={q.id} style={{
                                            padding: 'clamp(1.25rem, 4vw, 1.75rem)',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '20px',
                                            backgroundColor: '#fafafa',
                                            transition: 'transform 0.2s'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                                <div style={{ flex: '1 1 200px' }}>
                                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', fontWeight: '700' }}>{q.title}</h4>
                                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{q.questions?.length || 0} Questions</span>
                                                        {attempts.length > 0 && (
                                                            <span style={{ backgroundColor: '#e0e7ff', color: 'var(--color-primary)', padding: '0.2rem 0.6rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800' }}>
                                                                {attempts.length} Attempt{attempts.length !== 1 && 's'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '300px' }}>
                                                    <button
                                                        onClick={() => setExpandedQuizId(expandedQuizId === q.id ? null : q.id)}
                                                        className="btn btn-secondary"
                                                        style={{ padding: '0.6rem', fontSize: '0.85rem', flex: 1, borderRadius: '12px' }}
                                                    >
                                                        {expandedQuizId === q.id ? 'Hide' : 'History'}
                                                    </button>
                                                    <button
                                                        className="btn btn-primary"
                                                        style={{ padding: '0.6rem', fontSize: '0.85rem', flex: 1.5, borderRadius: '12px' }}
                                                        onClick={() => navigate(`/student/take-quiz/${q.id}`)}
                                                    >
                                                        Play Quiz
                                                    </button>
                                                </div>
                                            </div>

                                            {expandedQuizId === q.id && (
                                                <div className="animate-fade-in" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '2px dashed #e2e8f0' }}>
                                                    <h5 style={{ marginBottom: '1rem', color: '#475569', fontSize: '0.9rem', fontWeight: '700' }}>YOUR PAST SCORES</h5>
                                                    {attempts.length === 0 ? (
                                                        <p style={{ fontStyle: 'italic', color: '#94a3b8', fontSize: '0.9rem' }}>No history found.</p>
                                                    ) : (
                                                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                                                            {attempts.map((att, idx) => (
                                                                <div key={idx} style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    padding: '1rem',
                                                                    backgroundColor: 'white',
                                                                    borderRadius: '12px',
                                                                    fontSize: '0.9rem',
                                                                    border: '1px solid #f1f5f9'
                                                                }}>
                                                                    <span style={{ color: '#64748b', fontWeight: '500' }}>{new Date(att.date).toLocaleDateString()}</span>
                                                                    <span style={{ fontWeight: '800', color: (att.score / att.total) > 0.8 ? '#16a34a' : '#000' }}>
                                                                        {att.score} / {att.total}
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
            </div>
        </div>
    );
};

export default StudentDashboard;
