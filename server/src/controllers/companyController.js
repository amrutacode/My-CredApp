const Company = require('../models/Company');
const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../utils/AppError');

// @desc    Get current user's company
// @route   GET /api/company
// @access  Private
const getCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.user.companyId);

  if (!company) {
    throw new AppError('Company not found', 404);
  }

  res.status(200).json({
    success: true,
    company,
  });
});

// @desc    Update company profile
// @route   PUT /api/company
// @access  Private — admin only
const updateCompany = asyncHandler(async (req, res) => {
  const { name, gst, address, phone, email, industry, settings } = req.body;

  const company = await Company.findById(req.user.companyId);

  if (!company) {
    throw new AppError('Company not found', 404);
  }

  // Update only provided fields
  if (name) company.name = name;
  if (gst) company.gst = gst;
  if (address) company.address = address;
  if (phone) company.phone = phone;
  if (email) company.email = email;
  if (industry) company.industry = industry;

  // Deep merge settings
  if (settings) {
    company.settings = {
      ...company.settings.toObject(),
      ...settings,
    };
  }

  const updatedCompany = await company.save();

  res.status(200).json({
    success: true,
    company: updatedCompany,
  });
});

module.exports = { getCompany, updateCompany };