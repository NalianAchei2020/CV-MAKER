import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import connectDB from './database/database.js';
import userRoutes from './routes/userRoutes.js';
import templateRoutes from './routes/templateRoutes.js';
import coverLetterRoutes from './routes/coverLetterRoutes.js';
import cvRoutes from './routes/cvRoutes.js';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Database
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', coverLetterRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/cvs', cvRoutes);

app.get('/', (req, res) => res.send('Welcome to CV Maker'));

const PORT = process.env.PORT || 20015;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
