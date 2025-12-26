import React, { useState } from 'react';
import studentImg from '../assets/student-image-dark-skin.png';
import teacherImg from '../assets/teacher-image-indian.png';

const Features = () => {
    const [activeTab, setActiveTab] = useState('student');

    return (
        <section id="features" style={{ backgroundColor: '#f1f5f9', padding: '6rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Built for Everyone</h2>
                    <p style={{ color: 'var(--color-text)', maxWidth: '600px', margin: '0 auto' }}>Whether you're teaching the class or acing the test, we have tools designed just for you.</p>

                    <div style={{
                        display: 'inline-flex',
                        backgroundColor: 'white',
                        padding: '0.5rem',
                        borderRadius: '999px',
                        marginTop: '2rem',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <button
                            onClick={() => setActiveTab('student')}
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: '999px',
                                backgroundColor: activeTab === 'student' ? 'var(--color-primary)' : 'transparent',
                                color: activeTab === 'student' ? 'white' : 'var(--color-text)',
                                fontWeight: '600'
                            }}
                        >
                            For Students
                        </button>
                        <button
                            onClick={() => setActiveTab('admin')}
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: '999px',
                                backgroundColor: activeTab === 'admin' ? 'var(--color-dark)' : 'transparent',
                                color: activeTab === 'admin' ? 'white' : 'var(--color-text)',
                                fontWeight: '600'
                            }}
                        >
                            For Teachers
                        </button>
                    </div>
                </div>

                <div className="grid-cols-2" style={{ alignItems: 'center' }}>
                    {/* Image Side */}
                    <div style={{
                        backgroundColor: activeTab === 'student' ? '#e5e7eb' : '#f3f4f6',
                        height: '400px',
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
                    <div>
                        {activeTab === 'student' ? (
                            <div className="animate-fade-in">
                                <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Gamify Your Learning</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        { title: 'Instant Feedback', desc: 'Know exactly what you got wrong and why, instantly.' },
                                        { title: 'Earn Rewards', desc: 'Collect badges and achievements as you master topics.' }
                                    ].map((item, i) => (
                                        <li key={i} style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
                                            <div style={{
                                                minWidth: '2.5rem', height: '2.5rem',
                                                backgroundColor: '#f3f4f6', color: 'var(--color-primary)',
                                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                            }}>{i + 1}</div>
                                            <div>
                                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                                                <p style={{ color: 'var(--color-text)' }}>{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-dark)' }}>Manage With Ease</h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        { title: 'Real-time Analytics', desc: 'See who is struggling and who is excelling in real-time.' },
                                        { title: 'Curriculum Alignment', desc: 'Tag questions by standard and topic effortlessly.' },
                                        { title: 'Bulk Import', desc: 'Upload CSVs of questions or student lists in seconds.' }
                                    ].map((item, i) => (
                                        <li key={i} style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
                                            <div style={{
                                                minWidth: '2.5rem', height: '2.5rem',
                                                backgroundColor: '#f1f5f9', color: 'var(--color-dark)',
                                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                            }}>{i + 1}</div>
                                            <div>
                                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                                                <p style={{ color: 'var(--color-text)' }}>{item.desc}</p>
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
