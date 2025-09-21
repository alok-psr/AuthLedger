import React from 'react';

function ReportsModal({ onClose }) {
  const mockReports = [
    {
      id: 'REPORT001',
      title: 'Quarterly Verification Trends',
      date: '2024-Q3',
      summary: 'Analyzes verification success rates, common failure reasons, and regional distribution.',
      type: 'Analytics',
    },
    {
      id: 'REPORT002',
      title: 'Fraud Detection Summary',
      date: '2024-09-30',
      summary: 'Overview of detected fraud attempts, AI confidence scores, and prevention measures.',
      type: 'Security',
    },
    {
      id: 'REPORT003',
      title: 'Candidate Credential Audit',
      date: '2024-09-25',
      summary: 'Audit of candidate data integrity and compliance with verification standards.',
      type: 'Compliance',
    },
  ];

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>📈 Verification Reports</h3>
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

          {mockReports.length > 0 ? (
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {mockReports.map(report => (
                <div key={report.id} style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid #10b981',
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
                    background: 'linear-gradient(135deg, #10b981, #059669)'
                  }} />
                  <h4>{report.title}</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{report.summary}</p>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>Date: {report.date} | Type: {report.type}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>No reports available.</p>
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

export default ReportsModal;
