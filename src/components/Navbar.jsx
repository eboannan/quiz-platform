import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import penguinFull from '../assets/penguin_full.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backgroundColor: 'var(--color-bg)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '160px'
            }}>
                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                    <img
                        src={penguinFull}
                        alt="PenguinPrep"
                        style={{ height: '140px', width: 'auto', objectFit: 'contain' }}
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden-mobile" style={{ gap: '2rem', alignItems: 'center' }}>

                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/teacher/login" style={{
                            color: 'var(--color-text)',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            fontWeight: '500'
                        }}>
                            Teacher
                        </Link>
                        <Link to="/student/login" style={{
                            color: 'var(--color-text)',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            fontWeight: '500'
                        }}>
                            Student
                        </Link>
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
                    backgroundColor: 'var(--color-bg)',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    gap: '0.5rem'
                }}>
                    <Link
                        to="/teacher/login"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            padding: '1rem',
                            color: 'var(--color-text)',
                            textDecoration: 'none',
                            fontWeight: '500',
                            borderBottom: '1px solid rgba(0,0,0,0.05)'
                        }}
                    >
                        Teacher
                    </Link>
                    <Link
                        to="/student/login"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            padding: '1rem',
                            color: 'var(--color-text)',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        Student
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
