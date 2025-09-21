import React, { useState, useEffect } from 'react';
import StudentDashboard from './StudentDashboard';
import EmployerDashboard from './EmployerDashboard';
import CollegeDashboard from './CollegeDashboard';
import GovernmentDashboard from './GovernmentDashboard';

function Dashboard({ user, appData, onLogout, onIssueCertificate }) {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') { 
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setShowNav(false); 
      } else { // if scroll up show the navbar
        setShowNav(true);  
      }
      setLastScrollY(window.scrollY); 
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} appData={appData} />;
      case 'employer':
        return <EmployerDashboard user={user} appData={appData} />;
      case 'college':
        return <CollegeDashboard user={user} appData={appData} onIssueCertificate={onIssueCertificate} />;
      case 'government':
        return <GovernmentDashboard user={user} appData={appData} />;
      default:
        return <div>Dashboard not found</div>;
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`navbar ${showNav ? 'navbar--visible' : 'navbar--hidden'}`}>
        <div className="navbar-content">
          <div className="navbar-brand" onClick={onLogout} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="https://res.cloudinary.com/djqnrksac/image/upload/1758467068662-removebg-preview_pvwzrf.png" alt="AuthLedger Logo" style={{ height: '30px' }} />
            <span>AuthLedger</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid #10b981'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              background: '#10b981',
              borderRadius: '50%',
              animation: 'blink 2s infinite'
            }} />
            <span style={{ color: '#10b981', fontSize: '14px' }}>Blockchain Connected</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
              👋 {user.name}
            </span>
            <button className="btn btn--outline btn--sm" onClick={onLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main style={{ flex: 1 }}>
        {renderDashboard()}
      </main>
    </>
  );
}

export default Dashboard;
