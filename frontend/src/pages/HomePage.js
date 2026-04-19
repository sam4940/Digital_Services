import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('/api/admin/statistics');
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>Pharmaceutical Services Department</h1>
        <p>Dhofar Governorate Program</p>
        <p className="tagline">Enhancing Pharmacy Services Across All Healthcare Institutions</p>
      </div>

      {loading ? (
        <div className="loading">Loading statistics...</div>
      ) : (
        <div className="statistics-section">
          <h2>System Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{statistics?.totalInstitutions || 0}</h3>
              <p>Healthcare Institutions</p>
            </div>
            <div className="stat-card">
              <h3>{statistics?.totalEmployees || 0}</h3>
              <p>Employees</p>
            </div>
            <div className="stat-card">
              <h3>{statistics?.totalReports || 0}</h3>
              <p>Reports Submitted</p>
            </div>
            <div className="stat-card">
              <h3>{statistics?.totalPatients || 0}</h3>
              <p>Patient Records</p>
            </div>
          </div>

          {statistics?.statisticsByGovernorate && (
            <div className="governorate-stats">
              <h3>Statistics by Governorate</h3>
              <div className="stats-table">
                <table>
                  <thead>
                    <tr>
                      <th>Governorate</th>
                      <th>Medication Advice</th>
                      <th>Interventions</th>
                      <th>Adverse Reactions</th>
                      <th>Quality Reports</th>
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
            </div>
          )}
        </div>
      )}

      <div className="services-section">
        <div className="service-box">
          <h3>👨‍⚕️ Staff Services</h3>
          <p>Employees can register, enter reports, and manage their pharmaceutical services data.</p>
        </div>
        <div className="service-box">
          <h3>👤 Patient Services</h3>
          <p>Manage patient records, medications, prescriptions, and medical history.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;