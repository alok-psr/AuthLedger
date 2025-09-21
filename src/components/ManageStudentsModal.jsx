import React from 'react';

function ManageStudentsModal({ onClose }) {
  const mockStudents = [
    {
      id: 'S001',
      name: 'Kaavy Aggarwal',
      enrollment: 'ENR12345',
      status: 'Active',
      certificates: 2,
      lastActivity: '2024-09-20',
    },
    {
      id: 'S002',
      name: 'Priya Singh',
      enrollment: 'ENR12346',
      status: 'Active',
      certificates: 1,
      lastActivity: '2024-09-18',
    },
    {
      id: 'S003',
      name: 'Amit Kumar',
      enrollment: 'ENR12347',
      status: 'Graduated',
      certificates: 3,
      lastActivity: '2023-05-10',
    },
  ];

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>📚 Manage Students</h3>
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

          {mockStudents.length > 0 ? (
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Name</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Enrollment</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Certificates</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Last Activity</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map(student => (
                    <tr key={student.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <td style={{ padding: '0.75rem' }}>{student.name}</td>
                      <td style={{ padding: '0.75rem' }}>{student.enrollment}</td>
                      <td style={{ padding: '0.75rem' }}>{student.status}</td>
                      <td style={{ padding: '0.75rem' }}>{student.certificates}</td>
                      <td style={{ padding: '0.75rem' }}>{student.lastActivity}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <button className="btn btn--sm btn--outline" style={{ marginRight: '0.5rem' }}>View</button>
                        <button className="btn btn--sm btn--danger">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>No student records found.</p>
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

export default ManageStudentsModal;
