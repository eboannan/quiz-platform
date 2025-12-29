import studentImage from '../assets/student-image-dark-skin.png';

const Hero = () => {
    return (
        <section className="container grid-cols-2" style={{
            alignItems: 'center',
            paddingTop: 'clamp(4rem, 10vh, 8rem)',
            paddingBottom: 'clamp(4rem, 10vh, 8rem)',
            minHeight: '80vh'
        }}>
            <div className="animate-fade-in">
                <img
                    src={studentImage}
                    alt="Student with PenguinPrep"
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        display: 'block'
                    }}
                />
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
                        <span style={{ fontWeight: '600', color: 'var(--color-text)' }}>Algebra 1</span>
                        <span style={{ backgroundColor: '#f3f4f6', color: '#000000', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid #e5e7eb' }}>In Progress</span>
                    </div>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Question 1</h3>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', fontWeight: '600', lineHeight: '1.4' }}>
                        A phone company charges a monthly fee of $20 plus $0.05 per text message. Which equation represents the total monthly cost C if t text messages are sent?
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                        {[
                            'C = 20t + 0.05',
                            'C = 0.05t + 20',
                            'C = 20 - 0.05t',
                            'C = 0.05t - 20'
                        ].map((opt, i) => (
                            <div key={i} style={{
                                padding: '1rem',
                                border: i === 1 ? '2px solid #000000' : '1px solid #e2e8f0',
                                borderRadius: '12px',
                                cursor: 'default',
                                backgroundColor: 'white',
                                color: 'var(--color-dark)',
                                fontWeight: i === 1 ? '700' : '400',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    border: '2px solid #e2e8f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: i === 1 ? '#000000' : 'transparent'
                                }}>
                                    {i === 1 && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }} />}
                                </div>
                                <span>{opt}</span>
                            </div>
                        ))}
                    </div>
                    <button style={{
                        width: '100%',
                        padding: '1.25rem',
                        backgroundColor: '#000000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        fontWeight: '700',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                        Submit Quiz
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
