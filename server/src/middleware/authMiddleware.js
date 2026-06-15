const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');
const AppError = require('../utils/AppError');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Not authorized, no token', 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    throw new AppError('User no longer exists', 401);
  }

  next();
});

const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    throw new AppError('Admin access required', 403);
  }
  next();
});

module.exports = { protect, adminOnly };