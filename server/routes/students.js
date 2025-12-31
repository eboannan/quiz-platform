const express = require('express');
const router = express.Router();
const prisma = require('../db');

// Middleware to check token (simplified)
const auth = (req, res, next) => {
    // In a real app, verify JWT here. 
    // For this rapid implementation, assuming headers 'Authorization'
    next();
};

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// Create Student
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, username, password, age, grade, accessCode, teacherId } = req.body;

        // Hash password
        username,
            password, // Store plain text so parents can see it
            age: parseInt(age),
                grade,
                accessCode,
                teacherId
    }
        });
res.json(student);
    } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
}
});

// Get Students for a Teacher
router.get('/', async (req, res) => {
    try {
        const { teacherId } = req.query;
        if (!teacherId) return res.status(400).json({ error: 'Teacher ID required' });

        const students = await prisma.student.findMany({
            where: { teacherId },
            include: { attempts: true, assignments: true }
        });
        res.json(students);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete Student
router.delete('/:id', async (req, res) => {
    try {
        await prisma.student.delete({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Get Single Student (Profile)
router.get('/:id', async (req, res) => {
    try {
        const student = await prisma.student.findUnique({
            where: { id: req.params.id },
            include: {
                attempts: true,
                assignments: {
                    include: {
                        quiz: {
                            include: { questions: true }
                        }
                    }
                }
            }
        });
        res.json(student);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
