import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate a secure connection delay
    setTimeout(() => {
      const allowedUsers = ['Nooya99', 'KSprint', 'Finn', 'kira', 'GreenCraftH'];
      const allowedPassword = 'KasGkfrn5staff';

      // Exact case-sensitive match
      if (allowedUsers.includes(username) && password === allowedPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setError('Akses ditolak: Username atau Password salah!');
        setIsLoading(false);
      }
    }, 1200); // 1.2 second delay
  };

  return (
    <>
      <style>
        {`
          .spin-animation { animation: spin 1s linear infinite; } 
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}
      </style>
      <div className="auth-container">
        <div className="glass-card auth-card" style={{ maxWidth: '24rem', padding: '3rem 2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <img 
              src="/serashop.png" 
              alt="SERAMC Logo" 
              style={{ width: '280px', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }} 
            />
          </div>
          
          {error && (
            <div style={{ 
              color: '#ef4444', 
              marginBottom: '1.5rem', 
              fontSize: '0.85rem', 
              fontWeight: '600', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)',
              padding: '10px 14px', 
              borderRadius: '8px', 
              width: '100%', 
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="auth-form" style={{ gap: '1.5rem' }}>
            <div className="form-group" style={{ position: 'relative' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Username</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#7f8ea3" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username" 
                  required 
                  disabled={isLoading}
                  style={{ width: '100%', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'inherit', padding: '12px 12px 12px 40px' }}
                />
              </div>
            </div>
            
            <div className="form-group" style={{ position: 'relative' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#7f8ea3" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password" 
                  required 
                  disabled={isLoading}
                  style={{ width: '100%', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'inherit', padding: '12px 12px 12px 40px' }}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="auth-btn" 
              disabled={isLoading}
              style={{ 
                marginTop: '0.5rem', 
                padding: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px',
                background: isLoading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="spin-animation" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Secure Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          
          <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Lock size={12} /> Restricted Access • Server-side encrypted connection
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
