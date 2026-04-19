import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StaffServices() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [institutions, setInstitutions] = useState([]);
  
  // Registration form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeID: '',
    institutionId: ''
  });

  // Report form
  const [reportData, setReportData] = useState({
    employeeID: '',
    institutionId: '',
    medicationAdvice: 0,
    interventions: 0,
    adverseReactions: 0,
    quality: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

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

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: name.includes('medicationAdvice') || name.includes('interventions') || 
              name.includes('adverseReactions') || name.includes('quality') ? 
              parseInt(value) : (name === 'month' || name === 'year' ? parseInt(value) : value)
    }));
  };

  const handleRegisterEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/staff/register', formData);
      setMessage('Employee registered successfully!');
      setFormData({ name: '', email: '', employeeID: '', institutionId: '' });
      setTimeout(() => setIsRegistering(false), 1000);
    } catch (error) {
      setMessage('Error registering employee: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/staff/report', reportData);
      setMessage('Report submitted successfully!');
      setReportData({
        employeeID: '',
        institutionId: '',
        medicationAdvice: 0,
        interventions: 0,
        adverseReactions: 0,
        quality: 0,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      });
    } catch (error) {
      setMessage('Error submitting report: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="staff-services">
      <h1>Staff Services</h1>

      {message && <div className="message">{message}</div>}

      <div className="tabs">
        <button 
          className={`tab-btn ${isRegistering ? 'active' : ''}`}
          onClick={() => setIsRegistering(true)}
        >
          Register Employee
        </button>
        <button 
          className={`tab-btn ${!isRegistering ? 'active' : ''}`}
          onClick={() => setIsRegistering(false)}
        >
          Submit Report
        </button>
      </div>

      {isRegistering ? (
        <div className="form-section">
          <h2>Employee Registration</h2>
          <form onSubmit={handleRegisterEmployee}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleRegistrationChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleRegistrationChange}
              required
            />
            <input
              type="text"
              name="employeeID"
              placeholder="Employee ID"
              value={formData.employeeID}
              onChange={handleRegistrationChange}
              required
            />
            <select
              name="institutionId"
              value={formData.institutionId}
              onChange={handleRegistrationChange}
              required
            >
              <option value="">Select Healthcare Institution</option>
              {institutions.map(inst => (
                <option key={inst._id} value={inst._id}>{inst.name}</option>
              ))}
            </select>
            <button type="submit" className="btn-submit">Register</button>
          </form>
        </div>
      ) : (
        <div className="form-section">
          <h2>Submit Monthly Report</h2>
          <form onSubmit={handleSubmitReport}>
            <input
              type="text"
              name="employeeID"
              placeholder="Employee ID"
              value={reportData.employeeID}
              onChange={handleReportChange}
              required
            />
            <select
              name="institutionId"
              value={reportData.institutionId}
              onChange={handleReportChange}
              required
            >
              <option value="">Select Healthcare Institution</option>
              {institutions.map(inst => (
                <option key={inst._id} value={inst._id}>{inst.name}</option>
              ))}
            </select>
            
            <div className="report-inputs">
              <div>
                <label>Medication Advice Report</label>
                <input
                  type="number"
                  name="medicationAdvice"
                  min="0"
                  value={reportData.medicationAdvice}
                  onChange={handleReportChange}
                  required
                />
              </div>
              <div>
                <label>Pharmaceutical Interventions</label>
                <input
                  type="number"
                  name="interventions"
                  min="0"
                  value={reportData.interventions}
                  onChange={handleReportChange}
                  required
                />
              </div>
              <div>
                <label>Adverse Drug Reactions</label>
                <input
                  type="number"
                  name="adverseReactions"
                  min="0"
                  value={reportData.adverseReactions}
                  onChange={handleReportChange}
                  required
                />
              </div>
              <div>
                <label>Quality Report</label>
                <input
                  type="number"
                  name="quality"
                  min="0"
                  value={reportData.quality}
                  onChange={handleReportChange}
                  required
                />
              </div>
            </div>

            <div className="date-inputs">
              <select name="month" value={reportData.month} onChange={handleReportChange}>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Month {i + 1}</option>
                ))}
              </select>
              <select name="year" value={reportData.year} onChange={handleReportChange}>
                {[...Array(5)].map((_, i) => (
                  <option key={2024 + i} value={2024 + i}>{2024 + i}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-submit">Submit Report</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default StaffServices;