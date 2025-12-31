import React, { useState } from 'react';
import studentImg from '../assets/student-image-dark-skin.png';
import teacherImg from '../assets/teacher-image-indian.png';

const Features = () => {
    const [activeTab, setActiveTab] = useState('student');

    return (
        <section id="features" style={{ backgroundColor: '#f1f5f9', padding: 'clamp(3rem, 10vh, 6rem) 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 8vh, 4rem)' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Built for Everyone</h2>
                    <p style={{ color: 'var(--color-text)', maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>Whether you're teaching the class or acing the test, we have tools designed just for you.</p>

                    <div style={{
                        display: 'inline-flex',
                        backgroundColor: 'white',
                        padding: '0.4rem',
                        borderRadius: '999px',
                        marginTop: '2rem',
                        boxShadow: 'var(--shadow-sm)',
                        maxWidth: '100%',
                        overflowX: 'auto'
                    }}>
                        <button
                            onClick={() => setActiveTab('student')}
                            style={{
                                padding: '0.75rem clamp(1rem, 5vw, 2rem)',
                                borderRadius: '999px',
                                backgroundColor: activeTab === 'student' ? 'var(--color-primary)' : 'transparent',
                                color: activeTab === 'student' ? 'white' : 'var(--color-text)',
                                fontWeight: '600',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            For Students
                        </button>
                        <button
                            onClick={() => setActiveTab('admin')}
                            style={{
                                padding: '0.75rem clamp(1rem, 5vw, 2rem)',
                                borderRadius: '999px',
                                backgroundColor: activeTab === 'admin' ? 'var(--color-dark)' : 'transparent',
                                color: activeTab === 'admin' ? 'white' : 'var(--color-text)',
                                fontWeight: '600',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            For Parents
                        </button>
                    </div>
                </div>

                <div className="grid-cols-2" style={{ alignItems: 'center', gap: '3rem' }}>
                    {/* Image Side */}
                    <div style={{
                        backgroundColor: activeTab === 'student' ? '#e5e7eb' : '#f3f4f6',
                        height: 'clamp(300px, 40vh, 450px)',
                        borderRadius: '24px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {activeTab === 'student' ? (
                                <img
                                    src={studentImg}
                                    alt="Student"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <img
                                    src={teacherImg}
                                    alt="Teacher"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Content Side */}
                    <div style={{ padding: '0 0.5rem' }}>
                        {activeTab === 'student' ? (
                            <div className="animate-fade-in">
                                <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Gamify Your Learning</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        { title: 'Instant Feedback', desc: 'Know exactly what you got wrong and why, instantly.' },
                                        { title: 'Earn Rewards', desc: 'Collect badges and achievements as you master topics.' }
                                    ].map((item, i) => (
                                        <li key={i} style={{ listStyle: 'none', display: 'flex', gap: '1.25rem' }}>
                                            <div style={{
                                                minWidth: '2.75rem', height: '2.75rem',
                                                backgroundColor: '#ffffff', color: 'var(--color-primary)',
                                                borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800',
                                                boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0'
                                            }}>{i + 1}</div>
                                            <div>
                                                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.25rem', fontWeight: '700' }}>{item.title}</h4>
                                                <p style={{ color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: '1.5' }}>{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-dark)' }}>Manage With Ease</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        { title: 'Real-time Analytics', desc: 'See who is struggling and who is excelling in real-time.' },
                                        { title: 'Curriculum Alignment', desc: 'Tag questions by standard and topic effortlessly.' },
                                        { title: 'Bulk Import', desc: 'Upload CSVs of questions or student lists in seconds.' }
                                    ].map((item, i) => (
                                        <li key={i} style={{ listStyle: 'none', display: 'flex', gap: '1.25rem' }}>
                                            <div style={{
                                                minWidth: '2.75rem', height: '2.75rem',
                                                backgroundColor: '#ffffff', color: 'var(--color-dark)',
                                                borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800',
                                                boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0'
                                            }}>{i + 1}</div>
                                            <div>
                                                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.25rem', fontWeight: '700' }}>{item.title}</h4>
                                                <p style={{ color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: '1.5' }}>{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
