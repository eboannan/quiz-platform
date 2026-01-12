const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL || '*', // Allow all in dev, but restricted in prod
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const quizRoutes = require('./routes/quizzes');
const attemptRoutes = require('./routes/attempts');

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/attempts', attemptRoutes);

const path = require('path');

// ... (existing middleware)

// Serve Static Files from React App
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/attempts', attemptRoutes);

// Catch-all handler for any request that doesn't match an API route
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) {
            console.error("Error sending index.html from path:", path.join(distPath, 'index.html'), err);
            res.status(500).send(`Server Error: Could not load frontend. Path attempted: ${path.join(distPath, 'index.html')}. Error: ${err.message}`);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
