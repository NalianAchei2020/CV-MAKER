import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { createError } from '../utils/errorMessage.js';

dotenv.config();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d', // Token expires in 7 days
    }
  );
};

// @desc   Register a new user
// @route  POST /auth/signup
// @access Public
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 6 characters.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

export const signIn = async (req, res, next) => {
  console.log('🔹 Request Body:', req.body); // Log request body for debugging

  const { email, password } = req.body;
  console.log('🔹 Email:', email); // Log email for debugging

  try {
    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.error('❌ User not found:', email);
      return next(createError(404, 'User not found!'));
    }

    // ✅ Compare password securely
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      console.error('❌ Wrong password for:', email);
      return next(createError(400, 'Wrong username or password!'));
    }

    // ✅ Generate token
    const token = generateToken(user);

    // ✅ Send response with `user` object & `token`
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    console.log(`✅ User logged in successfully: ${user.email}`);
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      error: 'Server error, please try again later.',
      message: error.message,
    });
  }
};
