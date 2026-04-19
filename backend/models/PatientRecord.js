const mongoose = require('mongoose');

const patientRecordSchema = new mongoose.Schema({
  patientData: {
    type: String,
    required: true
  },
  patientID: {
    type: String,
    required: true,
    unique: true
  },
  patientName: {
    type: String,
    required: true
  },
  referralFrom: String,
  phoneNumber: {
    type: String,
    required: true
  },
  recordID: {
    type: String,
    unique: true
  },
  sultanQaboosMedicineID: {
    type: String,
    required: true
  },
  receivedData: {
    type: Date,
    default: Date.now
  },
  medications: [{
    medicationName: String,
    strength: String,
    dose: String,
    frequency: String,
    duration: String
  }],
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthcareInstitution',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  }
});

module.exports = mongoose.model('PatientRecord', patientRecordSchema);