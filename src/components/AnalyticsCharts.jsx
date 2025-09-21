import React from 'react';
import NonStudentAnalytics from './NonStudentAnalytics';
import StudentAnalytics from './StudentAnalytics';

function AnalyticsCharts({ data, userRole, onClose }) {
  const getTitle = () => {
    switch (userRole) {
      case 'student':
        return '📊 Personal Analytics Dashboard';
      case 'employer':
        return '📊 Verification Analytics Dashboard';
      case 'college':
        return '📊 Institutional Analytics Dashboard';
      case 'government':
        return '📊 System Analytics Dashboard';
      default:
        return '📊 Analytics Dashboard';
    }
  };

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '1200px', maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3>{getTitle()}</h3>
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

          {userRole === 'student' ? (
            <StudentAnalytics data={data} />
          ) : (
            <NonStudentAnalytics data={data} />
          )}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button className="btn btn--primary" onClick={onClose}>
              Close Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCharts;
