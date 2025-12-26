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
                // We need a specific getById or we filter. 
                // Since this is for students, let's assume we can fetch by ID directly 
                // but currently my backend quizzes.js only has teacher and student specific lists.
                // Let's quickly add a generic GET /:id to quizzes.js for this.
                // BUT for now, let's look for it in the student's dashboard or fetch it.

                // Let's add a generic GET /api/quizzes/:id in backend.
                // For now, I'll fetch it from the student profile if I can.
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
        // Calculate Score
        let correctCount = 0;
        quiz.questions.forEach((q, index) => {
            if (answers[index] === q.correctIndex) { // Backend uses correctIndex
                correctCount++;
            }
        });
        setScore(correctCount);
        setIsSubmitted(true);
        setShowConfirmModal(false);

        // Save Attempt (only if not in simulation mode)
        const isSimulated = localStorage.getItem('simulationMode');
        if (isSimulated) {
            console.log("Simulation mode: Attempt not saved.");
            return;
        }

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

    if (isLoading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading Quiz...</div>;
    if (!quiz) return <div style={{ padding: '2rem', textAlign: 'center' }}>Quiz not found.</div>;

    const unansweredIndices = quiz.questions
        .map((_, i) => i)
        .filter(i => answers[i] === undefined);

    if (isSubmitted) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        {score === quiz.questions.length ? '🏆' : score > quiz.questions.length / 2 ? '🎉' : '📚'}
                    </div>
                    <h1 style={{ marginBottom: '1rem' }}>Quiz Results</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '2rem' }}>
                        You scored <strong>{score}</strong> out of <strong>{quiz.questions.length}</strong>
                    </p>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '2rem' }}>
                        {Math.round((score / quiz.questions.length) * 100)}%
                    </div>
                    <button
                        onClick={() => navigate('/student/dashboard')}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingBottom: '4rem' }}>
            <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                padding: '1rem 2rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
            }}>
                <h2 style={{ fontSize: '1.2rem' }}>{quiz.title}</h2>
                <div style={{
                    fontFamily: 'monospace',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    backgroundColor: '#e0e7ff',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px'
                }}>
                    {formatTime(timeElapsed)}
                </div>
            </div>

            <div className="container" style={{ maxWidth: '800px', padding: '2rem 1rem' }}>
                {quiz.questions.map((q, qIndex) => (
                    <div key={q.id} style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '16px',
                        boxShadow: 'var(--shadow-sm)',
                        marginBottom: '2rem',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                            <span style={{ color: '#94a3b8' }}>{qIndex + 1}.</span>
                            <span>{q.text}</span>
                        </h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {q.options.map((opt, oIndex) => (
                                <div
                                    key={oIndex}
                                    onClick={() => handleOptionSelect(qIndex, oIndex)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: answers[qIndex] === oIndex ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                                        backgroundColor: answers[qIndex] === oIndex ? '#e0e7ff' : 'white',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            border: answers[qIndex] === oIndex ? '6px solid var(--color-primary)' : '2px solid #cbd5e1',
                                            backgroundColor: 'white'
                                        }} />
                                        <span>{opt}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={attemptSubmit}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1.5rem', fontSize: '1.25rem', borderRadius: '16px' }}
                >
                    Submit Quiz
                </button>
            </div>

            {showConfirmModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 50
                }}>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', maxWidth: '400px', width: '90%' }}>
                        <h3>Ready to Submit?</h3>
                        {unansweredIndices.length > 0 ? (
                            <p style={{ color: '#ef4444', margin: '1rem 0' }}>
                                You have <strong>{unansweredIndices.length}</strong> unanswered question{unansweredIndices.length !== 1 && 's'}.
                                <br />(Questions: {unansweredIndices.map(i => i + 1).join(', ')})
                            </p>
                        ) : (
                            <p style={{ margin: '1rem 0' }}>All questions answered! Ready to see your score?</p>
                        )}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                style={{ flex: 1, padding: '1rem', border: 'none', background: '#f1f5f9', borderRadius: '8px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmSubmit}
                                className="btn btn-primary"
                                style={{ flex: 1 }}
                            >
                                Yes, Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TakeQuiz;
