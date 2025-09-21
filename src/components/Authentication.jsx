import React, { useState } from 'react';
import FaceVerification from './FaceVerification';
import { showToast } from '../utils/toast';

function Authentication({ selectedRole, userProfiles, onAuthenticate, onBack }) {
  const [showFaceVerification, setShowFaceVerification] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const role = userProfiles[selectedRole];

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('⚠️ Please fill in all fields', 'warning');
      return;
    }

    showToast('🔐 Authenticating...', 'info');

    setTimeout(() => {
      const user = { 
        ...role, 
        name: selectedRole === 'student' ? "Kaavy Aggarwal" : role.name, 
        enrollmentNumber: selectedRole === 'student' ? "ENR12345" : null 
      };
      onAuthenticate(user);
    }, 1500);
  };

  const handleFaceVerificationComplete = (success) => {
    if (success) {
      showToast('🤖 Face recognition successful!', 'success');
      setTimeout(() => {
        onAuthenticate(role);
      }, 1000);
    } else {
      showToast('❌ Face verification failed', 'error');
      setShowFaceVerification(false);
    }
  };

  if (showFaceVerification) {
    return (
      <FaceVerification
        onComplete={handleFaceVerificationComplete}
        onCancel={() => setShowFaceVerification(false)}
        userName={role?.name}
      />
    );
  }

  return (
    <div className="authentication">
      <div className="auth-container">
        <div className="auth-header">
          <button className="btn btn--outline btn--sm" onClick={onBack}>
            ← Back to Roles
          </button>
          <h2 className="auth-title">
            User Login
          </h2>
          <p className="auth-subtitle">Secure access to your dashboard</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>📧 Email & Password</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Sign in with your professional credentials
          </p>

          <form onSubmit={handleEmailLogin}>
            
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder={`Enter your ${selectedRole} email`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn--primary btn--full-width">
              🔐 Sign In
            </button>
          </form>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>🤳 Face Recognition</h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
            Secure biometric authentication with AI verification
          </p>
          <button
            className="face-auth-btn"
            onClick={() => setShowFaceVerification(true)}
          >
            🎥 Start Face Recognition
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
