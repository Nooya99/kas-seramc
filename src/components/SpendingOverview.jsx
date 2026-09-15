import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { TrendingUp, Building, Zap, Receipt, LayoutGrid, PieChart } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip);

export const baseCategories = [
  { id: 'promotion', name: 'PROMOTION', percent: 40, icon: <TrendingUp size={22} />, color: '#1ab07e' },
  { id: 'rent', name: 'RENT', percent: 30, icon: <Building size={22} />, color: '#2a6ee5' },
  { id: 'wns', name: 'WNS', percent: 15, icon: <Zap size={22} />, color: '#facc15' },
  { id: 'exp', name: 'EXP', percent: 10, icon: <Receipt size={22} />, color: '#e14e65' },
  { id: 'others', name: 'Others', percent: 5, icon: <LayoutGrid size={22} />, color: '#7f8ea3' },
];

export const getCategoryBreakdown = (categoriesData = {}, totalExpense = 0) => {
  if (totalExpense === 0) {
    return baseCategories.map(cat => ({ ...cat, amount: 0, percent: 0 }));
  }

  let processedCats = baseCategories.map(cat => {
    const amount = categoriesData[cat.id] || 0;
    const percent = Math.round((amount / totalExpense) * 100);
    return {
      ...cat,
      amount,
      percent
    };
  });

  return processedCats.sort((a, b) => b.amount - a.amount);
};

const monthMap = {
  'Jan': 'JANUARI',
  'Feb': 'FEBRUARI',
  'Mar': 'MARET',
  'Apr': 'APRIL',
  'May': 'MEI',
  'Jun': 'JUNI',
  'Jul': 'JULI',
  'Aug': 'AGUSTUS',
  'Sep': 'SEPTEMBER',
  'Oct': 'OKTOBER',
  'Nov': 'NOVEMBER',
  'Dec': 'DESEMBER'
};

const SpendingOverview = ({ monthlyData, month = 'Jan' }) => {
  const displayMonth = month ? (monthMap[month] || month.toUpperCase()) : 'SEMUA BULAN';
  const totalExpense = monthlyData?.expense || 0;
  const categoriesData = monthlyData?.categories || {};
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
      animateScale: true,
      animateRotate: true
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` Rp ${context.raw.toLocaleString()}`
        }
      }
    },
  };

  const categories = useMemo(() => {
    return getCategoryBreakdown(categoriesData, totalExpense);
  }, [categoriesData, totalExpense]);

  const topCategory = categories[0];
  const totalAmount = totalExpense;

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
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="section-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.1rem' }}>
            <PieChart size={20} color="var(--text-secondary)" />
          </div>
          <div>
            <h3 className="section-title">Spending Overview</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{displayMonth} 2026</p>
          </div>
        </div>
        <div className="spending-total" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rp {totalAmount.toLocaleString()}</div>
      </div>
      
      <div className="spending-overview">
        <div className="spending-chart" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="chart-container-responsive" style={{ position: 'relative', width: '100%', maxWidth: '20rem', aspectRatio: '1/1', maxHeight: '20rem' }}>
            <Doughnut data={data} options={options} />
            <div style={{ 
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none'
            }}>
              <span className="chart-center-label" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Top Category</span>
              <span className="chart-center-value" style={{ fontSize: '1.1rem', fontWeight: '600', textAlign: 'center', padding: '0 10px', color: topCategory?.color }}>
                {topCategory?.name || 'N/A'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="spending-legend" style={{ width: '100%' }}>
          {categories.map((cat, idx) => (
            <div key={cat.id} className="legend-row" style={{ 
              display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', alignItems: 'center', 
              padding: '0.6rem 0', borderBottom: '1px solid var(--glass-border)', gap: '0.75rem',
              width: '100%'
            }}>
              <div style={{ color: cat.color, display: 'flex', alignItems: 'center' }}>{cat.icon}</div>
              <div className="legend-text" style={{ fontSize: '1rem', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.name}</div>
              <div className="legend-text amount" style={{ fontSize: '1rem', fontWeight: '600', whiteSpace: 'nowrap', textAlign: 'right' }}>Rp {cat.amount.toLocaleString()}</div>
              <div className="legend-text percent" style={{ fontSize: '1rem', color: 'var(--text-secondary)', textAlign: 'right', whiteSpace: 'nowrap' }}>{cat.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingOverview;
