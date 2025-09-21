import React from 'react';

function FraudMonitoringModal({ onClose }) {
  const mockFraudData = [
    {
      id: 'FRAUD001',
      type: 'Identity Theft',
      description: 'Attempted certificate issuance using stolen student ID.',
      detectionDate: '2024-09-20',
      status: 'Blocked',
      riskScore: 95,
    },
    {
      id: 'FRAUD002',
      type: 'Forged Document',
      description: 'Upload of a digitally altered certificate.',
      detectionDate: '2024-09-18',
      status: 'Under Investigation',
      riskScore: 88,
    },
    {
      id: 'FRAUD003',
      type: 'Impersonation',
      description: 'Multiple login attempts from unusual locations for a single account.',
      detectionDate: '2024-09-15',
      status: 'Resolved',
      riskScore: 70,
    },
  ];

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>🚨 Fraud Monitoring Dashboard</h3>
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

          {mockFraudData.length > 0 ? (
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {mockFraudData.map(fraud => (
                <div key={fraud.id} style={{
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
                  <h4>{fraud.type} - <span style={{ color: fraud.riskScore > 90 ? '#ef4444' : fraud.riskScore > 80 ? '#f59e0b' : '#10b981' }}>Risk Score: {fraud.riskScore}</span></h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{fraud.description}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Detection Date: {fraud.detectionDate} | Status: {fraud.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>No fraud incidents detected.</p>
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

export default FraudMonitoringModal;
