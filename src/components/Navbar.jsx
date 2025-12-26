import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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

                {/* Links */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {['Features'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} style={{
                            color: 'var(--color-text)',
                            textDecoration: 'none',
                            fontWeight: '500',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '0.95rem'
                        }}>
                            {item}
                        </a>
                    ))}
                </div>

                {/* Login Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/teacher/login')}>
                        Teacher Login
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/student/login')}>
                        Student Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
