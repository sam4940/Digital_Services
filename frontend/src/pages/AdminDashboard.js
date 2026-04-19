import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('statistics');
  const [statistics, setStatistics] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [reports, setReports] = useState([]);
  const [newInstitution, setNewInstitution] = useState({
    name: '',
    arabicName: '',
    type: 'Hospital',
    governorate: '',
    address: '',
    phone: '',
    email: '',
    sultanQaboosMedicineID: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('adminToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const [statsRes, instRes, empRes, repRes] = await Promise.all([
        axios.get('/api/admin/statistics', config),
        axios.get('/api/admin/institutions', config),
        axios.get('/api/admin/employees', config),
        axios.get('/api/admin/reports', config)
      ]);

      setStatistics(statsRes.data);
      setInstitutions(instRes.data);
      setEmployees(empRes.data);
      setReports(repRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleAddInstitution = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.post('/api/admin/institutions', newInstitution, config);
      setMessage('Institution added successfully!');
      setNewInstitution({
        name: '',
        arabicName: '',
        type: 'Hospital',
        governorate: '',
        address: '',
        phone: '',
        email: '',
        sultanQaboosMedicineID: ''
      });
      fetchDashboardData();
    } catch (error) {
      setMessage('Error adding institution: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Administration Dashboard</h1>
      <p className="dashboard-subtitle">Pharmaceutical Services Department - Dhofar Governorate</p>

      {message && <div className="message">{message}</div>}

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </button>
        <button 
          className={`tab ${activeTab === 'institutions' ? 'active' : ''}`}
          onClick={() => setActiveTab('institutions')}
        >
          Healthcare Institutions
        </button>
        <button 
          className={`tab ${activeTab === 'employees' ? 'active' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          Employees
        </button>
        <button 
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'statistics' && statistics && (
          <div className="statistics-panel">
            <div className="stat-card">
              <h3>{statistics.totalInstitutions}</h3>
              <p>Healthcare Institutions</p>
            </div>
            <div className="stat-card">
              <h3>{statistics.totalEmployees}</h3>
              <p>Employees</p>
            </div>
            <div className="stat-card">
              <h3>{statistics.totalReports}</h3>
              <p>Reports Submitted</p>
            </div>
            <div className="stat-card">
              <h3>{statistics.totalPatients}</h3>
              <p>Patient Records</p>
            </div>

            {statistics.statisticsByGovernorate && (
              <div className="governorate-table">
                <h3>Governorate Statistics</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Governorate</th>
                      <th>Medication Advice</th>
                      <th>Interventions</th>
                      <th>Adverse Reactions</th>
                      <th>Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(statistics.statisticsByGovernorate).map(([gov, stats]) => (
                      <tr key={gov}>
                        <td>{gov}</td>
                        <td>{stats.medicationAdvice}</td>
                        <td>{stats.interventions}</td>
                        <td>{stats.adverseReactions}</td>
                        <td>{stats.quality}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'institutions' && (
          <div className="institutions-panel">
            <h2>Healthcare Institutions Management</h2>
            <form onSubmit={handleAddInstitution} className="add-institution-form">
              <input
                type="text"
                placeholder="Institution Name"
                value={newInstitution.name}
                onChange={(e) => setNewInstitution({...newInstitution, name: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Arabic Name"
                value={newInstitution.arabicName}
                onChange={(e) => setNewInstitution({...newInstitution, arabicName: e.target.value})}
              />
              <select
                value={newInstitution.type}
                onChange={(e) => setNewInstitution({...newInstitution, type: e.target.value})}
              >
                <option value="Hospital">Hospital</option>
                <option value="Health Center">Health Center</option>
                <option value="Clinic">Clinic</option>
              </select>
              <input
                type="text"
                placeholder="Governorate"
                value={newInstitution.governorate}
                onChange={(e) => setNewInstitution({...newInstitution, governorate: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={newInstitution.address}
                onChange={(e) => setNewInstitution({...newInstitution, address: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newInstitution.phone}
                onChange={(e) => setNewInstitution({...newInstitution, phone: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                value={newInstitution.email}
                onChange={(e) => setNewInstitution({...newInstitution, email: e.target.value})}
              />
              <input
                type="text"
                placeholder="Sultan Qaboos Medicine ID"
                value={newInstitution.sultanQaboosMedicineID}
                onChange={(e) => setNewInstitution({...newInstitution, sultanQaboosMedicineID: e.target.value})}
              />
              <button type="submit" className="btn-submit">Add Institution</button>
            </form>

            <h3>Active Institutions</h3>
            <div className="institutions-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Governorate</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {institutions.map(inst => (
                    <tr key={inst._id}>
                      <td>{inst.name}</td>
                      <td>{inst.type}</td>
                      <td>{inst.governorate}</td>
                      <td>{inst.phone}</td>
                      <td><span className="badge active">{inst.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="employees-panel">
            <h2>Registered Employees</h2>
            <div className="employees-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Employee ID</th>
                    <th>Email</th>
                    <th>Institution</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp._id}>
                      <td>{emp.name}</td>
                      <td>{emp.employeeID}</td>
                      <td>{emp.email}</td>
                      <td>{emp.institution?.name}</td>
                      <td><span className="badge active">{emp.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-panel">
            <h2>Submitted Reports</h2>
            <div className="reports-table">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Institution</th>
                    <th>Medication Advice</th>
                    <th>Interventions</th>
                    <th>Adverse Reactions</th>
                    <th>Quality</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(rep => (
                    <tr key={rep._id}>
                      <td>{rep.employee?.name}</td>
                      <td>{rep.institution?.name}</td>
                      <td>{rep.medicationAdviceReport}</td>
                      <td>{rep.pharmaceuticalInterventionsReport}</td>
                      <td>{rep.adverseDrugReactionsReport}</td>
                      <td>{rep.qualityReport}</td>
                      <td>{new Date(rep.submissionDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;