import React, { useState } from 'react';
import AnalyticsCharts from './AnalyticsCharts';
import UploadModal from './UploadModal';
import BlockchainStatusModal from './BlockchainStatusModal';
import ManageStudentsModal from './ManageStudentsModal';
import BlockchainAuditModal from './BlockchainAuditModal';
import { showToast } from '../utils/toast';

function CollegeDashboard({ user, appData, onIssueCertificate }) {
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showIssueCert, setShowIssueCert] = useState(false);
  const [bulkUploadProgress, setBulkUploadProgress] = useState(0);
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [showBlockchainStatusModal, setShowBlockchainStatusModal] = useState(false);
  const [showManageStudentsModal, setShowManageStudentsModal] = useState(false);
  const [showBlockchainAuditModal, setShowBlockchainAuditModal] = useState(false);

  const handleBulkUpload = (files) => {
    setBulkProcessing(true);
    setBulkUploadProgress(0);
    showToast('📦 Starting bulk certificate processing...', 'info');

    // Simulate bulk processing with progress
    const interval = setInterval(() => {
      setBulkUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBulkProcessing(false);
          setShowBulkUpload(false);
          showToast('🎉 Bulk processing completed successfully!', 'success');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleIssueCertificate = (certData) => {
    onIssueCertificate(certData);
    showToast('📜 Issuing new certificate...', 'info');
    setTimeout(() => {
      showToast('✅ Certificate issued and recorded on blockchain!', 'success');
      setShowIssueCert(false);
    }, 2000);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user.name}! 🏫</h1>
        <p className="dashboard-subtitle">
          Certificate management for {user.institution}
        </p>
      </div>

      {/* Statistics */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card__icon">📜</div>
          <div className="stat-card__value">1,247</div>
          <div>Certificates Issued</div>
          <button 
            className="btn btn--primary" 
            style={{ marginTop: '1rem' }}
            onClick={() => setShowIssueCert(true)}
          >
            📝 Issue New
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">⛓️</div>
          <div className="stat-card__value">98.2%</div>
          <div>Blockchain Success</div>
          <button className="btn btn--success" style={{ marginTop: '1rem' }} onClick={() => setShowBlockchainStatusModal(true)}>
            🔗 Blockchain Status
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">👥</div>
          <div className="stat-card__value">2,450</div>
          <div>Active Students</div>
          <button className="btn btn--primary" style={{ marginTop: '1rem' }} onClick={() => setShowManageStudentsModal(true)}>
            📚 Manage Students
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">📦</div>
          <div className="stat-card__value">Bulk</div>
          <div>Batch Processing</div>
          <button 
            className="btn btn--primary" 
            style={{ marginTop: '1rem' }}
            onClick={() => setShowBulkUpload(true)}
          >
            📦 Bulk Upload
          </button>
        </div>
      </div>

      {/* Main Actions */}
      <div className="dashboard-actions">
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: 'white',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>🚀 Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <button 
              className="btn btn--primary btn--full-width"
              onClick={() => setShowIssueCert(true)}
            >
              📝 Issue Single Certificate
            </button>
            <button 
              className="btn btn--success btn--full-width"
              onClick={() => setShowBulkUpload(true)}
            >
              📦 Bulk Certificate Upload
            </button>
            <button 
              className="btn btn--outline btn--full-width"
              onClick={() => setShowAnalytics(true)}
            >
              📊 View Analytics
            </button>
            <button className="btn btn--outline btn--full-width" onClick={() => setShowBlockchainAuditModal(true)}>
              🔗 Blockchain Audit
            </button>
          </div>
        </div>

        {/* Recent Certificates */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>📋 Recent Certificates Issued</h3>

          {user.issuedCertificates?.map(cert => (
            <div key={cert.id} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(135deg, #0f766e, #10b981)'
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4>{cert.studentName}</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{cert.degree}</p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
                    Issued: {cert.issueDate}
                  </p>
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#10b981',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {cert.status.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Issuance Modal */}
      {showIssueCert && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div style={{ padding: '2rem', color: 'white' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>📝 Issue New Certificate</h3>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleIssueCertificate(Object.fromEntries(formData));
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Student Name</label>
                  <input name="studentName" className="form-control" required placeholder="Enter student name" />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Student ID</label>
                  <input name="studentId" className="form-control" required placeholder="Enter student ID" />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Degree/Certificate</label>
                  <input name="degree" className="form-control" required placeholder="e.g. Bachelor of Science" />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Specialization</label>
                  <input name="specialization" className="form-control" placeholder="e.g. Computer Science" />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">CGPA</label>
                  <input name="cgpa" type="number" step="0.01" className="form-control" placeholder="e.g. 8.5" />
                </div>

                

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="form-label">Year</label>
                    <select name="year" className="form-control" required>
                      <option value="">Select Year</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Grade</label>
                    <select name="grade" className="form-control" required>
                      <option value="">Select Grade</option>
                      <option value="First Class Honors">First Class Honors</option>
                      <option value="Second Class Honors">Second Class Honors</option>
                      <option value="Third Class">Third Class</option>
                      <option value="Pass">Pass</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
                  <button type="button" className="btn btn--outline" onClick={() => setShowIssueCert(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--primary">
                    📜 Issue Certificate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: '700px' }}>
            <div style={{ padding: '2rem', color: 'white' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>📦 Bulk Certificate Upload</h3>

              {!bulkProcessing ? (
                <div>
                  <p style={{ marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Upload CSV or Excel files with student certificate data for batch processing.
                  </p>

                  <div style={{
                    border: '2px dashed rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    background: 'rgba(59, 130, 246, 0.05)',
                    cursor: 'pointer'
                  }} onClick={() => document.getElementById('bulk-file-input').click()}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                    <p>Drop CSV/Excel files here or click to browse</p>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                      Supports .csv, .xlsx, .xls files
                    </p>
                  </div>

                  <input
                    id="bulk-file-input"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    multiple
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        handleBulkUpload(Array.from(e.target.files));
                      }
                    }}
                  />

                  <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>📋 CSV Format Requirements:</h4>
                    <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                      Required columns: student_name, student_id, degree, specialization, year, grade
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                  <h4>Processing Bulk Upload...</h4>
                  <p style={{ marginBottom: '2rem' }}>Processing {bulkUploadProgress}% complete</p>

                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      width: `${bulkUploadProgress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6, #10b981)',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>

                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Please wait while we process your certificates and record them on the blockchain...
                  </p>
                </div>
              )}

              {!bulkProcessing && (
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
                  <button className="btn btn--outline" onClick={() => setShowBulkUpload(false)}>
                    Close
                  </button>
                  <button className="btn btn--success" onClick={() => document.getElementById('bulk-file-input').click()}>
                    📁 Select Files
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && (
        <AnalyticsCharts
          data={appData.analyticsData}
          userRole="college"
          onClose={() => setShowAnalytics(false)}
        />
      )}

      {showBlockchainStatusModal && (
        <BlockchainStatusModal
          onClose={() => setShowBlockchainStatusModal(false)}
        />
      )}

      {showManageStudentsModal && (
        <ManageStudentsModal
          onClose={() => setShowManageStudentsModal(false)}
        />
      )}

      {showBlockchainAuditModal && (
        <BlockchainAuditModal
          onClose={() => setShowBlockchainAuditModal(false)}
        />
      )}
    </div>
  );
}

export default CollegeDashboard;
