const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Startup DB Check
const prisma = require('./db');
prisma.$connect()
    .then(() => console.log('✅ Database connected successfully!'))
    .catch(err => {
        console.error('❌ Database connection failed on startup:', err);
        console.error('DATABASE_URL is:', process.env.DATABASE_URL ? 'Set (Hidden)' : 'MISSING');
    });

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
const fs = require('fs');

// ... (existing middleware)

// DEBUG ROUTE: Check file system from browser
app.get('/test-debug', (req, res) => {
    try {
        const debugInfo = {
            currentDir: __dirname,
            rootDirFiles: fs.readdirSync(path.join(__dirname, '../')),
            distPath: path.join(__dirname, '../dist'),
            distExists: fs.existsSync(path.join(__dirname, '../dist')),
            distFiles: fs.existsSync(path.join(__dirname, '../dist')) ? fs.readdirSync(path.join(__dirname, '../dist')) : 'DIST FOLDER MISSING!'
        };
        res.json(debugInfo);
    } catch (e) {
        res.status(500).json({ error: e.message, stack: e.stack });
    }
});

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
    const indexPath = path.join(distPath, 'index.html');
    console.log(`[SPA Fallback] Request for ${req.url} -> serving ${indexPath}`);

    if (fs.existsSync(indexPath)) {
        fs.readFile(indexPath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading index.html:", err);
                res.status(500).send(`Error reading frontend file: ${err.message}`);
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.send(data);
            }
        });
    } else {
        console.error("Index.html missing at:", indexPath);
        res.status(404).send(`
            <html>
                <body style="font-family: sans-serif; padding: 2rem; max-width: 600px; margin: 0 auto; background-color: #fef2f2; color: #991b1b;">
                    <h1>Deployment Issue</h1>
                    <p>The server is running, but the React Frontend application (index.html) was not found.</p>
                    <p><strong>Expected Path:</strong> ${indexPath}</p>
                    <hr/>
                    <p><em>This usually means the build script failed or the 'dist' folder was not created correctly.</em></p>
                    <a href="/test-debug">View Server Debug Info</a>
                </body>
            </html>
        `);
    }
});

app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        console.error("FAILED TO BIND PORT:", err);
    } else {
        console.log(`Server running on port ${PORT}`);
        console.log(`Open in browser: http://localhost:${PORT}`);

        // Run DB Migration in background to avoid blocking startup
        console.log("🚀 Triggering background DB sync...");
        const { exec } = require('child_process');
        exec('npx prisma db push --accept-data-loss', (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ DB Sync Failed: ${error.message}`);
                return;
            }
            if (stderr) console.error(`⚠️ DB Sync Stderr: ${stderr}`);
            console.log(`✅ DB Sync Success: ${stdout}`);
        });
    }
});
