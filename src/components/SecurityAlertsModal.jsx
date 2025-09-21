import React from 'react';

function SecurityAlertsModal({ onClose }) {
  const mockAlerts = [
    {
      id: 'ALERT001',
      type: 'Fraud Attempt',
      description: 'Attempted verification with invalid blockchain hash.',
      timestamp: '2024-09-20 10:30 AM',
      severity: 'High',
      details: 'Source IP: 192.168.1.10, Certificate ID: CERT_XYZ',
    },
    {
      id: 'ALERT002',
      type: 'System Anomaly',
      description: 'Unusual number of verification requests from a single source.',
      timestamp: '2024-09-19 03:15 PM',
      severity: 'Medium',
      details: 'Source IP: 203.0.113.45, Requests: 500 in 5 minutes',
    },
    {
      id: 'ALERT003',
      type: 'Data Mismatch',
      description: 'Candidate name mismatch during verification.',
      timestamp: '2024-09-18 09:00 AM',
      severity: 'Low',
      details: 'Expected: Rahul Sharma, Found: R. Sharma',
    },
  ];

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>🚨 Security Alerts</h3>
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

          {mockAlerts.length > 0 ? (
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {mockAlerts.map(alert => (
                <div key={alert.id} style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)'
                  }} />
                  <h4>{alert.type} - <span style={{ color: alert.severity === 'High' ? '#ef4444' : alert.severity === 'Medium' ? '#f59e0b' : '#10b981' }}>{alert.severity}</span></h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{alert.description}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Timestamp: {alert.timestamp}</p>
                  {alert.details && <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Details: {alert.details}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>No security alerts at this time.</p>
          )}

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

export default SecurityAlertsModal;
