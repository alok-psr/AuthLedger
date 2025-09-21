# Create ParticleBackground.jsx component
particle_bg = """import React, { useEffect } from 'react';

function ParticleBackground() {
  useEffect(() => {
    const createParticles = () => {
      const container = document.getElementById('particles-container');
      if (!container) return;

      const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = `particle ${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`;
        
        const startX = Math.random() * window.innerWidth;
        const duration = 8 + Math.random() * 12; // 8-20 seconds
        const delay = Math.random() * 5; // 0-5 seconds delay
        
        particle.style.left = startX + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, (duration + delay) * 1000);
      };

      // Create initial particles
      for (let i = 0; i < 50; i++) {
        setTimeout(createParticle, Math.random() * 5000);
      }

      // Continuously create new particles
      const interval = setInterval(createParticle, 200);
      
      return () => clearInterval(interval);
    };

    const cleanup = createParticles();
    return cleanup;
  }, []);

  return <div id="particles-container" />;
}

export default ParticleBackground;
"""

# Create RoleSelection.jsx component
role_selection = """import React, { useState } from 'react';

function RoleSelection({ roles, onRoleSelect }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    // Add visual feedback delay
    setTimeout(() => {
      onRoleSelect(roleId);
    }, 500);
  };

  return (
    <div className="role-selection">
      <div className="role-selection__header">
        <h1 className="role-selection__title">🏆 Smart India Hackathon 2025</h1>
        <p className="role-selection__subtitle">
          Professional Certificate Verification System
        </p>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '1rem' }}>
          Advanced blockchain-powered credential verification with AI-enhanced security and professional integrity
        </p>
      </div>
      
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
        Select Your Professional Role
      </h2>
      
      <div className="role-cards">
        {roles.map(role => (
          <div
            key={role.id}
            className={`role-card ${selectedRole === role.id ? 'role-card--selected' : ''}`}
            onClick={() => handleRoleSelect(role.id)}
          >
            <div className="role-card__icon">{role.icon}</div>
            <h3 className="role-card__name">{role.name}</h3>
            <p className="role-card__description">{role.description}</p>
            <ul className="role-card__features">
              {role.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoleSelection;
"""

# Create Authentication.jsx component  
authentication = """import React, { useState } from 'react';
import FaceVerification from './FaceVerification';

function Authentication({ selectedRole, userProfiles, onAuthenticate, onBack }) {
  const [showFaceVerification, setShowFaceVerification] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const role = userProfiles[selectedRole];

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('⚠️ Please enter both email and password', 'warning');
      return;
    }
    
    showToast('🔐 Authenticating...', 'info');
    
    setTimeout(() => {
      onAuthenticate(role);
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
            {selectedRole === 'student' ? '👨🎓' : 
             selectedRole === 'employer' ? '💼' : 
             selectedRole === 'college' ? '🏫' : '🏛️'} {role?.name} Authentication
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

// Toast function needs to be defined or imported
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

export default Authentication;
"""

# Save the component files
with open('ParticleBackground.jsx', 'w') as f:
    f.write(particle_bg)
    
with open('RoleSelection.jsx', 'w') as f:
    f.write(role_selection)
    
with open('Authentication.jsx', 'w') as f:
    f.write(authentication)

print("✅ Created component files:")
print("- ParticleBackground.jsx")
print("- RoleSelection.jsx") 
print("- Authentication.jsx")