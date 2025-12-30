import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentImage from '../assets/student-hero-final-v2.png';

const Hero = () => {
    const navigate = useNavigate();
    const [loginRole, setLoginRole] = useState('student');

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
                        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
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
                    <div style={{
                        display: 'flex',
                        gap: '2.5rem',
                        marginBottom: '2rem'
                    }}>
                        <div
                            onClick={() => setLoginRole('student')}
                            style={{
                                color: 'var(--color-text)',
                                textDecoration: 'none',
                                fontSize: '1rem',
                                fontWeight: loginRole === 'student' ? '700' : '400',
                                cursor: 'pointer',
                                opacity: loginRole === 'student' ? 1 : 0.6,
                                transition: 'all 0.2s',
                                borderBottom: loginRole === 'student' ? '2px solid var(--color-dark)' : 'none',
                                paddingBottom: '0.25rem'
                            }}
                        >Student</div>
                        <div
                            onClick={() => setLoginRole('teacher')}
                            style={{
                                color: 'var(--color-text)',
                                textDecoration: 'none',
                                fontSize: '1rem',
                                fontWeight: loginRole === 'teacher' ? '700' : '400',
                                cursor: 'pointer',
                                opacity: loginRole === 'teacher' ? 1 : 0.6,
                                transition: 'all 0.2s',
                                borderBottom: loginRole === 'teacher' ? '2px solid var(--color-dark)' : 'none',
                                paddingBottom: '0.25rem'
                            }}
                        >Teacher</div>
                    </div>

                    {/* Login Form Card */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-dark)', marginBottom: '1.5rem' }}>Log in now!</h2>

                        {/* Form Fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {loginRole === 'student' ? (
                                <>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Username</label>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>required</span>
                                        </div>
                                        <input
                                            type="text"
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
                                            placeholder="••••••••••••"
                                            style={{
                                                width: '100%',
                                                padding: '0.85rem',
                                                borderRadius: '8px',
                                                border: '1px solid #e2e8f0',
                                                fontSize: '1rem'
                                            }}
                                        />
                                        <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem' }}>Use the credentials from your teacher.</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Email Address</label>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>required</span>
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="email@example.com"
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
                                            <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Secret Password</label>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>required</span>
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="••••••••••••"
                                            style={{
                                                width: '100%',
                                                padding: '0.85rem',
                                                borderRadius: '8px',
                                                border: '1px solid #e2e8f0',
                                                fontSize: '1rem'
                                            }}
                                        />
                                        <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '500' }}>Forgot password? Get hint</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => navigate(loginRole === 'student' ? '/student/login' : '/teacher/login')}
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
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}
                        >
                            {loginRole === 'student' ? 'Start Learning' : 'Sign In'}
                        </button>

                        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b', lineHeight: '1.4' }}>
                            By logging in, you agree to the <span onClick={() => navigate('/terms-of-service')} style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>PenguinPrep Terms of Service</span> and <span onClick={() => navigate('/privacy-policy')} style={{ color: 'var(--color-primary)', cursor: 'pointer' }}>Privacy Policy</span>.
                        </div>

                        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-dark)' }}>
                            Need a PenguinPrep account? <span
                                onClick={() => navigate(loginRole === 'student' ? '/student/login' : '/teacher/login')}
                                style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '700', cursor: 'pointer' }}
                            >Sign up today</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
