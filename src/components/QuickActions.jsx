import React from 'react';
import { Send, Plus, Download, Clock } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { name: 'Send Money', icon: <Send size={20} color="#1ab07e" /> },
    { name: 'Add Funds', icon: <Plus size={20} color="#1ab07e" /> },
    { name: 'Receive Funds', icon: <Download size={20} color="#1ab07e" /> },
    { name: 'Schedule Pay', icon: <Clock size={20} color="#1ab07e" /> }
  ];

  return (
    <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="section-title-container" style={{ marginBottom: '1rem' }}>
        <h3 className="section-title">Quick Actions</h3>
      </div>
      <div className="quick-actions-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.25rem', alignItems: 'center' }}>
        {actions.map((action, index) => (
          <div key={index} className="quick-action-btn">
            <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '0.25rem' }}>
              {action.icon}
            </div>
            <span style={{ textAlign: 'center', lineHeight: '1.2' }}>{action.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
