const PatientRecord = require('../models/PatientRecord');

exports.createPatientRecord = async (req, res) => {
  try {
    const {
      patientData,
      patientID,
      patientName,
      referralFrom,
      phoneNumber,
      sultanQaboosMedicineID,
      institutionId,
      medications
    } = req.body;

    const patientRecord = new PatientRecord({
      patientData,
      patientID,
      patientName,
      referralFrom,
      phoneNumber,
      recordID: `REC-${Date.now()}`,
      sultanQaboosMedicineID,
      institution: institutionId,
      medications
    });

    await patientRecord.save();
    res.status(201).json({ message: 'Patient record created', patientRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient record', error: error.message });
  }
};

exports.getPatientRecord = async (req, res) => {
  try {
    const patientRecord = await PatientRecord.findOne({ patientID: req.params.patientID })
      .populate('institution', 'name sultanQaboosMedicineID');
    
    if (!patientRecord) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patientRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient record', error: error.message });
  }
};

exports.updatePatientRecord = async (req, res) => {
  try {
    const patientRecord = await PatientRecord.findOneAndUpdate(
      { patientID: req.params.patientID },
      {
        ...req.body,
        lastUpdated: new Date()
      },
      { new: true }
    );

    res.json({ message: 'Patient record updated', patientRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient record', error: error.message });
  }
};

exports.getInstitutionPatients = async (req, res) => {
  try {
    const patients = await PatientRecord.find({ 
      institution: req.params.institutionId,
      status: 'active'
    }).sort({ lastUpdated: -1 });

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};