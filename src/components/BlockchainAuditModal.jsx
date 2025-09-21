import React from 'react';

function BlockchainAuditModal({ onClose }) {
  const mockAuditLogs = [
    {
      id: 'AUDIT001',
      timestamp: '2024-09-20 11:00 AM',
      action: 'Certificate Issued',
      details: 'Certificate ID: CERT_GU_1700000000000, Issued by: Global University',
      status: 'Success',
    },
    {
      id: 'AUDIT002',
      timestamp: '2024-09-20 10:30 AM',
      action: 'Blockchain Sync',
      details: 'Network synchronization completed.',
      status: 'Success',
    },
    {
      id: 'AUDIT003',
      timestamp: '2024-09-19 03:15 PM',
      action: 'Fraud Attempt Detected',
      details: 'Attempted verification with invalid hash from IP: 192.168.1.10',
      status: 'Blocked',
    },
    {
      id: 'AUDIT004',
      timestamp: '2024-09-18 09:00 AM',
      action: 'System Health Check',
      details: 'Daily system integrity check.',
      status: 'Success',
    },
  ];

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>🔗 Blockchain Audit Log</h3>
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

          {mockAuditLogs.length > 0 ? (
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {mockAuditLogs.map(log => (
                <div key={log.id} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
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
                    background: log.status === 'Success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'
                  }} />
                  <h4>{log.action}</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{log.details}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Timestamp: {log.timestamp} | Status: {log.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>No audit logs found.</p>
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

export default BlockchainAuditModal;
