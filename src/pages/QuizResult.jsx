import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { attemptAPI } from '../api';

const QuizResult = () => {
    const { attemptId } = useParams();
    const navigate = useNavigate();
    const [attempt, setAttempt] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAttempt = async () => {
            try {
                const response = await attemptAPI.get(attemptId);
                setAttempt(response.data);
            } catch (error) {
                console.error('Error fetching result:', error);
                alert('Could not load quiz result.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchAttempt();
    }, [attemptId]);

    const getOptionStyle = (qIndex, oIndex, correctIndex, selectedIndex) => {
        const isSelected = selectedIndex === oIndex;
        const isCorrect = correctIndex === oIndex;

        let style = {
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.75rem'
        };

        if (isCorrect) {
            style.backgroundColor = '#dcfce7'; // Green-100
            style.border = '2px solid #22c55e'; // Green-500
        } else if (isSelected && !isCorrect) {
            style.backgroundColor = '#fee2e2'; // Red-100
            style.border = '2px solid #ef4444'; // Red-500
        } else if (isSelected) {
            // Should be covered by isCorrect if selected is correct, 
            // but if for some reason logic falls through
            style.border = '2px solid #94a3b8';
        }

        return style;
    };

    if (isLoading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading results...</div>;
    if (!attempt) return <div style={{ padding: '5rem', textAlign: 'center' }}>Result not found.</div>;

    const studentAnswers = attempt.answers ? JSON.parse(attempt.answers) : {};

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 1rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        marginBottom: '2rem',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: '600'
                    }}
                >
                    ← Back
                </button>

                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '24px',
                    boxShadow: 'var(--shadow-sm)',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    <h1 style={{ marginBottom: '0.5rem' }}>{attempt.quiz.title} Results</h1>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                        Taken on {new Date(attempt.date).toLocaleString()}
                    </p>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: (attempt.score / attempt.total) > 0.8 ? '#16a34a' : 'var(--color-primary)' }}>
                        {attempt.score} / {attempt.total}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {attempt.quiz.questions.map((q, qIndex) => {
                        const selectedIndex = studentAnswers[qIndex];
                        return (
                            <div key={q.id} style={{
                                backgroundColor: 'white',
                                padding: '1.5rem',
                                borderRadius: '20px',
                                boxShadow: 'var(--shadow-sm)',
                                border: '1px solid #f1f5f9'
                            }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                                    <span style={{ color: '#94a3b8' }}>{qIndex + 1}.</span>
                                    <span>{q.text}</span>
                                </h3>

                                <div>
                                    {q.options.map((opt, oIndex) => {
                                        const style = getOptionStyle(qIndex, oIndex, q.correctIndex, selectedIndex);
                                        return (
                                            <div key={oIndex} style={style}>
                                                <div style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    borderRadius: '50%',
                                                    border: '2px solid #cbd5e1',
                                                    backgroundColor: style.backgroundColor === '#dcfce7' ? '#22c55e' : (style.backgroundColor === '#fee2e2' ? '#ef4444' : 'white'),
                                                    flexShrink: 0
                                                }} />
                                                <span>{opt}</span>
                                                {q.correctIndex === oIndex && <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#16a34a', fontWeight: '700' }}>Correct Answer</span>}
                                                {selectedIndex === oIndex && q.correctIndex !== oIndex && <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#ef4444', fontWeight: '700' }}>Your Answer</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuizResult;
