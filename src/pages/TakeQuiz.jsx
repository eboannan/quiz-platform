import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI, attemptAPI } from '../api';

const TakeQuiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({}); // { questionIndex: optionIndex }
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const student = JSON.parse(localStorage.getItem('studentAuth') || '{}');
                if (!student.id) {
                    navigate('/student/login');
                    return;
                }

                const response = await quizAPI.getForStudent(student.id);
                const foundQuiz = response.data.find(q => q.id === id);
                if (foundQuiz) {
                    setQuiz(foundQuiz);
                } else {
                    alert('Quiz not found or not assigned to you.');
                    navigate('/student/dashboard');
                }
            } catch (error) {
                console.error('Error fetching quiz:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuiz();
    }, [id, navigate]);

    useEffect(() => {
        if (!quiz || isSubmitted) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [quiz, isSubmitted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOptionSelect = (qIndex, oIndex) => {
        if (isSubmitted) return;
        setAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
    };

    const attemptSubmit = () => {
        setShowConfirmModal(true);
    };

    const confirmSubmit = async () => {
        let correctCount = 0;
        quiz.questions.forEach((q, index) => {
            if (answers[index] === q.correctIndex) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setIsSubmitted(true);
        setShowConfirmModal(false);

        const isSimulated = localStorage.getItem('simulationMode');
        if (isSimulated) return;

        const student = JSON.parse(localStorage.getItem('studentAuth') || '{}');
        if (student.id) {
            try {
                await attemptAPI.create({
                    studentId: student.id,
                    quizId: quiz.id,
                    score: correctCount,
                    total: quiz.questions.length
                });
            } catch (error) {
                console.error('Error saving attempt:', error);
            }
        }
    };

    if (isLoading) return <div style={{ padding: '5rem', textAlign: 'center', color: '#64748b' }}>Preparing your quiz...</div>;
    if (!quiz) return <div style={{ padding: '2rem', textAlign: 'center' }}>Quiz not found.</div>;

    const unansweredIndices = quiz.questions
        .map((_, i) => i)
        .filter(i => answers[i] === undefined);

    if (isSubmitted) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: 'clamp(2rem, 8vw, 4rem)', borderRadius: '32px', boxShadow: 'var(--shadow-lg)', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
                    <div style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '1rem' }}>
                        {score === quiz.questions.length ? '🏆' : score > quiz.questions.length / 2 ? '🎉' : '📚'}
                    </div>
                    <h2 style={{ marginBottom: '1rem' }}>Quiz Finished!</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '2rem' }}>
                        You got <strong>{score}</strong> out of <strong>{quiz.questions.length}</strong> correct.
                    </p>
                    <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '3rem' }}>
                        {Math.round((score / quiz.questions.length) * 100)}%
                    </div>
                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1.25rem' }}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingBottom: '6rem' }}>
            <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '0.75rem clamp(1rem, 5vw, 2rem)',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 30
            }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <h2 style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{quiz.title}</h2>
                </div>
                <div style={{
                    fontFamily: 'monospace',
                    fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
                    fontWeight: '800',
                    color: 'var(--color-primary)',
                    backgroundColor: '#e0e7ff',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '12px',
                    marginLeft: '1rem'
                }}>
                    {formatTime(timeElapsed)}
                </div>
            </div>

            <div className="container" style={{ maxWidth: '700px', padding: '2rem 1rem' }}>
                {quiz.questions.map((q, qIndex) => (
                    <div key={q.id} className="animate-fade-in" style={{
                        backgroundColor: 'white',
                        padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                        borderRadius: '24px',
                        boxShadow: 'var(--shadow-sm)',
                        marginBottom: '2rem',
                        border: '1px solid #f1f5f9',
                        animationDelay: `${qIndex * 0.1}s`
                    }}>
                        <h3 style={{ marginBottom: '1.75rem', display: 'flex', gap: '0.75rem', lineHeight: '1.4' }}>
                            <span style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{qIndex + 1}</span>
                            <span style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', fontWeight: '600' }}>{q.text}</span>
                        </h3>
                        {q.image && (
                            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                                <img
                                    src={q.image}
                                    alt="Question Illustration"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '300px',
                                        borderRadius: '16px',
                                        border: '1px solid #f1f5f9'
                                    }}
                                />
                            </div>
                        )}
                        <div style={{ display: 'grid', gap: '0.85rem' }}>
                            {q.options.map((opt, oIndex) => (
                                <div
                                    key={oIndex}
                                    onClick={() => handleOptionSelect(qIndex, oIndex)}
                                    style={{
                                        padding: '1.1rem',
                                        borderRadius: '16px',
                                        border: answers[qIndex] === oIndex ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                                        backgroundColor: answers[qIndex] === oIndex ? '#f8fafc' : 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            minWidth: '22px',
                                            height: '22px',
                                            borderRadius: '50%',
                                            border: answers[qIndex] === oIndex ? '7px solid var(--color-primary)' : '2px solid #cbd5e1',
                                            backgroundColor: 'white'
                                        }} />
                                        <span style={{ fontSize: '0.95rem', fontWeight: answers[qIndex] === oIndex ? '700' : '400' }}>{opt}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={attemptSubmit}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1.5rem', fontSize: '1.25rem', borderRadius: '20px', marginTop: '1rem' }}
                >
                    Submit Quiz
                </button>
            </div>

            {showConfirmModal && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, padding: '1rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '24px', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Finish Quiz?</h3>
                        {unansweredIndices.length > 0 ? (
                            <div style={{ backgroundColor: '#fff1f2', padding: '1rem', borderRadius: '12px', border: '1px solid #fecdd3', marginBottom: '1.5rem' }}>
                                <p style={{ color: '#e11d48', fontSize: '0.9rem', fontWeight: '600' }}>
                                    Warning: You missed {unansweredIndices.length} question(s)!
                                </p>
                            </div>
                        ) : (
                            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Great job! You've answered every question. ready to submit?</p>
                        )}
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                style={{ flex: 1, padding: '1rem', border: 'none', background: '#f1f5f9', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}
                            >
                                Not yet
                            </button>
                            <button
                                onClick={confirmSubmit}
                                className="btn btn-primary"
                                style={{ flex: 1.5 }}
                            >
                                Finish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TakeQuiz;
