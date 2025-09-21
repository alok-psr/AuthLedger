import React, { useState, useRef } from 'react';
import QRCodeModal from './QRCodeModal';
import PortfolioModal from './PortfolioModal';
import UploadModal from './UploadModal';
import AnalyticsCharts from './AnalyticsCharts';
import CertificateDetailsModal from './CertificateDetailsModal';
import { showToast } from '../utils/toast';

function StudentDashboard({ user, appData }) {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificateDetailsModal, setShowCertificateDetailsModal] = useState(false);
  const [selectedCertificateDetails, setSelectedCertificateDetails] = useState(null);

  const handleViewPortfolio = () => {
    setShowPortfolio(true);
    showToast('📜 Opening certificate portfolio...', 'info');
  };

  const handleGenerateQR = (certificate = null) => {
    const cert = certificate || (user.certificates && user.certificates[0]);
    if (cert) {
      setSelectedCertificate(cert);
      setShowQRModal(true);
      showToast('📱 Generating QR code...', 'info');
    } else {
      showToast('❌ No certificates available for QR generation', 'error');
    }
  };

  const handleUploadCertificate = () => {
    setShowUploadModal(true);
    showToast('📤 Opening upload interface...', 'info');
  };

  const handleDownloadCertificate = (certificate) => {
    // Simulate PDF download
    showToast(`📄 Downloading ${certificate.degree} certificate...`, 'info');
    setTimeout(() => {
      showToast('✅ Certificate downloaded successfully!', 'success');
    }, 2000);
  };

  const handleViewDetails = (cert) => {
    setSelectedCertificateDetails(cert);
    setShowCertificateDetailsModal(true);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user.name}! 🎓</h1>
        <p className="dashboard-subtitle">
          Enrollment Number: {user.enrollmentNumber} <br />
          Manage your professional certificate portfolio with blockchain security
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-stats">
        <div className="stat-card" onClick={handleViewPortfolio} style={{ cursor: 'pointer' }}>
          <div className="stat-card__icon">📜</div>
          <div className="stat-card__value">{user.certificates?.length || 0}</div>
          <div>Total Certificates</div>
          <button className="btn btn--primary" style={{ marginTop: '1rem' }}>
            👁️ View Portfolio
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">✅</div>
          <div className="stat-card__value">
            {user.certificates?.filter(c => c.status === 'verified').length || 0}
          </div>
          <div>Verified Certificates</div>
          <button 
            className="btn btn--primary" 
            style={{ marginTop: '1rem' }}
            onClick={() => handleGenerateQR()}
          >
            📱 Generate QR
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">🔐</div>
          <div className="stat-card__value">
            {user.certificates?.reduce((sum, c) => sum + (c.verificationCount || 0), 0) || 0}
          </div>
          <div>Total Verifications</div>
          <button 
            className="btn btn--primary" 
            style={{ marginTop: '1rem' }}
            onClick={() => setShowAnalytics(true)}
          >
            📊 View Analytics
          </button>
        </div>

        <div className="stat-card" onClick={handleUploadCertificate} style={{ cursor: 'pointer' }}>
          <div className="stat-card__icon">📤</div>
          <div className="stat-card__value">Upload</div>
          <div>Add New Certificate</div>
          <button className="btn btn--success" style={{ marginTop: '1rem' }}>
            ➕ Upload Now
          </button>
        </div>
      </div>

      {/* Recent Certificates */}
      <div className="dashboard-actions">
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3>🏆 Recent Certificates</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn--outline btn--sm" onClick={handleViewPortfolio}>
                View All
              </button>
              <button className="btn btn--primary btn--sm" onClick={handleUploadCertificate}>
                Add New
              </button>
            </div>
          </div>

          {user.certificates && user.certificates.slice(0, 2).map(cert => (
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
                background: 'linear-gradient(135deg, #d97706, #3b82f6)'
              }} />

              <h4 style={{ marginBottom: '0.5rem' }}>{cert.degree}</h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0' }}>
                🏫 {cert.institution} • 📅 {cert.year}
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0' }}>
                🏆 {cert.grade} • ✅ {cert.status.toUpperCase()}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn btn--primary btn--sm"
                  onClick={() => handleGenerateQR(cert)}
                >
                  📱 QR Code
                </button>
                <button 
                  className="btn btn--outline btn--sm"
                  onClick={() => handleDownloadCertificate(cert)}
                >
                  📄 Download
                </button>
                <button className="btn btn--outline btn--sm"
                  onClick={() => handleViewDetails(cert)}
                >
                  👁️ View Details
                </button>
              </div>
            </div>
          ))}

          {(!user.certificates || user.certificates.length === 0) && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              <p>No certificates uploaded yet.</p>
              <button className="btn btn--primary" onClick={handleUploadCertificate}>
                📤 Upload Your First Certificate
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showPortfolio && (
        <PortfolioModal
          certificates={user.certificates}
          onClose={() => setShowPortfolio(false)}
          onGenerateQR={(cert) => {
            setShowPortfolio(false);
            handleGenerateQR(cert);
          }}
          onDownload={handleDownloadCertificate}
        />
      )}

      {showQRModal && (
        <QRCodeModal
          certificate={selectedCertificate}
          onClose={() => setShowQRModal(false)}
        />
      )}

      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false);
            showToast('🎉 Certificate uploaded successfully!', 'success');
          }}
        />
      )}

      {showAnalytics && (
        <AnalyticsCharts
          data={appData.analyticsData}
          userRole="student"
          onClose={() => setShowAnalytics(false)}
        />
      )}

      {showCertificateDetailsModal && (
        <CertificateDetailsModal
          certificate={selectedCertificateDetails}
          onClose={() => setShowCertificateDetailsModal(false)}
        />
      )}
    </div>
  );
}

export default StudentDashboard;

