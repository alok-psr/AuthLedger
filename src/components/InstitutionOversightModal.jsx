import React from 'react';

function InstitutionOversightModal({ onClose }) {
  const mockOversightData = [
    {
      id: 'OVERSIGHT001',
      institution: 'Global University',
      lastReview: '2024-09-10',
      complianceScore: 98,
      openIssues: 1,
      status: 'Compliant',
    },
    {
      id: 'OVERSIGHT002',
      institution: 'Tech Institute of India',
      lastReview: '2024-08-25',
      complianceScore: 95,
      openIssues: 2,
      status: 'Compliant',
    },
    {
      id: 'OVERSIGHT003',
      institution: 'National Skill Development Center',
      lastReview: '2024-09-01',
      complianceScore: 88,
      openIssues: 5,
      status: 'Under Review',
    },
  ];

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '900px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>🏫 Institution Oversight</h3>
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

          {mockOversightData.length > 0 ? (
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Institution</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Last Review</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Compliance Score</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Open Issues</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOversightData.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td style={{ padding: '0.75rem' }}>{item.institution}</td>
                      <td style={{ padding: '0.75rem' }}>{item.lastReview}</td>
                      <td style={{ padding: '0.75rem' }}>{item.complianceScore}%</td>
                      <td style={{ padding: '0.75rem' }}>{item.openIssues}</td>
                      <td style={{ padding: '0.75rem' }}>{item.status}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <button className="btn btn--sm btn--outline" style={{ marginRight: '0.5rem' }}>View</button>
                        <button className="btn btn--sm btn--primary">Action</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>No oversight data found.</p>
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

export default InstitutionOversightModal;
