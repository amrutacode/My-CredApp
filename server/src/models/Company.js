const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gst: {
      type: String,
      trim: true,
      uppercase: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    industry: {
      type: String,
      default: 'General',
    },
    settings: {
      currency: { type: String, default: 'INR' },
      taxRate: { type: Number, default: 18 },
      paymentTerms: { type: Number, default: 30 },
      reminderDays: {
        type: [Number],
        default: [-7, 0, 3, 7], // negative = before due, positive = after due
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);