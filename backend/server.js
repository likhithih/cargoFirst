const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
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
mongoose.connect(MONGO_URl  , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

