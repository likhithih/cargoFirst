import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Register request received:', { username, email, password: password ? 'provided' : 'missing' });

  try {
    console.log('Checking JWT_SECRET...');
    // Defensive: ensure JWT secret is configured before attempting to sign tokens
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      return res.status(500).json({ message: 'Server configuration error' });
    }
    console.log('JWT_SECRET is set.');

    console.log('Checking if user exists by email...');
    let user = await User.findOne({ email });
    if (user) {
      console.log('User with email already exists.');
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('Checking if user exists by username...');
    user = await User.findOne({ username });
    if (user) {
      console.log('User with username already exists.');
      return res.status(400).json({ message: 'Username already exists' });
    }

    console.log('Creating new user...');
    user = new User({ username, email, password });

    console.log('Generating salt...');
    const salt = await bcrypt.genSalt(10);

    console.log('Hashing password...');
    user.password = await bcrypt.hash(password, salt);

    console.log('Saving user to database...');
    await user.save();
    console.log('User saved successfully.');

    console.log('Signing JWT token...');
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token signed successfully.');

    console.log('Register successful, sending response.');
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Defensive: ensure JWT secret is configured before attempting to sign tokens
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
