# Create the main App.jsx file with the exact same functionality
app_jsx = """import React, { useState, useEffect } from 'react'
import ParticleBackground from './components/ParticleBackground'
import RoleSelection from './components/RoleSelection'
import Authentication from './components/Authentication'
import Dashboard from './components/Dashboard'

// Application data with comprehensive certificate management - SAME AS WORKING VERSION
const APP_DATA = {
  userRoles: [
    {
      id: "student",
      name: "Student Professional",
      description: "Access your verified certificates and upload new ones for blockchain verification with professional portfolio management",
      color: "#1e3a8a",
      icon: "👨🎓",
      features: ["Professional Portfolio", "QR Code Generation", "Blockchain Verification", "Secure Document Upload"]
    },
    {
      id: "college", 
      name: "Institution",
      description: "Issue and manage certificates with blockchain integration, bulk processing, and professional compliance standards",
      color: "#0f766e",
      icon: "🏫",
      features: ["Professional Issuance", "Blockchain Integration", "Enterprise Analytics", "Institutional Management"]
    },
    {
      id: "employer",
      name: "Employer",
      description: "Verify candidate credentials with AI-powered scanning, fraud detection, and professional screening capabilities", 
      color: "#d97706",
      icon: "💼",
      features: ["Professional Scanner", "Bulk Verification", "Candidate Assessment", "Enterprise Security"]
    },
    {
      id: "government",
      name: "Government",
      description: "Monitor system integrity with comprehensive oversight, policy management, and professional compliance reporting",
      color: "#dc2626", 
      icon: "🏛️",
      features: ["System Oversight", "Policy Management", "Compliance Analytics", "Professional Monitoring"]
    }
  ],
  mockCertificates: [
    {
      id: "CERT001",
      studentName: "Alex Johnson", 
      institution: "MIT",
      degree: "Bachelor of Computer Science",
      year: "2024",
      grade: "First Class Honors",
      status: "verified",
      blockchainHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      qrData: "SIH_CERT001_MIT_CS_2024_ALEX_JOHNSON_VERIFIED",
      uploadDate: "2024-01-15",
      verificationCount: 5,
      aiConfidence: 98.9,
      fraudRisk: "LOW",
      fileSize: "2.4 MB",
      fileType: "PDF"
    },
    {
      id: "CERT002",
      studentName: "Alex Johnson",
      institution: "Stanford",
      degree: "Machine Learning Certificate", 
      year: "2024",
      grade: "A+",
      status: "verified",
      blockchainHash: "0xdef789abc123456def789abc123456def789abc12",
      qrData: "SIH_CERT002_STANFORD_ML_2024_ALEX_JOHNSON_VERIFIED",
      uploadDate: "2024-02-10",
      verificationCount: 3,
      aiConfidence: 97.5,
      fraudRisk: "LOW",
      fileSize: "1.8 MB", 
      fileType: "PDF"
    }
  ],
  analyticsData: {
    monthlyIssuance: [
      {"month": "Jan", "certificates": 1250, "verified": 1180, "failed": 70},
      {"month": "Feb", "certificates": 1420, "verified": 1350, "failed": 70},
      {"month": "Mar", "certificates": 1680, "verified": 1590, "failed": 90},
      {"month": "Apr", "certificates": 1580, "verified": 1520, "failed": 60},
      {"month": "May", "certificates": 1750, "verified": 1680, "failed": 70},
      {"month": "Jun", "certificates": 1920, "verified": 1850, "failed": 70},
      {"month": "Jul", "certificates": 2100, "verified": 2010, "failed": 90},
      {"month": "Aug", "certificates": 2250, "verified": 2180, "failed": 70},
      {"month": "Sep", "certificates": 1890, "verified": 1820, "failed": 70}
    ],
    statusDistribution: [
      {"status": "Verified", "count": 15420, "color": "#10b981"},
      {"status": "Pending", "count": 2340, "color": "#f59e0b"},
      {"status": "Failed", "count": 180, "color": "#ef4444"},
      {"status": "Expired", "count": 450, "color": "#6b7280"}
    ],
    institutionStats: [
      {"name": "MIT", "certificates": 5420, "verified": 5380, "success": 99.3},
      {"name": "Stanford", "certificates": 4890, "verified": 4850, "success": 99.2},
      {"name": "Harvard", "certificates": 4350, "verified": 4320, "success": 99.3},
      {"name": "Berkeley", "certificates": 3920, "verified": 3900, "success": 99.5},
      {"name": "CMU", "certificates": 3680, "verified": 3650, "success": 99.2}
    ],
    fraudTrends: [
      {"month": "Jan", "detected": 12, "prevented": 145, "rate": 7.6},
      {"month": "Feb", "detected": 8, "prevented": 132, "rate": 5.7},
      {"month": "Mar", "detected": 15, "prevented": 167, "rate": 8.2},
      {"month": "Apr", "detected": 6, "prevented": 124, "rate": 4.6},
      {"month": "May", "detected": 11, "prevented": 156, "rate": 6.6},
      {"month": "Jun", "detected": 9, "prevented": 143, "rate": 5.9}
    ]
  },
  userProfiles: {
    student: {
      name: "Alex Johnson",
      email: "alex.johnson@student.edu",
      role: "student",
      certificates: [
        {
          id: "CERT_001",
          studentName: "Alex Johnson",
          institution: "MIT",
          degree: "Bachelor of Computer Science",
          year: "2024",
          grade: "First Class Honors",
          status: "verified",
          blockchainHash: "0xabc123def456789abcdef123456789abcdef12345",
          qrData: "VERIFY:CERT_001:MIT:CS:2024:ALEX_JOHNSON:0xabc123",
          uploadDate: "2024-01-15",
          verificationCount: 5,
          aiConfidence: 98.9,
          fraudRisk: "LOW",
          fileSize: "2.4 MB",
          fileType: "PDF"
        },
        {
          id: "CERT_002",
          studentName: "Alex Johnson",
          institution: "Stanford",
          degree: "Machine Learning Certificate",
          year: "2024",
          grade: "A+",
          status: "verified",
          blockchainHash: "0xdef789abc123456def789abc123456def789abc12",
          qrData: "VERIFY:CERT_002:STANFORD:ML:2024:ALEX_JOHNSON:0xdef789",
          uploadDate: "2024-02-10",
          verificationCount: 3,
          aiConfidence: 97.5,
          fraudRisk: "LOW",
          fileSize: "1.8 MB",
          fileType: "PDF"
        }
      ]
    },
    employer: {
      name: "Sarah Mitchell",
      email: "sarah.mitchell@techcorp.com",
      role: "employer",
      company: "TechCorp Solutions",
      verificationHistory: [
        {
          id: "VER_001",
          candidateName: "John Smith",
          institution: "Harvard",
          degree: "Computer Science",
          result: "PASSED",
          confidence: 98.7,
          timestamp: "2024-09-10T14:30:00Z",
          fraudRisk: "LOW"
        },
        {
          id: "VER_002",
          candidateName: "Jane Doe",
          institution: "MIT",
          degree: "Engineering",
          result: "FAILED",
          confidence: 45.2,
          timestamp: "2024-09-12T09:15:00Z",
          fraudRisk: "HIGH",
          issues: ["Invalid blockchain hash", "Institution signature mismatch"]
        }
      ]
    },
    college: {
      name: "Dr. Robert Chen",
      email: "robert.chen@university.edu",
      role: "college",
      institution: "Global University",
      issuedCertificates: [
        {
          id: "CERT_GU_001",
          studentName: "Emily Rodriguez",
          degree: "Master of Data Science",
          issueDate: "2024-05-15",
          status: "active"
        },
        {
          id: "CERT_GU_002",
          studentName: "Michael Zhang",
          degree: "PhD in AI",
          issueDate: "2024-06-20",
          status: "active"
        }
      ]
    },
    government: {
      name: "Director Lisa Wang",
      email: "lisa.wang@education.gov",
      role: "government",
      department: "Department of Education",
      systemStats: {
        totalInstitutions: 156,
        totalCertificates: 45672,
        verificationRequests: 8934,
        fraudDetected: 23,
        systemIntegrity: 99.8
      }
    }
  }
};

// Toast notification system
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

function App() {
  const [currentView, setCurrentView] = useState('roleSelection');
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    showToast('🎉 Professional Certificate System Ready!', 'success');
  }, []);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setCurrentView('authentication');
    showToast(`🎯 ${APP_DATA.userRoles.find(r => r.id === roleId)?.name} selected`, 'info');
  };

  const handleAuthenticate = (user) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentUser(user);
      setCurrentView('dashboard');
      setLoading(false);
      showToast('🎉 Login successful!', 'success');
    }, 1000);
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setCurrentView('roleSelection');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedRole(null);
    setCurrentView('roleSelection');
    showToast('👋 Logged out successfully', 'info');
  };

  return (
    <>
      <ParticleBackground />
      <div className="main-container">
        {currentView === 'roleSelection' && (
          <RoleSelection 
            roles={APP_DATA.userRoles}
            onRoleSelect={handleRoleSelect}
          />
        )}
        
        {currentView === 'authentication' && (
          <Authentication
            selectedRole={selectedRole}
            userProfiles={APP_DATA.userProfiles}
            onAuthenticate={handleAuthenticate}
            onBack={handleBackToRoles}
          />
        )}
        
        {currentView === 'dashboard' && currentUser && (
          <Dashboard
            user={currentUser}
            appData={APP_DATA}
            onLogout={handleLogout}
          />
        )}
        
        {loading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <div className="loading-text">Loading Dashboard...</div>
              <div className="loading-description">Setting up your professional workspace</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
"""

with open('App.jsx', 'w') as f:
    f.write(app_jsx)

print("✅ Created App.jsx with complete functionality")