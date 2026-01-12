import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { quizAPI } from '../api';

const CreateQuiz = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([
        { id: 1, text: '', options: ['', '', '', ''], correct: 0, tags: { class: '', course: '', student: '' } }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            // In a better API we'd have getById, but currently getAll filtered works or we can add it
            // For now, let's assume we fetch all and find
            const fetchQuiz = async () => {
                try {
                    const response = await quizAPI.getAll(user.id);
                    const quizToEdit = response.data.find(q => q.id === id);
                    if (quizToEdit) {
                        setQuizTitle(quizToEdit.title);
                        setQuestions(quizToEdit.questions);
                    }
                } catch (error) {
                    console.error('Error fetching quiz to edit:', error);
                }
            };
            if (user?.id) fetchQuiz();
        }
    }, [id, user]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            { id: Date.now(), text: '', options: ['', '', '', ''], correct: 0, tags: { class: '', course: '', student: '' } }
        ]);
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const updateOption = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const updateTag = (qIndex, tagField, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].tags[tagField] = value;
        setQuestions(newQuestions);
    };

    const handleImageUpload = (qIndex, e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Limit size to 2MB to prevent heavy payloads
        if (file.size > 2 * 1024 * 1024) {
            alert('Image must be less than 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const newQuestions = [...questions];
            newQuestions[qIndex].image = reader.result; // Store Base64
            setQuestions(newQuestions);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        if (!quizTitle) return alert('Please enter a quiz title');
        setIsLoading(true);

        try {

            if (id) {
                // Update existing quiz
                await quizAPI.update(id, {
                    title: quizTitle,
                    questions: questions
                });
                alert('Quiz Updated Successfully!');
            } else {
                // Create new quiz
                await quizAPI.create({
                    title: quizTitle,
                    teacherId: user.id,
                    questions: questions
                });
                alert('Quiz Saved Successfully!');
            }
            navigate('/parent/dashboard');
        } catch (error) {
            console.error('Error saving quiz:', error);
            alert('Failed to save quiz to server.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>{id ? 'Edit Quiz' : 'Create New Quiz'}</h1>
                    <button
                        onClick={() => navigate('/parent/dashboard')}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-text)',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Cancel
                    </button>
                </div>

                {/* Quiz Details */}
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Quiz Title</label>
                    <input
                        type="text"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        placeholder="e.g., Weekly Math Quiz"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.2rem',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                        }}
                    />
                </div>

                {/* Questions List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {questions.map((q, qIndex) => (
                        <div key={q.id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.2rem' }}>Question {qIndex + 1}</h3>
                                {questions.length > 1 && (
                                    <button
                                        onClick={() => setQuestions(questions.filter((_, i) => i !== qIndex))}
                                        style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>

                            <input
                                type="text"
                                value={q.text}
                                onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                                placeholder="Enter question text..."
                                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            />

                            {/* Image Upload */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                                    Question Image (Optional)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(qIndex, e)}
                                    style={{ fontSize: '0.9rem' }}
                                />
                                {q.image && (
                                    <div style={{ marginTop: '0.5rem', position: 'relative', display: 'inline-block' }}>
                                        <img
                                            src={q.image}
                                            alt="Question Preview"
                                            style={{ maxHeight: '150px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        />
                                        <button
                                            onClick={() => updateQuestion(qIndex, 'image', null)}
                                            style={{
                                                position: 'absolute',
                                                top: '-5px',
                                                right: '-5px',
                                                background: '#ef4444',
                                                color: 'white',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                fontSize: '0.8rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid-cols-2" style={{ marginBottom: '1.5rem' }}>
                                {q.options.map((opt, oIndex) => (
                                    <div key={oIndex} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <input
                                            type="radio"
                                            name={`correct-${q.id}`}
                                            checked={q.correct === oIndex}
                                            onChange={() => updateQuestion(qIndex, 'correct', oIndex)}
                                            style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                                        />
                                        <input
                                            type="text"
                                            value={opt}
                                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                            placeholder={`Option ${oIndex + 1}`}
                                            style={{
                                                flex: 1,
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                border: q.correct === oIndex ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                                                backgroundColor: q.correct === oIndex ? '#f3f4f6' : 'white'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>Tags (Optional)</p>
                                <div className="grid-cols-3">
                                    <input
                                        type="text"
                                        placeholder="Class (e.g., 5A)"
                                        value={q.tags.class}
                                        onChange={(e) => updateTag(qIndex, 'class', e.target.value)}
                                        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Course (e.g., Math)"
                                        value={q.tags.course}
                                        onChange={(e) => updateTag(qIndex, 'course', e.target.value)}
                                        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Student (e.g., Araba)"
                                        value={q.tags.student}
                                        onChange={(e) => updateTag(qIndex, 'student', e.target.value)}
                                        style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', paddingBottom: '4rem' }}>
                    <button
                        onClick={addQuestion}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '2px dashed #94a3b8',
                            backgroundColor: 'transparent',
                            color: 'var(--color-text)',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        + Add Question
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="btn btn-primary"
                        style={{ flex: 1, borderRadius: '12px', opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading ? 'Saving...' : 'Save Quiz'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateQuiz;
