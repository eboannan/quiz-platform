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
            navigate('/parent/dashboard');
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
            backgroundColor: '#f8fafc',
            padding: '1.5rem'
        }}>
            <div className="animate-fade-in" style={{
                backgroundColor: 'white',
                padding: 'clamp(1.5rem, 8vw, 3rem)',
                borderRadius: '32px',
                boxShadow: 'var(--shadow-lg)',
                width: '100%',
                maxWidth: '450px',
                textAlign: 'center',
                border: '1px solid #f1f5f9'
            }}>
                <div style={{
                    marginBottom: '1.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    backgroundColor: '#f1f5f9',
                    fontSize: '1.75rem'
                }}>
                    🔒
                </div>


                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Display Name"
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '16px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                fontSize: '1rem'
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
                            placeholder="Secret Password"
                            required
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '16px',
                                border: error ? '2px solid #ef4444' : '1px solid #e2e8f0',
                                fontSize: '1rem'
                            }}
                        />
                        {error && <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>{error}</p>}
                        {hintToShow && <p style={{ color: 'var(--color-primary)', marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: '700' }}>{hintToShow}</p>}
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
                                    borderRadius: '16px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    )}

                    {!isRegister && (
                        <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                            <button
                                type="button"
                                onClick={handleGetHint}
                                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Forgot password? Get hint
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', borderRadius: '16px' }}
                    >
                        {isLoading ? 'Wait a moment...' : (isRegister ? 'Create My Account' : 'Sign In')}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#64748b' }}>
                    {isRegister ? 'Already have an account?' : "New here?"}{' '}
                    <button
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError('');
                            setHintToShow('');
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: '700', cursor: 'pointer' }}
                    >
                        {isRegister ? 'Sign In' : 'Join as Teacher'}
                    </button>
                </p>

                <button
                    onClick={() => navigate('/')}
                    style={{
                        marginTop: '2rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text)',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        opacity: 0.6
                    }}
                >
                    ← Back to Start
                </button>
            </div>
        </div>
    );
};

export default Login;
