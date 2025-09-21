import React from 'react';

function CertificateDetailsModal({ certificate, onClose }) {
  if (!certificate) return null;

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>📜 Certificate Details</h3>
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
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '1.5rem'
          }}>
            <p><strong>ID:</strong> {certificate.id}</p>
            <p><strong>Student Name:</strong> {certificate.studentName}</p>
            <p><strong>Institution:</strong> {certificate.institution}</p>
            <p><strong>Degree:</strong> {certificate.degree}</p>
            <p><strong>Year:</strong> {certificate.year}</p>
            <p><strong>Grade:</strong> {certificate.grade}</p>
            <p><strong>Status:</strong> {certificate.status}</p>
            <p><strong>Blockchain Hash:</strong> {certificate.blockchainHash}</p>
            <p><strong>QR Data:</strong> {certificate.qrData}</p>
            <p><strong>Upload Date:</strong> {certificate.uploadDate}</p>
            <p><strong>Verification Count:</strong> {certificate.verificationCount}</p>
            <p><strong>AI Confidence:</strong> {certificate.aiConfidence}%</p>
            <p><strong>Fraud Risk:</strong> {certificate.fraudRisk}</p>
            <p><strong>File Size:</strong> {certificate.fileSize}</p>
            <p><strong>File Type:</strong> {certificate.fileType}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn--primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateDetailsModal;
