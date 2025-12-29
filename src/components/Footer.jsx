import React from 'react';
import { Link } from 'react-router-dom';
import penguinFull from '../assets/penguin_full.png';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-dark)', color: 'white', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <img
                            src={penguinFull}
                            alt="PenguinPrep"
                            style={{ height: '150px', width: 'auto', objectFit: 'contain', marginBottom: '1rem' }}
                        />
                        <p style={{ color: '#94a3b8', maxWidth: '300px' }}>
                            Empowering the next generation of learners through interactive assessment technology.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '4rem' }}>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Platform</h4>
                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ marginBottom: '0.5rem' }}><Link to="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link></li>
                                <li style={{ marginBottom: '0.5rem' }}><a href="#features" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a></li>
                                <li style={{ marginBottom: '0.5rem' }}><Link to="/student/login" style={{ color: '#94a3b8', textDecoration: 'none' }}>Login</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Legal</h4>
                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ marginBottom: '0.5rem' }}><Link to="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link></li>
                                <li style={{ marginBottom: '0.5rem' }}><Link to="/terms-of-service" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</Link></li>
                                <li style={{ marginBottom: '0.5rem' }}><Link to="/cookies-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookies Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #334155', textAlign: 'center', color: '#64748b' }}>
                    &copy; 2025 PenguinPrep. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
