import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentImage from '../assets/student-image-dark-skin.png';

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
            <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                <img
                    src={studentImage}
                    alt="Student with PenguinPrep"
                    style={{
                        width: '100%',
                        maxWidth: '450px',
                        height: 'auto',
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        display: 'block',
                        margin: '0 auto 2rem'
                    }}
                />
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-dark)' }}>Did you know?</h3>
                    <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '1rem' }}>
                        Regardless of where you start, mastering even just one lesson on PenguinPrep builds the confidence you need to succeed.
                    </p>
                </div>
            </div>

            {/* Visual / Right Side */}
            <div className="animate-fade-in" style={{
                position: 'relative',
                animationDelay: '0.2s',
                marginTop: '1rem' // Added back for mobile stacking
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #000000 0%, #94a3b8 100%)',
                    filter: 'blur(100px)',
                    opacity: 0.2,
                    zIndex: -1,
                    borderRadius: '50%'
                }}></div>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    boxShadow: 'var(--shadow-lg)',
                    padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    {/* Role Switcher */}
                    <div style={{
                        display: 'flex',
                        backgroundColor: '#f1f5f9',
                        padding: '4px',
                        borderRadius: '12px',
                        marginBottom: '1.5rem'
                    }}>
                        <button
                            onClick={() => setLoginRole('student')}
                            style={{
                                flex: 1,
                                padding: '0.6rem',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: loginRole === 'student' ? 'white' : 'transparent',
                                boxShadow: loginRole === 'student' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                fontWeight: '600',
                                color: loginRole === 'student' ? 'var(--color-primary)' : '#64748b',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >Student Login</button>
                        <button
                            onClick={() => setLoginRole('teacher')}
                            style={{
                                flex: 1,
                                padding: '0.6rem',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: loginRole === 'teacher' ? 'white' : 'transparent',
                                boxShadow: loginRole === 'teacher' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                fontWeight: '600',
                                color: loginRole === 'teacher' ? 'var(--color-primary)' : '#64748b',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >Teacher Login</button>
                    </div>

                    {/* Login Form Card */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-dark)', marginBottom: '1.5rem' }}>Log in now!</h2>

                        {/* Form Fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {loginRole === 'student' ? (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Access Code</label>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>required</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Access Code"
                                        style={{
                                            width: '100%',
                                            padding: '0.85rem',
                                            borderRadius: '8px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '1rem',
                                            textAlign: 'center',
                                            letterSpacing: '2px',
                                            fontWeight: '600'
                                        }}
                                    />
                                    <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem' }}>Enter the code your teacher gave you.</p>
                                </div>
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
