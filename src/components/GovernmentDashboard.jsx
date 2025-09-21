import React, { useState } from 'react';
import AnalyticsCharts from './AnalyticsCharts';
import ManageInstitutionsModal from './ManageInstitutionsModal';
import GovernmentSecurityDashboardModal from './GovernmentSecurityDashboardModal';
import SystemHealthModal from './SystemHealthModal';
import InstitutionOversightModal from './InstitutionOversightModal';
import FraudMonitoringModal from './FraudMonitoringModal';
import { showToast } from '../utils/toast';

function GovernmentDashboard({ user, appData }) {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showManageInstitutionsModal, setShowManageInstitutionsModal] = useState(false);
  const [showGovernmentSecurityDashboardModal, setShowGovernmentSecurityDashboardModal] = useState(false);
  const [showSystemHealthModal, setShowSystemHealthModal] = useState(false);
  const [showInstitutionOversightModal, setShowInstitutionOversightModal] = useState(false);
  const [showFraudMonitoringModal, setShowFraudMonitoringModal] = useState(false);

  const handleGenerateReport = (reportType) => {
    showToast(`📊 Generating ${reportType} report...`, 'info');
    setTimeout(() => {
      showToast(`✅ ${reportType} report generated successfully!`, 'success');
    }, 2000);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user.name}! 🏛️</h1>
        <p className="dashboard-subtitle">
          System oversight for {user.department}
        </p>
      </div>

      {/* System Statistics */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card__icon">🏫</div>
          <div className="stat-card__value">{user.systemStats?.totalInstitutions || 156}</div>
          <div>Registered Institutions</div>
          <button className="btn btn--primary" style={{ marginTop: '1rem' }} onClick={() => setShowManageInstitutionsModal(true)}>
            🏫 Manage Institutions
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">📜</div>
          <div className="stat-card__value">{user.systemStats?.totalCertificates || 45672}</div>
          <div>Total Certificates</div>
          <button 
            className="btn btn--primary" 
            style={{ marginTop: '1rem' }}
            onClick={() => setShowAnalytics(true)}
          >
            📊 View Analytics
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">🚨</div>
          <div className="stat-card__value">{user.systemStats?.fraudDetected || 23}</div>
          <div>Fraud Detected</div>
          <button className="btn btn--danger" style={{ marginTop: '1rem' }} onClick={() => setShowGovernmentSecurityDashboardModal(true)}>
            🛡️ Security Dashboard
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">🌐</div>
          <div className="stat-card__value">{user.systemStats?.systemIntegrity || 99.8}%</div>
          <div>System Integrity</div>
          <button className="btn btn--success" style={{ marginTop: '1rem' }} onClick={() => setShowSystemHealthModal(true)}>
            ✅ System Health
          </button>
        </div>
      </div>

      {/* Government Actions */}
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
          <h3 style={{ marginBottom: '1.5rem' }}>🎯 System Management</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <button 
              className="btn btn--primary btn--full-width"
              onClick={() => setShowAnalytics(true)}
            >
              📊 System Analytics
            </button>
            <button 
              className="btn btn--success btn--full-width"
              onClick={() => handleGenerateReport('Compliance')}
            >
              📋 Generate Reports
            </button>
            <button className="btn btn--outline btn--full-width" onClick={() => setShowInstitutionOversightModal(true)}>
              🏫 Institution Oversight
            </button>
            <button className="btn btn--danger btn--full-width" onClick={() => setShowFraudMonitoringModal(true)}>
              🚨 Fraud Monitoring
            </button>
          </div>
        </div>

        {/* System Monitoring */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Network Status */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'white'
          }}>
            <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🌐 Network Status
            </h4>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Blockchain Network</span>
                <span style={{ color: '#10b981' }}>✅ Operational</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>API Services</span>
                <span style={{ color: '#10b981' }}>✅ Healthy</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Database</span>
                <span style={{ color: '#10b981' }}>✅ Connected</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Last Update</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Just now</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'white'
          }}>
            <h4 style={{ marginBottom: '1rem' }}>📈 Recent Activity</h4>

            <div style={{ fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ color: '#10b981' }}>✅ Certificate verified</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>MIT - 2 minutes ago</div>
              </div>

              <div style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ color: '#3b82f6' }}>📜 New certificate issued</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Stanford - 5 minutes ago</div>
              </div>

              <div style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ color: '#ef4444' }}>🚨 Fraud attempt blocked</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Unknown source - 10 minutes ago</div>
              </div>

              <div>
                <div style={{ color: '#f59e0b' }}>🏫 New institution registered</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Global Tech University - 1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Modal */}
      {showAnalytics && (
        <AnalyticsCharts
          data={appData.analyticsData}
          userRole="government"
          onClose={() => setShowAnalytics(false)}
        />
      )}

      {showManageInstitutionsModal && (
        <ManageInstitutionsModal
          onClose={() => setShowManageInstitutionsModal(false)}
        />
      )}

      {showGovernmentSecurityDashboardModal && (
        <GovernmentSecurityDashboardModal
          onClose={() => setShowGovernmentSecurityDashboardModal(false)}
        />
      )}

      {showSystemHealthModal && (
        <SystemHealthModal
          onClose={() => setShowSystemHealthModal(false)}
        />
      )}

      {showInstitutionOversightModal && (
        <InstitutionOversightModal
          onClose={() => setShowInstitutionOversightModal(false)}
        />
      )}

      {showFraudMonitoringModal && (
        <FraudMonitoringModal
          onClose={() => setShowFraudMonitoringModal(false)}
        />
      )}
    </div>
  );
}

export default GovernmentDashboard;
