import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import studentImage from '../assets/student-hero-final-v2.png';

const Hero = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            const response = await authAPI.studentLogin({ username, password });
            localStorage.setItem('studentAuth', JSON.stringify(response.data));
            localStorage.removeItem('simulationMode');
            navigate('/student/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="container grid-cols-2" style={{
            alignItems: 'center',
            paddingTop: 'clamp(4rem, 10vh, 8rem)',
            paddingBottom: 'clamp(4rem, 10vh, 8rem)',
            minHeight: '80vh'
        }}>
            <div style={{ textAlign: 'center' }}>
                <img
                    src={studentImage}
                    alt="Student with PenguinPrep"
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        height: 'auto',
                        display: 'block',
                        margin: '0 auto',
                        mixBlendMode: 'multiply',
                        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)'
                    }}
                />
            </div>

            {/* Visual / Right Side */}
            <div className="animate-fade-in" style={{
                position: 'relative',
                animationDelay: '0.2s',
                marginTop: '1rem' // Added back for mobile stacking
            }}>
                <div style={{
                    backgroundColor: 'var(--color-bg)',
                    borderRadius: '24px',
                    padding: 'clamp(1.5rem, 5vw, 2.5rem)'
                }}>
                    {/* Login Form Card */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-dark)', marginBottom: '1.5rem' }}>Log in now!</h2>

                        {/* Form Fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Username</label>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>required</span>
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Your username"
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Password</label>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>required</span>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '1rem'
                                    }}
                                />
                                {error ? (
                                    <p style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 'bold' }}>{error}</p>
                                ) : (
                                    <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem' }}>Use the credentials from your teacher.</p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '700',
                                fontSize: '1rem',
                                marginTop: '2rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                opacity: isLoading ? 0.7 : 1
                            }}
                        >
                            {isLoading ? 'Logging in...' : 'Start Learning'}
                        </button>

                        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4' }}>
                            By logging in, you agree to the <span onClick={() => navigate('/terms-of-service')} style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>PenguinPrep Terms of Service</span> and <span onClick={() => navigate('/privacy-policy')} style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>Privacy Policy</span>.
                        </div>

                        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-dark)' }}>
                            Need a PenguinPrep account? Ask your <span
                                onClick={() => navigate('/parent/login')}
                                style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '700', cursor: 'pointer' }}
                            >Parent</span>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Hero;
