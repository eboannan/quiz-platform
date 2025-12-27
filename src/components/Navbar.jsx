import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '80px'
            }}>
                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                >
                    <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>Q</div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                        Quiz<span style={{ color: 'var(--color-primary)' }}>Master</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden-mobile" style={{ gap: '2rem', alignItems: 'center' }}>
                    <a href="#features" style={{
                        color: 'var(--color-text)',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '0.95rem'
                    }}>Features</a>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-secondary" onClick={() => navigate('/teacher/login')}>
                            Teacher Login
                        </button>
                        <button className="btn btn-primary" onClick={() => navigate('/student/login')}>
                            Student Login
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="show-mobile"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        background: 'none',
                        fontSize: '1.5rem',
                        padding: '0.5rem'
                    }}
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="show-mobile" style={{
                    flexDirection: 'column',
                    padding: '1rem',
                    backgroundColor: 'white',
                    borderBottom: '1px solid #e2e8f0',
                    gap: '1rem'
                }}>
                    <a
                        href="#features"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            padding: '1rem',
                            color: 'var(--color-text)',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >Features</a>
                    <button
                        className="btn btn-secondary"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => { navigate('/teacher/login'); setIsMenuOpen(false); }}
                    >
                        Teacher Login
                    </button>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => { navigate('/student/login'); setIsMenuOpen(false); }}
                    >
                        Student Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
