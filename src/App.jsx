import React, { useState } from 'react'
import { LogOut, User } from 'lucide-react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SummaryCards from './components/SummaryCards'
import SpendingOverview from './components/SpendingOverview'
import LineChart from './components/LineChart'
import QuickActions from './components/QuickActions'
import TopBuyer from './components/TopBuyer'
import PnLStatement from './components/PnLStatement'
import RecentActivity from './components/RecentActivity'
import Login from './pages/Login'

const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Dashboard({ setIsLoggedIn }) {
  const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(monthsList[currentMonthIndex]); // Default to real current month
  const [transactions, setTransactions] = useState([]);
  
  React.useEffect(() => {
    fetch('http://103.89.1.229:3001/api/transactions')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setTransactions(data);
      })
      .catch(err => console.error('Error fetching transactions:', err));
  }, []);
  
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
            <QuickActions onAddTransaction={(txn) => {
              const newTxn = { ...txn, id: Date.now().toString() + Math.random().toString(36).substring(2, 7) };
              
              // Optimistic Update: Langsung tampilkan di UI tanpa menunggu respon server
              setTransactions([newTxn, ...transactions]);
              
              fetch('http://103.89.1.229:3001/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTxn)
              }).catch(err => {
                console.error('Failed to save to DB', err);
                // Jika butuh lebih aman, bisa kembalikan state jika gagal
              });
            }} />
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <TopBuyer />
        <PnLStatement monthlyData={monthlyDataStore[selectedMonth]} month={selectedMonth} />
        <RecentActivity 
          transactions={transactions} 
          selectedMonth={selectedMonth}
          onUpdate={(id, updatedTxn) => setTransactions(transactions.map(t => t.id === id ? updatedTxn : t))}
          onDelete={(id) => {
            setTransactions(transactions.filter(t => t.id !== id));
            fetch(`http://103.89.1.229:3001/api/transactions/${id}`, {
              method: 'DELETE'
            }).catch(err => console.error('Failed to delete from DB:', err));
          }}
        />
      </div>

      <button 
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem('isLoggedIn');
          sessionStorage.removeItem('isLoggedIn');
          setIsLoggedIn(false);
        }}
        title="Logout"
      >
        <LogOut size={18} color="#ef4444" />
      </button>

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
    return localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
  });

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route 
          path="/" 
          element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  )
}

export default App
