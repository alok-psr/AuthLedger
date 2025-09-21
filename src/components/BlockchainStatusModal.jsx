import React from 'react';

function BlockchainStatusModal({ onClose }) {
  const mockStatus = {
    network: 'Operational',
    latestBlock: '12345678',
    transactionsLastHour: 1567,
    avgBlockTime: '3.2s',
    nodesActive: 85,
    lastAudit: '2024-09-15',
  };

  const mockRecentTransactions = [
    { id: 'TXN001', type: 'Certificate Issue', hash: '0xabc123...', timestamp: '2 mins ago', status: 'Confirmed' },
    { id: 'TXN002', type: 'Verification', hash: '0xdef456...', timestamp: '5 mins ago', status: 'Confirmed' },
    { id: 'TXN003', type: 'Bulk Upload', hash: '0xghi789...', timestamp: '15 mins ago', status: 'Pending' },
  ];

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '700px' }}>
        <div style={{ padding: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>🔗 Blockchain Status</h3>
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
            <h4 style={{ marginBottom: '1rem' }}>Network Overview</h4>
            <p><strong>Network Status:</strong> <span style={{ color: '#10b981' }}>{mockStatus.network}</span></p>
            <p><strong>Latest Block:</strong> {mockStatus.latestBlock}</p>
            <p><strong>Transactions (last hour):</strong> {mockStatus.transactionsLastHour}</p>
            <p><strong>Avg. Block Time:</strong> {mockStatus.avgBlockTime}</p>
            <p><strong>Active Nodes:</strong> {mockStatus.nodesActive}</p>
            <p><strong>Last Security Audit:</strong> {mockStatus.lastAudit}</p>
          </div>

          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
            padding: '1.5rem',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            <h4 style={{ marginBottom: '1rem' }}>Recent Transactions</h4>
            {mockRecentTransactions.map(txn => (
              <div key={txn.id} style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <p style={{ margin: 0 }}><strong>Type:</strong> {txn.type}</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>Hash: {txn.hash}</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>{txn.timestamp} - Status: {txn.status}</p>
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

export default BlockchainStatusModal;
