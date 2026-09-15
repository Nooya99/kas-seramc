import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState(localStorage.getItem('savedUsername') || '');
  const [password, setPassword] = useState(localStorage.getItem('savedPassword') || '');
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('savedUsername'));
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
        if (rememberMe) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('savedUsername', username);
          localStorage.setItem('savedPassword', password);
        } else {
          sessionStorage.setItem('isLoggedIn', 'true');
          localStorage.removeItem('isLoggedIn'); // ensure it's not in local
          localStorage.removeItem('savedUsername');
          localStorage.removeItem('savedPassword');
        }
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
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-item-1 { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
          .animate-item-2 { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
          .animate-item-3 { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
          .animate-item-4 { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
          .animate-item-5 { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
          
          .custom-checkbox {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            font-size: 0.8rem;
            color: #fff;
            user-select: none;
          }
          .custom-checkbox input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }
          .checkmark {
            height: 18px;
            width: 18px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          .custom-checkbox:hover input ~ .checkmark {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.4);
            transform: scale(1.05);
          }
          .custom-checkbox input:checked ~ .checkmark {
            background: rgba(16, 185, 129, 0.8);
            border-color: #10b981;
            box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
            transform: scale(1);
          }
          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
            left: 5px;
            top: 2px;
            width: 4px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            animation: checkAnim 0.2s forwards;
          }
          @keyframes checkAnim {
            0% { height: 0; width: 0; opacity: 0; }
            100% { height: 8px; width: 4px; opacity: 1; }
          }
          .custom-checkbox input:checked ~ .checkmark:after {
            display: block;
          }
          
          .glass-input {
            width: 100%;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.25);
            color: #ffffff;
            padding: 12px 12px 12px 40px;
            transition: all 0.3s ease;
          }
          .glass-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }
          .glass-input:focus {
            background: rgba(255, 255, 255, 0.15);
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
            outline: none;
          }
          
          .glass-login-btn {
            background: rgba(16, 185, 129, 0.25);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(16, 185, 129, 0.4);
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
          }
          .glass-login-btn:hover:not(:disabled) {
            background: rgba(16, 185, 129, 0.4);
            border: 1px solid rgba(16, 185, 129, 0.6);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          }
          .glass-login-btn:active:not(:disabled) {
            transform: translateY(0);
          }
        `}
      </style>
      <div className="auth-container">
        <div className="glass-card auth-card" style={{ maxWidth: '24rem', padding: '3rem 2.5rem' }}>
          <div className="animate-item-1" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
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
          
          <form onSubmit={handleLogin} className="auth-form" style={{ gap: '1rem' }}>
            <div className="form-group animate-item-2" style={{ position: 'relative' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#fff' }}>Username</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#ffffff" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  className="glass-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username" 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="form-group animate-item-3" style={{ position: 'relative' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#fff' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#ffffff" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="password" 
                  className="glass-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password" 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="form-group animate-item-4" style={{ marginTop: '0.2rem', marginBottom: '0.8rem' }}>
              <label className="custom-checkbox">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
            </div>
            
            <button 
              type="submit" 
              className="auth-btn glass-login-btn animate-item-5" 
              disabled={isLoading}
              style={{ 
                marginTop: '0.5rem', 
                padding: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px',
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
                  <span>LOGIN</span>
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
