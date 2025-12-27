import React from 'react';

const Hero = () => {
    return (
        <section className="container grid-cols-2" style={{
            alignItems: 'center',
            paddingTop: 'clamp(4rem, 10vh, 8rem)',
            paddingBottom: 'clamp(4rem, 10vh, 8rem)',
            minHeight: '80vh'
        }}>
            <div className="animate-fade-in">
                <h1 style={{
                    fontWeight: '800',
                    marginBottom: '1.5rem',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em'
                }}>
                    Master Your <span className="text-gradient">Schoolwork</span> with Quizzes
                </h1>
                <div style={{
                    fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
                    color: 'var(--color-text)',
                    marginBottom: '2.5rem',
                    lineHeight: '1.6',
                    maxWidth: '600px'
                }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {[
                            'Review lessons',
                            'Close knowledge gaps',
                            'Build confidence through personalized practice',
                            'Track your progress',
                            'Strengthen weak areas',
                            'Stay ready for tests without the stress'
                        ].map((point, idx) => (
                            <li key={idx} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ marginTop: '1rem', color: 'var(--color-text)' }}>
                    <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>Ready to master what you’ve learned?</p>
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
                    border: '1px solid rgba(0,0,0,0.05)',
                    transform: 'rotate(-1deg)'
                }}>
                    {/* Mock UI Card */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                        <span style={{ fontWeight: '600', color: 'var(--color-text)' }}>Physics 101</span>
                        <span style={{ backgroundColor: '#f3f4f6', color: '#000000', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid #e5e7eb' }}>In Progress</span>
                    </div>
                    <h3 style={{ marginBottom: '1.5rem' }}>Question 4/10</h3>
                    <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginBottom: '2rem', fontWeight: '500' }}>What is the formula for Force?</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {['F = m / a', 'F = m * a', 'F = m + a'].map((opt, i) => (
                            <div key={i} style={{
                                padding: '1rem',
                                border: i === 1 ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                backgroundColor: i === 1 ? 'var(--color-primary)' : 'white',
                                color: i === 1 ? 'white' : 'var(--color-dark)',
                                fontWeight: i === 1 ? '600' : '400',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                {opt}
                                {i === 1 && <span>✅</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
