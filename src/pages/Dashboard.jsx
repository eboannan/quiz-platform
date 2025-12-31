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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        if (!newStudent.firstName || !newStudent.username || !newStudent.password) return;

        try {
            const response = await studentAPI.create({
                ...newStudent,
                teacherId: user.id
            });
            setStudents([...students, response.data]);
            setNewStudent({ firstName: '', lastName: '', username: '', password: '', age: '', grade: '', accessCode: '' });
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
        firstName: '', lastName: '', username: '', password: '', age: '', grade: '', accessCode: ''
    });

    // Sidebar Content Helper
    const SidebarContent = () => (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '3rem', fontSize: '1.5rem' }}>
                Parent<span style={{ color: '#94a3b8' }}>Panel</span>
            </h2>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['Overview', 'Quizzes', 'Students', 'Settings'].map(item => (
                    <div
                        key={item}
                        onClick={() => {
                            setActiveTab(item);
                            setIsSidebarOpen(false);
                        }}
                        style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            backgroundColor: activeTab === item ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: activeTab === item ? 'white' : '#94a3b8',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: activeTab === item ? '600' : '500'
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
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '500'
                }}
            >
                Logout
            </button>
        </div>
    );

    // Tab renders...
    const renderOverview = () => (
        {/* Simulation Select Modal remains similar but with responsive width */ }
            {
        showSimulationSelect && (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0 }}>Select Student</h3>
                        <button onClick={() => setShowSimulationSelect(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                    </div>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {students.map(s => (
                            <button key={s.id} onClick={() => startSimulation(s)} style={{ padding: '1rem', textAlign: 'left', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#f8fafc', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '600' }}>{s.firstName} {s.lastName}</span>
                                <span style={{ color: '#64748b', fontSize: '0.8rem', backgroundColor: '#e2e8f0', padding: '0.2rem 0.6rem', borderRadius: '8px' }}>{s.grade}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
        </div >
    );

const renderQuizzes = () => (
    <div className="animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.75rem' }}>My Quizzes</h1>
            <button className="btn btn-primary" onClick={() => navigate('/teacher/create-quiz')}>+ New Quiz</button>
        </div>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 100%, 350px), 1fr))' }}>
            {quizzes.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 2rem', color: '#94a3b8', backgroundColor: 'white', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>No quizzes found.</div>
            ) : (
                quizzes.map(quiz => (
                    <div key={quiz.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{quiz.title}</h3>
                        <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{quiz.questions.length} Questions • {new Date(quiz.createdAt).toLocaleDateString()}</p>
                        <div style={{ marginTop: 'auto', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '16px', marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.5rem', color: '#475569' }}>Assign Quiz:</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <select id={`assign-${quiz.id}`} style={{ flex: 1, padding: '0.6rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}>
                                    <option value="">Select Student...</option>
                                    {students.map(s => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}
                                </select>
                                <button onClick={() => handleAssign(quiz.id)} style={{ padding: '0.6rem 1rem', borderRadius: '10px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 'bold', fontSize: '0.85rem' }}>Assign</button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => navigate(`/teacher/edit-quiz/${quiz.id}`)} className="btn btn-secondary" style={{ padding: '0.6rem', fontSize: '0.85rem', flex: 1 }}>Edit</button>
                            <button onClick={() => deleteQuiz(quiz.id)} style={{ padding: '0.6rem', fontSize: '0.85rem', flex: 1, backgroundColor: '#fee2e2', color: '#ef4444', borderRadius: '999px', fontWeight: '600' }}>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);

const renderStudents = () => (
    <div className="animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.75rem' }}>My Students</h1>
            <button className="btn btn-primary" onClick={() => setShowStudentForm(true)}>+ Add Student</button>
        </div>
        {/* Student Form & Table adjusted for responsiveness */}
        {showStudentForm && (
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '24px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>New Student</h3>
                <form onSubmit={addStudent} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <input placeholder="First Name" value={newStudent.firstName} onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })} required style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                    <input placeholder="Last Name" value={newStudent.lastName} onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                    <input placeholder="Username (REQUIRED)" value={newStudent.username} onChange={e => setNewStudent({ ...newStudent, username: e.target.value })} required style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                    <input placeholder="Password (REQUIRED)" type="password" value={newStudent.password} onChange={e => setNewStudent({ ...newStudent, password: e.target.value })} required style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                    <input placeholder="Age" type="number" value={newStudent.age} onChange={e => setNewStudent({ ...newStudent, age: e.target.value })} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                    <input placeholder="Grade Level" value={newStudent.grade} onChange={e => setNewStudent({ ...newStudent, grade: e.target.value })} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                    <input placeholder="Access Code (Optional)" value={newStudent.accessCode} onChange={e => setNewStudent({ ...newStudent, accessCode: e.target.value })} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', gridColumn: '1 / -1' }} />
                    <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <button type="button" onClick={() => setShowStudentForm(false)} style={{ background: 'none', fontWeight: '600' }}>Cancel</button>
                        <button className="btn btn-primary" type="submit">Save Profile</button>
                    </div>
                </form>
            </div>
        )}
        {/* Responsive Table Wrapper */}
        <div style={{ width: '100%', overflowX: 'auto', backgroundColor: 'white', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid #f1f5f9' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <tr>
                        <th style={{ padding: '1.25rem', textAlign: 'left' }}>Student</th>
                        <th style={{ padding: '1.25rem', textAlign: 'left' }}>Grade</th>
                        <th style={{ padding: '1.25rem', textAlign: 'left' }}>Username</th>
                        <th style={{ padding: '1.25rem', textAlign: 'center' }}>Progress</th>
                        <th style={{ padding: '1.25rem', textAlign: 'right' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 ? (
                        <tr><td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>No students recorded.</td></tr>
                    ) : (
                        students.map(s => (
                            <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1.25rem' }}>
                                    <div style={{ fontWeight: '600' }}>{s.firstName} {s.lastName}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Age: {s.age}</div>
                                </td>
                                <td style={{ padding: '1.25rem' }}>{s.grade}</td>
                                <td style={{ padding: '1.25rem' }}><code style={{ backgroundColor: '#f1f5f9', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.85rem' }}>{s.username}</code></td>
                                <td style={{ padding: '1.25rem', textAlign: 'center' }}>
                                    <button onClick={() => setSelectedStudentForProgress(s)} style={{ color: 'var(--color-primary)', fontWeight: '700', textDecoration: 'underline', background: 'none' }}>Report</button>
                                </td>
                                <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                                    <button onClick={() => deleteStudent(s.id)} style={{ color: '#ef4444', background: 'none', fontWeight: '600' }}>Remove</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        {/* Report Modal adjustment */}
        {selectedStudentForProgress && (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ margin: 0 }}>Progress: {selectedStudentForProgress.firstName}</h3>
                        <button onClick={() => setSelectedStudentForProgress(null)} style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer' }}>×</button>
                    </div>
                    {selectedStudentForProgress.attempts?.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No data yet.</p>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {selectedStudentForProgress.attempts.map((att, i) => (
                                <div key={i} style={{ padding: '1.25rem', backgroundColor: '#f8fafc', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                                    <div>
                                        <div style={{ fontWeight: '700' }}>{quizzes.find(q => q.id === att.quizId)?.title || 'Quiz'}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{new Date(att.date).toLocaleDateString()}</div>
                                    </div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: att.score / att.total > 0.7 ? '#16a34a' : '#000' }}>{att.score}/{att.total}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
);

return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Mobile Header */}
        <header className="show-mobile" style={{
            height: '70px',
            backgroundColor: 'var(--color-dark)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 40
        }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{activeTab}</h2>
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                style={{ background: 'none', color: 'white', fontSize: '1.5rem' }}
            >
                ☰
            </button>
        </header>

        <div style={{ display: 'flex', flex: 1 }}>
            {/* Sidebar - Desktop always shows, Mobile is absolute drawer */}
            <aside style={{
                width: '280px',
                backgroundColor: 'var(--color-dark)',
                color: 'white',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                inset: 0,
                right: 'auto',
                zIndex: 50,
                transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease',
                // On desktop, we don't want the transform/absolute behavior
            }} className="sidebar-desktop">
                <style>{`
                        @media (min-width: 1024px) {
                            .sidebar-desktop {
                                position: sticky !important;
                                transform: none !important;
                            }
                        }
                    `}</style>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: '1.5rem' }}>
                        Teacher<span style={{ color: '#94a3b8' }}>Panel</span>
                    </h2>
                    <button className="show-mobile" onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', color: 'white', fontSize: '1.5rem' }}>×</button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {['Overview', 'Quizzes', 'Students', 'Settings'].map(item => (
                        <div
                            key={item}
                            onClick={() => {
                                setActiveTab(item);
                                setIsSidebarOpen(false);
                            }}
                            style={{
                                padding: '0.85rem 1.25rem',
                                borderRadius: '16px',
                                backgroundColor: activeTab === item ? 'rgba(255,255,255,0.1)' : 'transparent',
                                color: activeTab === item ? 'white' : '#94a3b8',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: activeTab === item ? '700' : '500',
                                fontSize: '1rem'
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
                        padding: '1rem',
                        width: '100%',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: 'clamp(1.5rem, 5vw, 3rem)',
                backgroundColor: '#f8fafc',
                minHeight: '100vh',
                width: '100%'
            }}>
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: '#64748b' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⌛</div>
                        Loading Dashboard...
                    </div>
                ) : (
                    <>
                        {activeTab === 'Overview' && renderOverview()}
                        {activeTab === 'Quizzes' && renderQuizzes()}
                        {activeTab === 'Students' && renderStudents()}
                        {activeTab === 'Settings' && <div className="animate-fade-in"><h1>Settings</h1><p>Update your teacher profile and security settings.</p></div>}
                    </>
                )}
            </main>
        </div>

        {/* Backdrop for mobile sidebar */}
        {isSidebarOpen && (
            <div
                onClick={() => setIsSidebarOpen(false)}
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 45
                }}
                className="show-mobile"
            />
        )}
    </div>
);
};

export default Dashboard;
