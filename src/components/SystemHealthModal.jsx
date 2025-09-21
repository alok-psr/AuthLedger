import React from 'react';

function SystemHealthModal({ onClose }) {
  const mockSystemHealth = {
    status: 'Operational',
    uptime: '99.9%',
    cpuUsage: '25%',
    memoryUsage: '40%',
    diskUsage: '60%',
    lastMaintenance: '2024-09-15',
  };

  const mockServiceStatus = [
    { name: 'Blockchain Node', status: 'Running', latency: '50ms' },
    { name: 'API Gateway', status: 'Running', latency: '30ms' },
    { name: 'Database Server', status: 'Running', latency: '20ms' },
    { name: 'Analytics Engine', status: 'Running', latency: '40ms' },
  ];

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '700px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>✅ System Health Overview</h3>
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
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ marginBottom: '1rem' }}>Overall System Status</h4>
            <p><strong>Status:</strong> <span style={{ color: '#10b981' }}>{mockSystemHealth.status}</span></p>
            <p><strong>Uptime:</strong> {mockSystemHealth.uptime}</p>
            <p><strong>CPU Usage:</strong> {mockSystemHealth.cpuUsage}</p>
            <p><strong>Memory Usage:</strong> {mockSystemHealth.memoryUsage}</p>
            <p><strong>Disk Usage:</strong> {mockSystemHealth.diskUsage}</p>
            <p><strong>Last Maintenance:</strong> {mockSystemHealth.lastMaintenance}</p>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
            padding: '1.5rem',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            <h4 style={{ marginBottom: '1rem' }}>Service Status</h4>
            {mockServiceStatus.map(service => (
              <div key={service.name} style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <p style={{ margin: 0 }}><strong>{service.name}:</strong> <span style={{ color: '#10b981' }}>{service.status}</span></p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>Latency: {service.latency}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button className="btn btn--primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemHealthModal;
