import React, { useState } from 'react';
import QRCodeModal from './QRCodeModal';
import AnalyticsCharts from './AnalyticsCharts';
import SecurityAlertsModal from './SecurityAlertsModal';
import ReportsModal from './ReportsModal';
import { showToast } from '../utils/toast';

function EmployerDashboard({ user, appData }) {
  const [showScanner, setShowScanner] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [showSecurityAlertsModal, setShowSecurityAlertsModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);

  const handleStartScanner = () => {
    setShowScanner(true);
    setScannerActive(true);
    showToast('📱 Starting QR scanner...', 'info');

    // Simulate scanning process
    setTimeout(() => {
      const mockResults = [
        {
          result: 'PASSED',
          candidateName: 'Aman Gupta',
          institution: 'BPIT',
          degree: 'Computer Science',
          confidence: 98.7,
          fraudRisk: 'LOW',
          timestamp: new Date().toISOString()
        },
        {
          result: 'FAILED', 
          candidateName: 'Priya Sukla',
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
          <button className="btn btn--danger" style={{ marginTop: '1rem' }} onClick={() => setShowSecurityAlertsModal(true)}>
            🚨 View Alerts
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">📋</div>
          <div className="stat-card__value">98.7%</div>
          <div>Success Rate</div>
          <button className="btn btn--success" style={{ marginTop: '1rem' }} onClick={() => setShowReportsModal(true)}>
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

      {showSecurityAlertsModal && (
        <SecurityAlertsModal
          onClose={() => setShowSecurityAlertsModal(false)}
        />
      )}

      {showReportsModal && (
        <ReportsModal
          onClose={() => setShowReportsModal(false)}
        />
      )}
    </div>
  );
}

export default EmployerDashboard;
