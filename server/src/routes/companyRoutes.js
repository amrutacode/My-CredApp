const express = require('express');
const router = express.Router();
const { getCompany, updateCompany } = require('../controllers/companyController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, getCompany);
router.put('/', protect, adminOnly, updateCompany);

module.exports = router;