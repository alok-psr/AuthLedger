import React from 'react';

function PortfolioModal({ certificates, onClose, onGenerateQR, onDownload }) {
  if (!certificates || certificates.length === 0) {
    return (
      <div className="modal">
        <div className="modal-content" style={{ maxWidth: '600px' }}>
          <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>📜 Certificate Portfolio</h3>
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
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              No certificates found in your portfolio.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '900px', maxHeight: '80vh', overflow: 'auto' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>📜 Certificate Portfolio ({certificates.length})</h3>
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
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {certificates.map(cert => (
              <div key={cert.id} style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: cert.status === 'verified' 
                    ? 'linear-gradient(135deg, #10b981, #3b82f6)' 
                    : 'linear-gradient(135deg, #f59e0b, #ef4444)'
                }} />

                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  background: cert.status === 'verified' 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : 'rgba(245, 158, 11, 0.2)',
                  color: cert.status === 'verified' ? '#10b981' : '#f59e0b',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  {cert.status.toUpperCase()}
                </div>

                <h4 style={{ marginBottom: '1rem' }}>{cert.degree}</h4>

                <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  <p style={{ margin: '0.25rem 0' }}>🏫 {cert.institution}</p>
                  <p style={{ margin: '0.25rem 0' }}>📅 {cert.year} • 🏆 {cert.grade}</p>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '0.75rem', 
                  marginBottom: '1rem',
                  fontSize: '0.75rem'
                }}>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>AI Confidence</div>
                    <div style={{ color: '#10b981', fontWeight: 'bold' }}>{cert.aiConfidence}%</div>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Verifications</div>
                    <div style={{ color: '#3b82f6', fontWeight: 'bold' }}>{cert.verificationCount}</div>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Fraud Risk</div>
                    <div style={{ 
                      color: cert.fraudRisk === 'LOW' ? '#10b981' : 
                            cert.fraudRisk === 'MEDIUM' ? '#f59e0b' : '#ef4444',
                      fontWeight: 'bold' 
                    }}>
                      {cert.fraudRisk}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Upload Date</div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{cert.uploadDate}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button 
                    className="btn btn--primary btn--sm"
                    onClick={() => onGenerateQR(cert)}
                  >
                    📱 Generate QR
                  </button>
                  <button 
                    className="btn btn--outline btn--sm"
                    onClick={() => onDownload && onDownload(cert)}
                  >
                    📄 Download
                  </button>
                  <button className="btn btn--outline btn--sm">
                    👁️ View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioModal;
