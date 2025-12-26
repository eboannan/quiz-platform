import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordHint, setPasswordHint] = useState('');
    const [hintToShow, setHintToShow] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setHintToShow('');
        setIsLoading(true);

        let result;
        if (isRegister) {
            result = await register(email, password, name, passwordHint);
        } else {
            result = await login(email, password);
        }

        if (result.success) {
            navigate('/teacher/dashboard');
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    };

    const handleGetHint = async () => {
        if (!email) {
            setError('Please enter your email first to see the hint.');
            return;
        }
        setError('');
        setHintToShow('Fetching hint...');
        try {
            const response = await authAPI.getHint(email);
            setHintToShow(`Hint: ${response.data.hint}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Could not retrieve hint.');
            setHintToShow('');
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
                    backgroundColor: '#f3f4f6',
                    fontSize: '2rem'
                }}>
                    🔒
                </div>

                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {isRegister ? 'Create Account' : 'Teacher Access'}
                </h2>
                <p style={{ color: 'var(--color-text)', marginBottom: '2rem' }}>
                    {isRegister ? 'Sign up to start managing your classes.' : 'Enter your credentials to continue.'}
                </p>

                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <div style={{ marginBottom: '1.25rem' }}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: '1.25rem' }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Password"
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: error ? '2px solid #ef4444' : '1px solid #e2e8f0',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        {error && <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</p>}
                        {hintToShow && <p style={{ color: 'var(--color-primary)', marginTop: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>{hintToShow}</p>}
                    </div>

                    {isRegister && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <input
                                type="text"
                                value={passwordHint}
                                onChange={(e) => setPasswordHint(e.target.value)}
                                placeholder="Password Hint (optional)"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    )}

                    {!isRegister && (
                        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                            <button
                                type="button"
                                onClick={handleGetHint}
                                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Forgot password? Show hint
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading ? 'Processing...' : (isRegister ? 'Sign Up' : 'Enter Dashboard')}
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError('');
                            setHintToShow('');
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {isRegister ? 'Log In' : 'Sign Up'}
                    </button>
                </p>

                <button
                    onClick={() => navigate('/')}
                    style={{
                        marginTop: '1.5rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text)',
                        textDecoration: 'underline',
                        fontSize: '0.85rem'
                    }}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Login;
