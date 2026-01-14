const express = require('express');
const router = express.Router();
const prisma = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, passwordHint } = req.body;

        // Check existing
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                passwordHint
            }
        });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error("REGISTRATION ERROR:", err);
        console.error("DB URL Present?", !!process.env.DATABASE_URL);
        console.error("JWT SECRET Present?", !!process.env.JWT_SECRET);

        // Return actual error message for debugging (in prod you might hide this, but we need it now)
        res.status(500).json({
            error: err.message || 'Server error',
            details: err.code ? `Prisma Error Code: ${err.code}` : 'No code'
        });
    }
});

// Get Password Hint
router.get('/hint/:email', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.params.email },
            select: { passwordHint: true }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ hint: user.passwordHint || "No hint provided for this account." });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Student Login (Username/Password)
router.post('/student-login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const student = await prisma.student.findUnique({
            where: { username },
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

        if (!student) return res.status(400).json({ error: 'Invalid username or password' });

        let match = false;
        // Check if password suggests it is hashed (bcrypt starts with $2b$, $2a$, or $2y$)
        if (student.password.startsWith('$2') && student.password.length === 60) {
            match = await bcrypt.compare(password, student.password);
        } else {
            // Plain text comparison
            match = (password === student.password);
        }

        if (!match) return res.status(400).json({ error: 'Invalid username or password' });

        // Remove password before sending
        const { password: _, ...studentData } = student;
        res.json(studentData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
