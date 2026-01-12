const express = require('express');
const router = express.Router();
const prisma = require('../db');

// Create Quiz
router.post('/', async (req, res) => {
    try {
        const { title, teacherId, questions } = req.body;

        // Create Quiz and Questions via nested write
        const quiz = await prisma.quiz.create({
            data: {
                title,
                teacherId,
                questions: {
                    create: questions.map(q => ({
                        text: q.text,
                        options: JSON.stringify(q.options),
                        correctIndex: q.correct,
                        image: q.image || null
                    }))
                }
            },
            include: { questions: true }
        });
        res.json(quiz);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// Get Quizzes (Teacher)
router.get('/teacher/:teacherId', async (req, res) => {
    try {
        const quizzes = await prisma.quiz.findMany({
            where: { teacherId: req.params.teacherId },
            include: { questions: true, assignments: true }
        });
        // Parse JSON fields
        const formatted = quizzes.map(q => ({
            ...q,
            questions: q.questions.map(qu => ({
                ...qu,
                options: JSON.parse(qu.options),

            })),
            assignedTo: q.assignments.map(a => a.studentId)
        }));
        res.json(formatted);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// Assign Quiz (Update Assignments)
router.post('/:id/assign', async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId } = req.body;

        // Upsert assignment to prevent duplicates
        // Actually Prisma @@unique constraint handles it, but safer to check or use createMany with skipDuplicates if supported (SQLite standard support varies)

        // Simple create, catch error if unique constraint
        await prisma.assignment.create({
            data: {
                quizId: id,
                studentId: studentId
            }
        });
        res.json({ success: true });
    } catch (e) {
        // Ignore unique constraint violation
        res.json({ success: true }); // treat as success
    }
});

// Update Quiz
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, questions } = req.body;

        // Transaction to ensure atomicity
        const updatedQuiz = await prisma.$transaction(async (prisma) => {
            // 1. Update Quiz Title
            const quiz = await prisma.quiz.update({
                where: { id },
                data: { title }
            });

            // 2. Delete existing questions
            await prisma.question.deleteMany({
                where: { quizId: id }
            });

            // 3. Create new questions
            if (questions && questions.length > 0) {
                await prisma.question.createMany({
                    data: questions.map(q => ({
                        quizId: id,
                        text: q.text,
                        options: JSON.stringify(q.options),
                        correctIndex: q.correct,
                        image: q.image || null
                    }))
                });
            }

            return quiz;
        });

        // Fetch the full quiz to return
        const fullQuiz = await prisma.quiz.findUnique({
            where: { id },
            include: { questions: true }
        });

        res.json(fullQuiz);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// Delete Quiz
router.delete('/:id', async (req, res) => {
    try {
        await prisma.quiz.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Get Quizzes (Student)
router.get('/student/:studentId', async (req, res) => {
    try {
        const assignments = await prisma.assignment.findMany({
            where: { studentId: req.params.studentId },
            include: {
                quiz: {
                    include: { questions: true }
                }
            }
        });

        const quizzes = assignments.map(a => {
            const quiz = a.quiz;
            return {
                ...quiz,
                questions: quiz.questions.map(q => ({
                    ...q,
                    options: JSON.parse(q.options),

                }))
            };
        });

        res.json(quizzes);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
