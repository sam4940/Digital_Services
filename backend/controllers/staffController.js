const Employee = require('../models/Employee');
const HealthcareInstitution = require('../models/HealthcareInstitution');
const StaffReport = require('../models/StaffReport');

exports.registerEmployee = async (req, res) => {
  try {
    const { name, email, employeeID, institutionId } = req.body;

    const existingEmployee = await Employee.findOne({ 
      $or: [{ email }, { employeeID }] 
    });

    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already registered' });
    }

    const employee = new Employee({
      name,
      email,
      employeeID,
      institution: institutionId
    });

    await employee.save();
    res.status(201).json({ message: 'Employee registered successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error registering employee', error: error.message });
  }
};

exports.submitReport = async (req, res) => {
  try {
    const { employeeID, institutionId, medicationAdvice, interventions, adverseReactions, quality, month, year } = req.body;

    const employee = await Employee.findOne({ employeeID });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const report = new StaffReport({
      employee: employee._id,
      institution: institutionId,
      medicationAdviceReport: medicationAdvice,
      pharmaceuticalInterventionsReport: interventions,
      adverseDrugReactionsReport: adverseReactions,
      qualityReport: quality,
      month,
      year
    });

    await report.save();
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting report', error: error.message });
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

exports.getEmployeeReports = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeID: req.params.employeeID });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const reports = await StaffReport.find({ employee: employee._id })
      .populate('institution', 'name governorate')
      .sort({ submissionDate: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};