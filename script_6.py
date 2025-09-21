# Create QRCodeModal.jsx
qr_modal = """import React, { useRef, useEffect } from 'react';

function QRCodeModal({ certificate, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (certificate && canvasRef.current && window.QRCode) {
      try {
        window.QRCode.toCanvas(canvasRef.current, certificate.qrData, {
          width: 256,
          height: 256,
          color: {
            dark: '#1e3a8a',
            light: '#ffffff'
          }
        }, (error) => {
          if (error) {
            console.error('QR Code generation error:', error);
            showToast('❌ Error generating QR code', 'error');
          } else {
            showToast('✅ QR Code generated successfully!', 'success');
          }
        });
      } catch (error) {
        console.error('QR Code library error:', error);
        showToast('❌ QR Code library not available', 'error');
      }
    }
  }, [certificate]);

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

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `certificate-${certificate.id}-qr.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
      showToast('📱 QR Code downloaded successfully!', 'success');
    }
  };

  if (!certificate) return null;

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>📱 Certificate QR Code</h3>
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
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            display: 'inline-block',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <canvas ref={canvasRef} />
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '1rem',
            borderRadius: '8px',
            borderLeft: '4px solid #3b82f6',
            marginBottom: '1.5rem',
            textAlign: 'left'
          }}>
            <h4 style={{ marginBottom: '0.5rem' }}>{certificate.degree}</h4>
            <p style={{ margin: '0.25rem 0', color: 'rgba(255, 255, 255, 0.8)' }}>
              👤 Student: {certificate.studentName}
            </p>
            <p style={{ margin: '0.25rem 0', color: 'rgba(255, 255, 255, 0.8)' }}>
              🏫 Institution: {certificate.institution}
            </p>
            <p style={{ margin: '0.25rem 0', color: 'rgba(255, 255, 255, 0.8)' }}>
              📅 Year: {certificate.year}
            </p>
            <p style={{ margin: '0.25rem 0', color: 'rgba(255, 255, 255, 0.8)' }}>
              🏆 Grade: {certificate.grade}
            </p>
            <p style={{ margin: '0.25rem 0', color: 'rgba(255, 255, 255, 0.8)' }}>
              🔗 Hash: {certificate.blockchainHash?.substring(0, 20)}...
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn--primary" onClick={handleDownload}>
              📱 Download QR Code
            </button>
            <button className="btn btn--outline" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeModal;
"""

# Create PortfolioModal.jsx
portfolio_modal = """import React from 'react';

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
"""

# Create UploadModal.jsx
upload_modal = """import React, { useState, useCallback } from 'react';

function UploadModal({ onClose, onSuccess }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

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

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }, []);

  const handleFiles = (files) => {
    const file = files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        showToast('❌ Please select a PDF, JPG, or PNG file', 'error');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        showToast('❌ File size must be less than 10MB', 'error');
        return;
      }

      setUploadedFile(file);
      setUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            showToast('🎉 Certificate uploaded successfully!', 'success');
            setTimeout(() => {
              if (onSuccess) onSuccess(file);
            }, 1500);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      showToast(`📤 Uploading ${file.name}...`, 'info');
    }
  };

  const onButtonClick = () => {
    document.getElementById('file-input')?.click();
  };

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>📤 Upload Certificate</h3>
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

          {!uploading && !uploadedFile ? (
            <>
              <div
                style={{
                  border: `2px dashed ${dragActive ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '12px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  background: dragActive ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '1.5rem'
                }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                <h4 style={{ marginBottom: '0.5rem' }}>
                  {dragActive ? 'Drop certificate here' : 'Upload Certificate'}
                </h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                  Drag and drop your certificate or click to browse
                </p>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  Supports PDF, JPG, PNG files (max 10MB)
                </p>
              </div>

              <input
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                multiple={false}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
              />

              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>📋 Upload Guidelines:</h4>
                <ul style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '1.5rem' }}>
                  <li>Ensure the certificate is clear and readable</li>
                  <li>All text should be visible and not cropped</li>
                  <li>File must be in PDF, JPG, or PNG format</li>
                  <li>Maximum file size: 10MB</li>
                </ul>
              </div>
            </>
          ) : null}

          {uploading && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
              <h4>Processing Upload...</h4>
              <p style={{ marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                Uploading {uploadedFile?.name} ({uploadProgress}%)
              </p>
              
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: `${uploadProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #3b82f6, #10b981)',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  🔐 Processing certificate and recording on blockchain...
                </p>
              </div>
            </div>
          )}

          {uploadProgress === 100 && !uploading && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#10b981' }}>✅</div>
              <h4 style={{ color: '#10b981' }}>Upload Successful!</h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Your certificate has been uploaded and verified on the blockchain.
              </p>
            </div>
          )}

          {!uploading && uploadProgress === 0 && (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'end' }}>
              <button className="btn btn--outline" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn--primary" onClick={onButtonClick}>
                📁 Select File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
"""

with open('QRCodeModal.jsx', 'w') as f:
    f.write(qr_modal)
    
with open('PortfolioModal.jsx', 'w') as f:
    f.write(portfolio_modal)
    
with open('UploadModal.jsx', 'w') as f:
    f.write(upload_modal)

print("✅ Created modal components:")
print("- QRCodeModal.jsx")
print("- PortfolioModal.jsx")  
print("- UploadModal.jsx")