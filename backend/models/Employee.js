const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  employeeID: {
    type: String,
    required: true,
    unique: true
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthcareInstitution',
    required: true
  },
  department: String,
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
});

module.exports = mongoose.model('Employee', employeeSchema);