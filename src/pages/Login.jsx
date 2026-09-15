import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    const allowedUsers = ['Nooya99', 'KSprint', 'Finn', 'kira', 'GreenCraftH'];
    const allowedPassword = 'KasGkfrn5staff';

    // Case-insensitive check for usernames can be done, but the user explicitly gave cases. 
    // Usually it's better to match case-insensitively or exactly. Let's do exact match as requested.
    if (allowedUsers.includes(username) && password === allowedPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      setIsLoggedIn(true);
      navigate('/');
    } else {
      setError('Username atau Password salah!');
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to access your dashboard</p>
        
        {error && (
          <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: '500', background: 'rgba(239, 68, 68, 0.1)', padding: '8px 12px', borderRadius: '6px', width: '100%', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" 
              required 
            />
          </div>
          <button type="submit" className="auth-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
