import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Coffee, Car, ShoppingBag, Zap, Clapperboard, LayoutGrid } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip);

const SpendingOverview = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` Rp ${context.raw.toLocaleString()}`
        }
      }
    },
  };

  const categories = [
    { name: 'Food & Dining', amount: 4500000, percent: 35, icon: <Coffee size={16} />, color: '#1ab07e' },
    { name: 'Transport', amount: 3200000, percent: 25, icon: <Car size={16} />, color: '#2a6ee5' },
    { name: 'Shopping', amount: 2500000, percent: 20, icon: <ShoppingBag size={16} />, color: '#e14e65' },
    { name: 'Bills & Utilities', amount: 1500000, percent: 12, icon: <Zap size={16} />, color: '#facc15' },
    { name: 'Entertainment', amount: 800000, percent: 6, icon: <Clapperboard size={16} />, color: '#a78bfa' },
    { name: 'Others', amount: 300000, percent: 2, icon: <LayoutGrid size={16} />, color: '#7f8ea3' },
  ];

  const totalAmount = categories.reduce((sum, cat) => sum + cat.amount, 0);

  const data = {
    labels: categories.map(c => c.name),
    datasets: [
      {
        data: categories.map(c => c.amount),
        backgroundColor: categories.map(c => c.color),
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="section-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3 className="section-title">Spending Overview</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>This Month</p>
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rp {totalAmount.toLocaleString()}</div>
      </div>
      
      <div className="spending-overview">
        <div className="spending-chart">
          <div style={{ position: 'relative', width: '320px', height: '320px' }}>
            <Doughnut data={data} options={options} />
            <div style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Top Category</span>
              <span style={{ fontSize: '1.1rem', fontWeight: '600', textAlign: 'center', padding: '0 10px' }}>Food & Dining</span>
            </div>
          </div>
        </div>
        
        <div className="spending-legend">
          {categories.map((cat, idx) => (
            <div key={idx} style={{ 
              display: 'flex', alignItems: 'center', paddingBottom: '0.5rem', 
              borderBottom: '1px solid var(--glass-border)', gap: '0.75rem' 
            }}>
              <div style={{ color: cat.color }}>{cat.icon}</div>
              <div style={{ flex: 1, fontSize: '0.85rem' }}>{cat.name}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>Rp {cat.amount.toLocaleString()}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', width: '35px', textAlign: 'right' }}>{cat.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingOverview;
