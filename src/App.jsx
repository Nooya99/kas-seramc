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

const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const generateDummyData = () => {
  const data = [];
  const categories = ['promotion', 'rent', 'wns', 'exp', 'others'];
  for (let month = 0; month < 12; month++) {
    // Generate Income
    data.push({
      id: `inc-${month}`,
      type: 'income',
      name: 'Pendapatan Bulanan',
      date: `2026-${String(month + 1).padStart(2, '0')}-01`,
      category: 'revenue',
      amount: Math.floor(Math.random() * 20000000) + 30000000, // 30M - 50M
      description: 'Pendapatan utama bulan ini'
    });
    
    // Generate >20 expenses per month
    const numExpenses = Math.floor(Math.random() * 6) + 21; // 21 - 26 expenses
    for (let i = 0; i < numExpenses; i++) {
      const cat = categories[Math.floor(Math.random() * categories.length)];
      data.push({
        id: `exp-${month}-${i}`,
        type: 'expense',
        name: `Biaya ${cat.toUpperCase()}`,
        date: `2026-${String(month + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        category: cat,
        amount: Math.floor(Math.random() * 5000000) + 1000000, // 1M - 6M
        description: `Biaya operasional untuk ${cat} bulan ${monthsList[month]}`
      });
    }
  }
  // Sort descending by date so newer ones are at the top
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
};

function Dashboard() {
  const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(monthsList[currentMonthIndex]); // Default to real current month
  const [transactions, setTransactions] = useState(generateDummyData());
  
  const monthlyDataStore = React.useMemo(() => {
    const store = {};
    let runningBalance = 0;
    
    // Initialize all months with 0
    monthsList.forEach(m => {
      store[m] = { income: 0, expense: 0, balance: 0, categories: {} };
    });

    // Aggregate transactions
    transactions.forEach(txn => {
      if (!txn.date) return;
      const dateObj = new Date(txn.date);
      const m = monthsList[dateObj.getMonth()];
      if (m && store[m]) {
        if (txn.type === 'income') {
          store[m].income += txn.amount;
        } else if (txn.type === 'expense') {
          store[m].expense += txn.amount;
          store[m].categories[txn.category] = (store[m].categories[txn.category] || 0) + txn.amount;
        }
      }
    });

    // Calculate running balance
    monthsList.forEach(m => {
      runningBalance += (store[m].income - store[m].expense);
      store[m].balance = runningBalance;
    });

    return store;
  }, [transactions]);
  const username = localStorage.getItem('username') || 'ADMIN';
  
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

  const currentMonthIdx = monthsList.indexOf(selectedMonth);
  const prevMonthData = currentMonthIdx > 0 ? monthlyDataStore[monthsList[currentMonthIdx - 1]] : null;

  return (
    <div className="dashboard-container">

      <SummaryCards 
        selectedMonth={selectedMonth} 
        onMonthChange={setSelectedMonth} 
        monthlyData={monthlyDataStore[selectedMonth]} 
        prevMonthData={prevMonthData}
        theme={theme}
      />
      
      <div className="middle-section">
        <div className="spending-overview-container">
          <SpendingOverview 
            monthlyData={monthlyDataStore[selectedMonth]} 
            month={selectedMonth}
          />
        </div>
        <div className="right-sidebar">
          <div className="sidebar-widget">
            <LineChart theme={theme} monthlyDataStore={monthlyDataStore} />
          </div>
          <div className="sidebar-widget">
            <QuickActions onAddTransaction={(txn) => setTransactions([{ ...txn, id: Date.now().toString() + Math.random().toString(36).substr(2, 5) }, ...transactions])} />
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <TopBuyer />
        <PnLStatement monthlyData={monthlyDataStore[selectedMonth]} month={selectedMonth} />
        <RecentExpenses 
          transactions={transactions} 
          selectedMonth={selectedMonth}
          onUpdate={(id, updatedTxn) => setTransactions(transactions.map(t => t.id === id ? updatedTxn : t))}
          onDelete={(id) => setTransactions(transactions.filter(t => t.id !== id))}
        />
      </div>

      <button 
        className="theme-toggle-btn"
        onClick={(e) => {
          toggleTheme();
          const target = e.currentTarget;
          setTimeout(() => {
            if (document.activeElement === target) {
              target.blur();
            }
          }, 2500);
        }}
        title="Toggle Light/Dark Mode"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
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
