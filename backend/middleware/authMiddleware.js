import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

dotenv.config();

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  // Check if token exists and starts with "Bearer "
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized, no token provided' });
  }

  try {
    token = token.split(' ')[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database (excluding password)
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized, user not found' });
    }

    req.user = user; // Attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// ✅ Middleware to allow only admins
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admins only.' });
  }
};
