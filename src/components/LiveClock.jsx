import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="glass-card" style={{ padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', width: 'auto' }}>
      <Clock size={18} color="var(--accent-blue-light)" />
      <div>
        <div style={{ fontSize: '1.1rem', fontWeight: '700', letterSpacing: '1px' }}>{formatTime(time)}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{formatDate(time)}</div>
      </div>
    </div>
  );
};

export default LiveClock;
