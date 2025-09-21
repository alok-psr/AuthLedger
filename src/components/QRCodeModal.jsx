import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { showToast } from '../utils/toast';

function QRCodeModal({ certificate, onClose }) {
  const qrCodeRef = useRef(null);

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const svg = qrCodeRef.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = `certificate-${certificate.id}-qr.png`;
        link.href = pngFile;
        link.click();
        showToast('📱 QR Code downloaded successfully!', 'success');
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
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
          }} ref={qrCodeRef}>
            <QRCode value={certificate.qrData || "https://google.com"} />
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
