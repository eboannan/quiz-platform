import React from 'react';
import { Link } from 'react-router-dom';
import penguinFull from '../assets/penguin_full.png';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', padding: '2rem 0' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <ul style={{
                        listStyle: 'none',
                        display: 'flex',
                        gap: '2rem',
                        padding: 0,
                        margin: 0,
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <li><Link to="/privacy-policy" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Terms of Service</Link></li>
                        <li><Link to="/cookies-policy" style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>Cookies Policy</Link></li>
                    </ul>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        &copy; 2025 PenguinPrep. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
