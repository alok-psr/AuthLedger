import React from 'react';

function GovernmentSecurityDashboardModal({ onClose }) {
  const mockSecurityData = {
    totalThreatsDetected: 15,
    activeThreats: 3,
    incidentsResolved: 12,
    lastSecurityScan: '2024-09-20 10:00 AM',
    systemVulnerabilities: 'Low',
  };

  const mockRecentThreats = [
    {
      id: 'THREAT001',
      type: 'Phishing Attempt',
      target: 'Global University',
      status: 'Blocked',
      timestamp: '2024-09-20 09:30 AM',
    },
    {
      id: 'THREAT002',
      type: 'Unauthorized Access',
      target: 'Central Database',
      status: 'Detected',
      timestamp: '2024-09-19 02:00 PM',
    },
    {
      id: 'THREAT003',
      type: 'Malware Infection',
      target: 'Employer Portal',
      status: 'Resolved',
      timestamp: '2024-09-18 11:00 AM',
    },
  ];

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>🛡️ Government Security Dashboard</h3>
            <button onClick={onClose} style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              fontSize: '1.5rem', 
              cursor: 'pointer' 
            }}>
              ×
            </button>
          </div>

          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ marginBottom: '1rem' }}>Security Overview</h4>
            <p><strong>Total Threats Detected:</strong> {mockSecurityData.totalThreatsDetected}</p>
            <p><strong>Active Threats:</strong> {mockSecurityData.activeThreats}</p>
            <p><strong>Incidents Resolved:</strong> {mockSecurityData.incidentsResolved}</p>
            <p><strong>Last Security Scan:</strong> {mockSecurityData.lastSecurityScan}</p>
            <p><strong>System Vulnerabilities:</strong> <span style={{ color: mockSecurityData.systemVulnerabilities === 'Low' ? '#10b981' : '#ef4444' }}>{mockSecurityData.systemVulnerabilities}</span></p>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '1.5rem',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            <h4 style={{ marginBottom: '1rem' }}>Recent Threat Activity</h4>
            {mockRecentThreats.map(threat => (
              <div key={threat.id} style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <p style={{ margin: 0 }}><strong>Type:</strong> {threat.type}</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>Target: {threat.target}</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Status: {threat.status} | Timestamp: {threat.timestamp}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button className="btn btn--primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GovernmentSecurityDashboardModal;
