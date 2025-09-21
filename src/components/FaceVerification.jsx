import React, { useState, useRef, useEffect } from 'react';

function FaceVerification({ onComplete, onCancel, userName }) {
  const [status, setStatus] = useState('initializing');
  const [countdown, setCountdown] = useState(3);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    // Initialize camera
    const initializeCamera = async () => {
      try {
        setStatus('requesting_camera');
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 400, height: 300 } 
        });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
          setStatus('camera_ready');
        }
      } catch (error) {
        console.error('Camera access error:', error);
        setStatus('camera_error');
      }
    };

    initializeCamera();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startVerification = () => {
    setStatus('detecting_face');

    // Simulate face detection (3 seconds like Python code)
    setTimeout(() => {
      setStatus('face_detected');

      // Start countdown
      let count = 3;
      setCountdown(count);

      const countdownInterval = setInterval(() => {
        count -= 1;
        setCountdown(count);

        if (count <= 0) {
          clearInterval(countdownInterval);
          setStatus('verifying');

          // Simulate verification process
          setTimeout(() => {
            const success = Math.random() > 0.1; // 90% success rate
            setStatus(success ? 'success' : 'failed');

            setTimeout(() => {
              onComplete(success);
            }, 2000);
          }, 2000);
        }
      }, 1000);
    }, 1500);
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'initializing':
        return '🔄 Initializing face recognition system...';
      case 'requesting_camera':
        return '📹 Requesting camera access...';
      case 'camera_ready':
        return '✅ Camera ready! Position your face in the frame';
      case 'camera_error':
        return '❌ Camera access denied. Please enable camera permissions';
      case 'detecting_face':
        return '🔍 Detecting face... Please look at the camera';
      case 'face_detected':
        return `📸 Face detected! Verification in ${countdown}...`;
      case 'verifying':
        return '🤖 Verifying identity with AI...';
      case 'success':
        return '🎉 Face verification successful!';
      case 'failed':
        return '❌ Face verification failed. Please try again';
      default:
        return 'Processing...';
    }
  };

  return (
    <div className="authentication">
      <div className="auth-container" style={{ maxWidth: '600px' }}>
        <div className="auth-header">
          <button className="btn btn--outline btn--sm" onClick={onCancel}>
            ← Back to Login
          </button>
          <h2 className="auth-title">🤳 Face Recognition</h2>
          <p className="auth-subtitle">Professional biometric authentication for {userName}</p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            position: 'relative', 
            display: 'inline-block',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '3px solid #3b82f6',
            background: 'rgba(59, 130, 246, 0.1)'
          }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{
                width: '400px',
                height: '300px',
                background: 'rgba(0, 0, 0, 0.8)',
                display: status === 'camera_error' ? 'none' : 'block'
              }}
            />

            {status === 'camera_error' && (
              <div style={{
                width: '400px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white'
              }}>
                📹 Camera Preview Unavailable
              </div>
            )}

            {/* Face detection frame overlay */}
            {(status === 'detecting_face' || status === 'face_detected' || status === 'verifying') && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '180px',
                height: '180px',
                border: '3px solid #10b981',
                borderRadius: '50%',
                opacity: 0.9,
                animation: 'pulse 2.5s infinite'
              }} />
            )}

            {/* Scan line animation */}
            {status === 'verifying' && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(135deg, #d97706, #3b82f6)',
                animation: 'scanLine 3s linear infinite'
              }} />
            )}
          </div>
        </div>

        <div style={{
          padding: '1rem',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '8px',
          borderLeft: '4px solid #10b981',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0, color: 'white' }}>
            {getStatusMessage()}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {status === 'camera_ready' && (
            <button className="btn btn--primary btn--lg" onClick={startVerification}>
              🔐 Start Verification
            </button>
          )}

          {status === 'camera_error' && (
            <button className="btn btn--primary btn--lg" onClick={() => window.location.reload()}>
              🔄 Retry Camera Access
            </button>
          )}

          <button className="btn btn--outline" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default FaceVerification;
