import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientServices() {
  const [isCreating, setIsCreating] = useState(true);
  const [institutions, setInstitutions] = useState([]);
  
  const [patientForm, setPatientForm] = useState({
    patientData: '',
    patientID: '',
    patientName: '',
    referralFrom: '',
    phoneNumber: '',
    sultanQaboosMedicineID: '',
    institutionId: '',
    medications: [{ medicationName: '', strength: '', dose: '' }]
  });

  const [searchID, setSearchID] = useState('');
  const [patientRecord, setPatientRecord] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const response = await axios.get('/api/staff/institutions');
      setInstitutions(response.data);
    } catch (error) {
      console.error('Error fetching institutions:', error);
    }
  };

  const handlePatientFormChange = (e) => {
    const { name, value } = e.target;
    setPatientForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicationChange = (index, field, value) => {
    const newMeds = [...patientForm.medications];
    newMeds[index][field] = value;
    setPatientForm(prev => ({
      ...prev,
      medications: newMeds
    }));
  };

  const addMedication = () => {
    setPatientForm(prev => ({
      ...prev,
      medications: [...prev.medications, { medicationName: '', strength: '', dose: '' }]
    }));
  };

  const removeMedication = (index) => {
    setPatientForm(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/patient/record', patientForm);
      setMessage('Patient record created successfully!');
      setPatientForm({
        patientData: '',
        patientID: '',
        patientName: '',
        referralFrom: '',
        phoneNumber: '',
        sultanQaboosMedicineID: '',
        institutionId: '',
        medications: [{ medicationName: '', strength: '', dose: '' }]
      });
    } catch (error) {
      setMessage('Error creating record: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSearchPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/patient/record/${searchID}`);
      setPatientRecord(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Patient not found');
      setPatientRecord(null);
    }
  };

  return (
    <div className="patient-services">
      <h1>Patient Services</h1>

      {message && <div className="message">{message}</div>}

      <div className="tabs">
        <button 
          className={`tab-btn ${isCreating ? 'active' : ''}`}
          onClick={() => setIsCreating(true)}
        >
          Create New Record
        </button>
        <button 
          className={`tab-btn ${!isCreating ? 'active' : ''}`}
          onClick={() => setIsCreating(false)}
        >
          Search Patient
        </button>
      </div>

      {isCreating ? (
        <div className="form-section">
          <h2>Create Patient Record</h2>
          <form onSubmit={handleCreateRecord}>
            <div className="form-group">
              <label>Patient Data</label>
              <input
                type="text"
                name="patientData"
                placeholder="Patient Data"
                value={patientForm.patientData}
                onChange={handlePatientFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Patient ID</label>
              <input
                type="text"
                name="patientID"
                placeholder="Patient ID"
                value={patientForm.patientID}
                onChange={handlePatientFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Patient Name</label>
              <input
                type="text"
                name="patientName"
                placeholder="Patient Name"
                value={patientForm.patientName}
                onChange={handlePatientFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Referral From</label>
              <input
                type="text"
                name="referralFrom"
                placeholder="Referral From"
                value={patientForm.referralFrom}
                onChange={handlePatientFormChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={patientForm.phoneNumber}
                onChange={handlePatientFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Sultan Qaboos Hospital ID</label>
              <input
                type="text"
                name="sultanQaboosMedicineID"
                placeholder="Sultan Qaboos Hospital ID"
                value={patientForm.sultanQaboosMedicineID}
                onChange={handlePatientFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Healthcare Institution</label>
              <select
                name="institutionId"
                value={patientForm.institutionId}
                onChange={handlePatientFormChange}
                required
              >
                <option value="">Select Institution</option>
                {institutions.map(inst => (
                  <option key={inst._id} value={inst._id}>{inst.name}</option>
                ))}
              </select>
            </div>

            <div className="medications-section">
              <h3>Medications</h3>
              {patientForm.medications.map((med, index) => (
                <div key={index} className="medication-group">
                  <input
                    type="text"
                    placeholder="Medication Name"
                    value={med.medicationName}
                    onChange={(e) => handleMedicationChange(index, 'medicationName', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Strength/Dose"
                    value={med.strength}
                    onChange={(e) => handleMedicationChange(index, 'strength', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Dose"
                    value={med.dose}
                    onChange={(e) => handleMedicationChange(index, 'dose', e.target.value)}
                  />
                  {patientForm.medications.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeMedication(index)}
                      className="btn-remove"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={addMedication}
                className="btn-add-med"
              >
                Add Medication
              </button>
            </div>

            <button type="submit" className="btn-submit">Create Record</button>
          </form>
        </div>
      ) : (
        <div className="form-section">
          <h2>Search Patient Record</h2>
          <form onSubmit={handleSearchPatient}>
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={searchID}
              onChange={(e) => setSearchID(e.target.value)}
              required
            />
            <button type="submit" className="btn-submit">Search</button>
          </form>

          {patientRecord && (
            <div className="patient-record-display">
              <h3>Patient Information</h3>
              <p><strong>Name:</strong> {patientRecord.patientName}</p>
              <p><strong>Patient ID:</strong> {patientRecord.patientID}</p>
              <p><strong>Phone:</strong> {patientRecord.phoneNumber}</p>
              <p><strong>Referral From:</strong> {patientRecord.referralFrom}</p>
              <p><strong>Record ID:</strong> {patientRecord.recordID}</p>
              <p><strong>Last Updated:</strong> {new Date(patientRecord.lastUpdated).toLocaleString()}</p>
              
              <h4>Medications</h4>
              {patientRecord.medications && patientRecord.medications.map((med, idx) => (
                <div key={idx} className="med-display">
                  <p><strong>Medication:</strong> {med.medicationName}</p>
                  <p><strong>Strength:</strong> {med.strength} | <strong>Dose:</strong> {med.dose}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PatientServices;