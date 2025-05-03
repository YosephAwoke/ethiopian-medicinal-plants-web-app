const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Sign Up
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Update Profile
router.put('/profile', authenticateToken, upload.single('photo'), async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.userId; // Extracted from the middleware

  try {
    const updates = { name, email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      updates.photo = req.file.path; // Save the file path to the user's photo
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, photo: updatedUser.photo } });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;