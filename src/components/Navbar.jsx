import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
                height: '100px'
            }}>
                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                    <img
                        src={penguinFull}
                        alt="PenguinPrep"
                        style={{ height: '70px', width: 'auto', objectFit: 'contain' }}
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden-mobile" style={{ gap: '2rem', alignItems: 'center' }}>

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
