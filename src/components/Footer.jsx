import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-dark)', color: 'white', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                            Quiz<span style={{ color: 'var(--color-secondary)' }}>Master</span>
                        </span>
                        <p style={{ marginTop: '1rem', color: '#94a3b8', maxWidth: '300px' }}>
                            Empowering the next generation of learners through interactive assessment technology.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '4rem' }}>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Platform</h4>
                            <ul style={{ listStyle: 'none' }}>
                                {['Home', 'Features', 'Login'].map(i => (
                                    <li key={i} style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>{i}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Legal</h4>
                            <ul style={{ listStyle: 'none' }}>
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(i => (
                                    <li key={i} style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>{i}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #334155', textAlign: 'center', color: '#64748b' }}>
                    &copy; 2025 QuizMaster App. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
