const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  arabicName: String,
  type: {
    type: String,
    enum: ['Hospital', 'Health Center', 'Clinic'],
    required: true
  },
  governorate: {
    type: String,
    required: true
  },
  address: String,
  phone: String,
  email: String,
  sultanQaboosMedicineID: String,
  capacity: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

module.exports = mongoose.model('HealthcareInstitution', institutionSchema);