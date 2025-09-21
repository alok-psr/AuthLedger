import React from 'react';

function ManageInstitutionsModal({ onClose }) {
  const mockInstitutions = [
    {
      id: 'INST001',
      name: 'Global University',
      type: 'University',
      status: 'Active',
      certificatesIssued: 12500,
      lastAudit: '2024-08-01',
    },
    {
      id: 'INST002',
      name: 'Tech Institute of India',
      type: 'College',
      status: 'Active',
      certificatesIssued: 8700,
      lastAudit: '2024-07-15',
    },
    {
      id: 'INST003',
      name: 'National Skill Development Center',
      type: 'Vocational',
      status: 'Active',
      certificatesIssued: 3200,
      lastAudit: '2024-09-01',
    },
  ];

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '900px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>🏫 Manage Registered Institutions</h3>
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

          {mockInstitutions.length > 0 ? (
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Name</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Type</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Certificates Issued</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Last Audit</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInstitutions.map(inst => (
                    <tr key={inst.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td style={{ padding: '0.75rem' }}>{inst.name}</td>
                      <td style={{ padding: '0.75rem' }}>{inst.type}</td>
                      <td style={{ padding: '0.75rem' }}>{inst.status}</td>
                      <td style={{ padding: '0.75rem' }}>{inst.certificatesIssued}</td>
                      <td style={{ padding: '0.75rem' }}>{inst.lastAudit}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <button className="btn btn--sm btn--outline" style={{ marginRight: '0.5rem' }}>View</button>
                        <button className="btn btn--sm btn--danger">Deactivate</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>No institutions found.</p>
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

export default ManageInstitutionsModal;
