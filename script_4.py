# Create StudentDashboard.jsx with ALL working features
student_dashboard = """import React, { useState, useRef } from 'react';
import QRCodeModal from './QRCodeModal';
import PortfolioModal from './PortfolioModal';
import UploadModal from './UploadModal';
import AnalyticsCharts from './AnalyticsCharts';

function StudentDashboard({ user, appData }) {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Toast notification function
  const showToast = (message, type = 'info') => {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };

  const createToastContainer = () => {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  };

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

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user.name}! 🎓</h1>
        <p className="dashboard-subtitle">
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
                <button className="btn btn--outline btn--sm">
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
    </div>
  );
}

export default StudentDashboard;
"""

# Create EmployerDashboard.jsx
employer_dashboard = """import React, { useState } from 'react';
import QRCodeModal from './QRCodeModal';
import AnalyticsCharts from './AnalyticsCharts';

function EmployerDashboard({ user, appData }) {
  const [showScanner, setShowScanner] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);

  const showToast = (message, type = 'info') => {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  };

  const createToastContainer = () => {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  };

  const handleStartScanner = () => {
    setShowScanner(true);
    setScannerActive(true);
    showToast('📱 Starting QR scanner...', 'info');
    
    // Simulate scanning process
    setTimeout(() => {
      const mockResults = [
        {
          result: 'PASSED',
          candidateName: 'John Smith',
          institution: 'MIT',
          degree: 'Computer Science',
          confidence: 98.7,
          fraudRisk: 'LOW',
          timestamp: new Date().toISOString()
        },
        {
          result: 'FAILED', 
          candidateName: 'Jane Doe',
          institution: 'Unknown University',
          degree: 'Engineering',
          confidence: 23.4,
          fraudRisk: 'HIGH',
          issues: ['Invalid blockchain hash', 'Institution not recognized'],
          timestamp: new Date().toISOString()
        }
      ];
      
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setVerificationResult(result);
      setScannerActive(false);
      
      if (result.result === 'PASSED') {
        showToast('✅ Certificate verification PASSED!', 'success');
      } else {
        showToast('❌ Certificate verification FAILED!', 'error');
      }
    }, 3000);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
    setScannerActive(false);
    setVerificationResult(null);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user.name}! 💼</h1>
        <p className="dashboard-subtitle">
          Professional credential verification for {user.company}
        </p>
      </div>

      {/* Statistics */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card__icon">🔍</div>
          <div className="stat-card__value">47</div>
          <div>Scans Today</div>
          <button className="btn btn--primary" style={{ marginTop: '1rem' }} onClick={handleStartScanner}>
            📱 New Scan
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">✅</div>
          <div className="stat-card__value">156</div>
          <div>Verified Candidates</div>
          <button 
            className="btn btn--primary" 
            style={{ marginTop: '1rem' }}
            onClick={() => setShowAnalytics(true)}
          >
            📊 Analytics
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">🛡️</div>
          <div className="stat-card__value">2</div>
          <div>Fraud Detected</div>
          <button className="btn btn--danger" style={{ marginTop: '1rem' }}>
            🚨 View Alerts
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">📋</div>
          <div className="stat-card__value">98.7%</div>
          <div>Success Rate</div>
          <button className="btn btn--success" style={{ marginTop: '1rem' }}>
            📈 Reports
          </button>
        </div>
      </div>

      {/* Scanner Interface */}
      {showScanner && (
        <div className="modal">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>📱 Certificate Scanner</h3>
              
              {scannerActive && (
                <div>
                  <div style={{
                    width: '300px',
                    height: '300px',
                    margin: '0 auto 1.5rem',
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '12px',
                    border: '3px solid #3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <p>📱 Scanning for QR codes...</p>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '10%',
                      right: '10%',
                      height: '2px',
                      background: '#3b82f6',
                      animation: 'scanLine 2s linear infinite'
                    }} />
                  </div>
                  <p>🎯 Position QR code in the frame</p>
                </div>
              )}
              
              {verificationResult && (
                <div style={{
                  background: verificationResult.result === 'PASSED' 
                    ? 'rgba(16, 185, 129, 0.1)' 
                    : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${verificationResult.result === 'PASSED' ? '#10b981' : '#ef4444'}`,
                  borderRadius: '8px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div className="verification-icon" style={{
                    fontSize: '64px',
                    marginBottom: '1rem',
                    color: verificationResult.result === 'PASSED' ? '#10b981' : '#ef4444'
                  }}>
                    {verificationResult.result === 'PASSED' ? '✅' : '❌'}
                  </div>
                  
                  <h4>{verificationResult.result}</h4>
                  <p><strong>Candidate:</strong> {verificationResult.candidateName}</p>
                  <p><strong>Institution:</strong> {verificationResult.institution}</p>
                  <p><strong>Degree:</strong> {verificationResult.degree}</p>
                  <p><strong>Confidence:</strong> {verificationResult.confidence}%</p>
                  <p><strong>Fraud Risk:</strong> {verificationResult.fraudRisk}</p>
                  
                  {verificationResult.issues && (
                    <div style={{ marginTop: '1rem' }}>
                      <strong>Issues Found:</strong>
                      <ul style={{ textAlign: 'left', marginTop: '0.5rem' }}>
                        {verificationResult.issues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                {!scannerActive && !verificationResult && (
                  <button className="btn btn--primary" onClick={handleStartScanner}>
                    🔄 Scan Again
                  </button>
                )}
                <button className="btn btn--outline" onClick={handleCloseScanner}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Verifications */}
      <div className="dashboard-actions">
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>📋 Recent Verifications</h3>
          
          {user.verificationHistory?.map(verification => (
            <div key={verification.id} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              border: `1px solid ${verification.result === 'PASSED' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4>{verification.candidateName}</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {verification.institution} - {verification.degree}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    background: verification.result === 'PASSED' 
                      ? 'rgba(16, 185, 129, 0.2)' 
                      : 'rgba(239, 68, 68, 0.2)',
                    color: verification.result === 'PASSED' ? '#10b981' : '#ef4444',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {verification.result}
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                    Confidence: {verification.confidence}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Modal */}
      {showAnalytics && (
        <AnalyticsCharts
          data={appData.analyticsData}
          userRole="employer"
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
}

export default EmployerDashboard;
"""

with open('StudentDashboard.jsx', 'w') as f:
    f.write(student_dashboard)
    
with open('EmployerDashboard.jsx', 'w') as f:
    f.write(employer_dashboard)

print("✅ Created dashboard components:")
print("- StudentDashboard.jsx") 
print("- EmployerDashboard.jsx")