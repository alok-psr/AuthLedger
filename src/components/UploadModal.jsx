import React, { useState, useCallback } from 'react';
import { showToast } from '../utils/toast';

function UploadModal({ onClose, onSuccess }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

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
