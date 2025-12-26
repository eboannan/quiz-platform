import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { studentAPI, quizAPI } from '../api';

const Dashboard = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    // Top-Level State
    const [activeTab, setActiveTab] = useState('Overview');
    const [quizzes, setQuizzes] = useState([]);
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            fetchData();
        }
    }, [user, activeTab]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [studentsRes, quizzesRes] = await Promise.all([
                studentAPI.getAll(user.id),
                quizAPI.getAll(user.id)
            ]);
            setStudents(studentsRes.data);
            setQuizzes(quizzesRes.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const startSimulation = (student) => {
        localStorage.setItem('studentAuth', JSON.stringify(student));
        localStorage.setItem('simulationMode', 'true');
        navigate('/student/dashboard');
    };

    const deleteQuiz = async (id) => {
        if (!window.confirm('Delete this quiz?')) return;
        try {
            await quizAPI.delete(id);
            setQuizzes(quizzes.filter(q => q.id !== id));
        } catch (error) {
            alert('Failed to delete quiz');
        }
    };

    const addStudent = async (e) => {
        e.preventDefault();
        if (!newStudent.firstName || !newStudent.accessCode) return;

        try {
            const response = await studentAPI.create({
                ...newStudent,
                teacherId: user.id
            });
            setStudents([...students, response.data]);
            setNewStudent({ firstName: '', lastName: '', age: '', grade: '', accessCode: '' });
            setShowStudentForm(false);
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to add student');
        }
    };

    const deleteStudent = async (id) => {
        if (!window.confirm('Remove this student?')) return;
        try {
            await studentAPI.delete(id);
            setStudents(students.filter(s => s.id !== id));
        } catch (error) {
            alert('Failed to delete student');
        }
    };

    const handleAssign = async (quizId) => {
        const select = document.getElementById(`assign-${quizId}`);
        const studentId = select.value;
        if (!studentId) return alert('Please select a student');

        try {
            await quizAPI.assign(quizId, studentId);
            fetchData(); // Refresh to show assignment counts
            alert('Quiz Assigned!');
        } catch (error) {
            alert('Failed to assign quiz');
        }
    };

    // UI State
    const [showStudentForm, setShowStudentForm] = useState(false);
    const [showSimulationSelect, setShowSimulationSelect] = useState(false);
    const [selectedStudentForProgress, setSelectedStudentForProgress] = useState(null);
    const [newStudent, setNewStudent] = useState({
        firstName: '', lastName: '', age: '', grade: '', accessCode: ''
    });

    // Render Logic Functions
    const renderOverview = () => (
        <>
            <h1 style={{ marginBottom: '2rem' }}>Welcome Back, {user?.name || 'Teacher'}</h1>
            <div>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/teacher/create-quiz')}
                        >
                            Create New Quiz
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setActiveTab('Students');
                                setShowStudentForm(true);
                            }}
                        >
                            Add Student
                        </button>
                        <button
                            className="btn btn-accent"
                            style={{ border: '1px solid #cbd5e1' }}
                            onClick={() => setShowSimulationSelect(true)}
                        >
                            Student View
                        </button>
                    </div>
                </div>
            </div>

            {showSimulationSelect && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 100
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '2rem', borderRadius: '16px',
                        maxWidth: '500px', width: '90%', maxHeight: '80vh', overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Select Student to View As</h3>
                            <button
                                onClick={() => setShowSimulationSelect(false)}
                                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                            >
                                ×
                            </button>
                        </div>
                        {students.length === 0 ? (
                            <p>No students available.</p>
                        ) : (
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                {students.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => startSimulation(s)}
                                        style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            backgroundColor: '#f8fafc',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <span style={{ fontWeight: '600' }}>{s.firstName} {s.lastName}</span>
                                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{s.grade}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );

    const renderQuizzes = () => (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ margin: 0 }}>My Quizzes</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/teacher/create-quiz')}
                >
                    + New Quiz
                </button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {quizzes.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--color-text)' }}>
                        No quizzes found. Create your first one!
                    </div>
                ) : (
                    quizzes.map(quiz => (
                        <div key={quiz.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{quiz.title}</h3>
                            <p style={{ color: 'var(--color-text)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                {quiz.questions.length} Question{quiz.questions.length !== 1 && 's'} • {new Date(quiz.createdAt).toLocaleDateString()}
                            </p>

                            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Assign to:</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select
                                        id={`assign-${quiz.id}`}
                                        style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                    >
                                        <option value="">Select Student...</option>
                                        {students.map(s => (
                                            <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => handleAssign(quiz.id)}
                                        className="btn btn-primary"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                    >
                                        Assign
                                    </button>
                                </div>
                                {quiz.assignedTo && quiz.assignedTo.length > 0 && (
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
                                        Assigned to: {quiz.assignedTo.length} student(s)
                                    </p>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => navigate(`/teacher/edit-quiz/${quiz.id}`)}
                                    className="btn btn-secondary"
                                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', flex: 1 }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteQuiz(quiz.id)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.9rem',
                                        backgroundColor: '#fee2e2',
                                        color: '#ef4444',
                                        border: 'none',
                                        borderRadius: '999px',
                                        cursor: 'pointer',
                                        fontWeight: '600'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );

    const renderStudents = () => (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ margin: 0 }}>My Students</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowStudentForm(true)}
                >
                    + Add Student
                </button>
            </div>

            {selectedStudentForProgress && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 100
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '2rem', borderRadius: '16px',
                        maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Progress Reports: {selectedStudentForProgress.firstName}</h3>
                            <button
                                onClick={() => setSelectedStudentForProgress(null)}
                                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                            >
                                ×
                            </button>
                        </div>

                        {(() => {
                            const studentAttempts = selectedStudentForProgress.attempts || [];

                            if (studentAttempts.length === 0) {
                                return <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>No quizzes attempted yet.</p>;
                            }

                            // Group by Quiz
                            const attemptsByQuiz = {};
                            studentAttempts.forEach(a => {
                                // Find quiz title from local quizzes list
                                const quizTitle = quizzes.find(q => q.id === a.quizId)?.title || "Unknown Quiz";
                                if (!attemptsByQuiz[a.quizId]) {
                                    attemptsByQuiz[a.quizId] = { title: quizTitle, attempts: [] };
                                }
                                attemptsByQuiz[a.quizId].attempts.push(a);
                            });

                            return (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {Object.values(attemptsByQuiz).map((group, idx) => (
                                        <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                                            <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>{group.title}</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {group.attempts.sort((a, b) => new Date(b.date) - new Date(a.date)).map((att, i) => (
                                                    <div key={i} style={{
                                                        display: 'flex', justifyContent: 'space-between',
                                                        backgroundColor: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.9rem'
                                                    }}>
                                                        <span style={{ color: '#64748b' }}>Attempt {group.attempts.length - i} ({new Date(att.date).toLocaleDateString()})</span>
                                                        <span style={{ fontWeight: '600' }}>Score: {att.score}/{att.total}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}

            {showStudentForm && (
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ marginBottom: '1rem' }}>New Student Profile</h3>
                    <form onSubmit={addStudent} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input
                            placeholder="First Name"
                            value={newStudent.firstName}
                            onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })}
                            required
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                        <input
                            placeholder="Last Name"
                            value={newStudent.lastName}
                            onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                        <input
                            placeholder="Age"
                            type="number"
                            value={newStudent.age}
                            onChange={e => setNewStudent({ ...newStudent, age: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                        <input
                            placeholder="Grade Level"
                            value={newStudent.grade}
                            onChange={e => setNewStudent({ ...newStudent, grade: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                        />
                        <input
                            placeholder="Access Code (Login Password)"
                            value={newStudent.accessCode}
                            onChange={e => setNewStudent({ ...newStudent, accessCode: e.target.value })}
                            required
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', gridColumn: 'span 2' }}
                        />
                        <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                            <button type="button" onClick={() => setShowStudentForm(false)} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer' }}>Cancel</button>
                            <button className="btn btn-primary" type="submit" style={{ padding: '0.75rem 1.5rem' }}>Save Student</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Grade</th>
                            <th style={{ padding: '1rem' }}>Access Code</th>
                            <th style={{ padding: '1rem' }}>Progress</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No students yet.</td></tr>
                        ) : (
                            students.map(s => (
                                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '600' }}>{s.firstName} {s.lastName}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Age: {s.age}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{s.grade}</td>
                                    <td style={{ padding: '1rem' }}><code style={{ background: '#f1f5f9', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{s.accessCode}</code></td>
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => setSelectedStudentForProgress(s)}
                                            style={{ color: 'var(--color-primary)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600' }}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button onClick={() => deleteStudent(s.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>Remove</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );

    return (
        <div style={{ minHeight: '100vh', display: 'flex' }}>
            <aside style={{ width: '250px', backgroundColor: 'var(--color-dark)', color: 'white', padding: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '3rem' }}>Teacher<span style={{ color: '#94a3b8' }}>Panel</span></h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {['Overview', 'Quizzes', 'Students', 'Settings'].map(item => (
                        <div
                            key={item}
                            onClick={() => setActiveTab(item)}
                            style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                backgroundColor: activeTab === item ? 'rgba(255,255,255,0.1)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </nav>
                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: 'auto',
                        background: 'transparent',
                        border: '1px solid #334155',
                        color: '#94a3b8',
                        padding: '0.75rem',
                        width: '100%',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </aside>

            <main style={{ flex: 1, padding: '3rem', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Dashboard...</div>
                ) : (
                    <>
                        {activeTab === 'Overview' && renderOverview()}
                        {activeTab === 'Quizzes' && renderQuizzes()}
                        {activeTab === 'Students' && renderStudents()}
                        {activeTab === 'Settings' && <h1>Settings - Coming Soon</h1>}
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
