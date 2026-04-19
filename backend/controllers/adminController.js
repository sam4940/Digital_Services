const HealthcareInstitution = require('../models/HealthcareInstitution');
const StaffReport = require('../models/StaffReport');
const Employee = require('../models/Employee');
const PatientRecord = require('../models/PatientRecord');

exports.addInstitution = async (req, res) => {
  try {
    const { name, arabicName, type, governorate, address, phone, email, sultanQaboosMedicineID } = req.body;

    const institution = new HealthcareInstitution({
      name,
      arabicName,
      type,
      governorate,
      address,
      phone,
      email,
      sultanQaboosMedicineID
    });

    await institution.save();
    res.status(201).json({ message: 'Institution added successfully', institution });
  } catch (error) {
    res.status(500).json({ message: 'Error adding institution', error: error.message });
  }
};

exports.getInstitutions = async (req, res) => {
  try {
    const institutions = await HealthcareInstitution.find({ status: 'active' });
    res.json(institutions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching institutions', error: error.message });
  }
};

exports.updateInstitution = async (req, res) => {
  try {
    const institution = await HealthcareInstitution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'Institution updated', institution });
  } catch (error) {
    res.status(500).json({ message: 'Error updating institution', error: error.message });
  }
};

exports.deleteInstitution = async (req, res) => {
  try {
    await HealthcareInstitution.findByIdAndUpdate(req.params.id, { status: 'inactive' });
    res.json({ message: 'Institution deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting institution', error: error.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await StaffReport.find()
      .populate('employee', 'name employeeID email')
      .populate('institution', 'name governorate')
      .sort({ submissionDate: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

exports.getInstitutionReports = async (req, res) => {
  try {
    const reports = await StaffReport.find({ institution: req.params.institutionId })
      .populate('employee', 'name employeeID email')
      .sort({ submissionDate: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const totalInstitutions = await HealthcareInstitution.countDocuments({ status: 'active' });
    const totalEmployees = await Employee.countDocuments({ status: 'active' });
    const totalReports = await StaffReport.countDocuments();
    const totalPatients = await PatientRecord.countDocuments({ status: 'active' });

    const reports = await StaffReport.find().populate('institution', 'governorate');
    
    const statisticsByGovernorate = {};
    reports.forEach(report => {
      const gov = report.institution?.governorate || 'Unknown';
      if (!statisticsByGovernorate[gov]) {
        statisticsByGovernorate[gov] = {
          medicationAdvice: 0,
          interventions: 0,
          adverseReactions: 0,
          quality: 0
        };
      }
      statisticsByGovernorate[gov].medicationAdvice += report.medicationAdviceReport;
      statisticsByGovernorate[gov].interventions += report.pharmaceuticalInterventionsReport;
      statisticsByGovernorate[gov].adverseReactions += report.adverseDrugReactionsReport;
      statisticsByGovernorate[gov].quality += report.qualityReport;
    });

    res.json({
      totalInstitutions,
      totalEmployees,
      totalReports,
      totalPatients,
      statisticsByGovernorate
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ status: 'active' })
      .populate('institution', 'name governorate');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};