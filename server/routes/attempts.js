const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Attempt
router.post('/', async (req, res) => {
    try {
        const { studentId, quizId, score, total } = req.body;

        const attempt = await prisma.attempt.create({
            data: {
                studentId,
                quizId,
                score: parseInt(score),
                total: parseInt(total)
            }
        });
        res.json(attempt);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// Get attempts for a student (redundant if student profile includes them, but good for specific queries)
router.get('/student/:studentId', async (req, res) => {
    try {
        const attempts = await prisma.attempt.findMany({
            where: { studentId: req.params.studentId },
            include: { quiz: true }
        });
        res.json(attempts);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
