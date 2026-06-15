const User = require('../models/User');
const Company = require('../models/Company');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../utils/AppError');

// @desc    Register user + create company
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, companyName, phone } = req.body;

  // Validate required fields
  if (!name || !email || !password || !companyName) {
    throw new AppError('Please provide name, email, password and company name', 400);
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError('Email already registered', 400);
  }

  // Create user first (without companyId)
  const user = await User.create({
    name,
    email,
    password,
    role: 'admin',
  });

  // Create company linked to user
  const company = await Company.create({
    name: companyName,
    ownerId: user._id,
    phone: phone || '',
  });

  // Link company back to user
  user.companyId = company._id;
  await user.save({ validateBeforeSave: false });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: company._id,
      companyName: company.name,
    },
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  // Find user — explicitly select password since it's select:false
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  if (!user.isActive) {
    throw new AppError('Your account has been deactivated', 401);
  }

  // Get company details
  const company = await Company.findById(user.companyId);

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      companyName: company?.name || '',
    },
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const company = await Company.findById(user.companyId);

  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      companyName: company?.name || '',
    },
  });
});

module.exports = { registerUser, loginUser, getMe };