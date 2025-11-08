import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';

const MONGO_URI = process.env.MONGO_URI;

dotenv.config();

// Ensure required environment variables are present early so we fail fast
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  // Exit so the platform (or developer) notices the misconfiguration immediately
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors({
    origin: 'https://comfy-douhua-f6316a.netlify.app', // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],          // allowed HTTP methods
    credentials: true                                   // allow cookies if needed
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

