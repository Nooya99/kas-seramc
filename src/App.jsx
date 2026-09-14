import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SummaryCards from './components/SummaryCards'
import SpendingOverview from './components/SpendingOverview'
import LineChart from './components/LineChart'
import QuickActions from './components/QuickActions'
import TopBuyer from './components/TopBuyer'
import PnLStatement from './components/PnLStatement'
import RecentExpenses from './components/RecentExpenses'
import Login from './pages/Login'
import './App.css'

export const monthlyDataStore = {
  'Jan': { income: 25000000, expense: 18000000, balance: 25000000 - 18000000 },
  'Feb': { income: 32000000, expense: 21000000, balance: 32000000 - 21000000 },
  'Mar': { income: 15000000, expense: 22000000, balance: 15000000 - 22000000 },
  'Apr': { income: 42000000, expense: 30000000, balance: 42000000 - 30000000 },
  'May': { income: 28000000, expense: 26000000, balance: 28000000 - 26000000 },
  'Jun': { income: 18000000, expense: 12000000, balance: 18000000 - 12000000 },
  'Jul': { income: 35000000, expense: 40000000, balance: 35000000 - 40000000 },
  'Aug': { income: 48000000, expense: 32000000, balance: 48000000 - 32000000 },
  'Sep': { income: 29000000, expense: 21000000, balance: 29000000 - 21000000 },
  'Oct': { income: 12000000, expense: 19000000, balance: 12000000 - 19000000 },
  'Nov': { income: 38000000, expense: 27000000, balance: 38000000 - 27000000 },
  'Dec': { income: 55000000, expense: 42000000, balance: 55000000 - 42000000 }
};

function Dashboard() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = months[new Date().getMonth()];
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>
        <button 
          onClick={toggleTheme}
          style={{
            background: 'none', border: '1px solid var(--glass-border)', borderRadius: '50%',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)', transition: 'all 0.2s',
            backdropFilter: 'blur(8px)'
          }}
          title="Toggle Light/Dark Mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      <SummaryCards 
        selectedMonth={selectedMonth} 
        onMonthChange={setSelectedMonth} 
        monthlyData={monthlyDataStore[selectedMonth]} 
        theme={theme}
      />
      
      <div className="middle-section">
        <div className="spending-overview-container">
          <SpendingOverview />
        </div>
        <div className="right-sidebar">
          <div className="sidebar-widget">
            <LineChart theme={theme} />
          </div>
          <div className="sidebar-widget">
            <QuickActions />
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <TopBuyer />
        <PnLStatement />
        <RecentExpenses />
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route 
          path="/" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  )
}

export default App
