const mongoose = require('mongoose');

const staffReportSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthcareInstitution',
    required: true
  },
  medicationAdviceReport: {
    type: Number,
    required: true,
    default: 0
  },
  pharmaceuticalInterventionsReport: {
    type: Number,
    required: true,
    default: 0
  },
  adverseDrugReactionsReport: {
    type: Number,
    required: true,
    default: 0
  },
  qualityReport: {
    type: Number,
    required: true,
    default: 0
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'reviewed'],
    default: 'submitted'
  }
});

module.exports = mongoose.model('StaffReport', staffReportSchema);