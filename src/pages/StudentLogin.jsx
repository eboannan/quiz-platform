import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';

const StudentLogin = () => {
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await authAPI.studentLogin(accessCode);
            // Save student session
            localStorage.setItem('studentAuth', JSON.stringify(response.data));
            localStorage.removeItem('simulationMode'); // Clear in case it was set
            navigate('/student/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid Access Code. Please ask your teacher.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: 'var(--shadow-lg)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <div style={{
                    marginBottom: '2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#e0e7ff',
                    color: 'var(--color-primary)',
                    fontSize: '2rem'
                }}>
                    🎓
                </div>

                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Student Login</h2>
                <p style={{ color: 'var(--color-text)', marginBottom: '2rem' }}>Enter the code your teacher gave you.</p>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <input
                            type="text"
                            value={accessCode}
                            onChange={(e) => {
                                setAccessCode(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter Access Code"
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: error ? '2px solid #ef4444' : '1px solid #e2e8f0',
                                fontSize: '1.1rem',
                                outline: 'none',
                                textAlign: 'center',
                                letterSpacing: '2px',
                                fontWeight: '600'
                            }}
                        />
                        {error && <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading ? 'Loading...' : 'Start Learning'}
                    </button>
                </form>

                <button
                    onClick={() => navigate('/')}
                    style={{
                        marginTop: '2rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text)',
                        textDecoration: 'underline',
                        fontSize: '0.9rem'
                    }}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default StudentLogin;
