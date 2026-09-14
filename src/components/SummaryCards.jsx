   import React, { useState } from 'react';
import { Eye, EyeOff, ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, TrendingDown, PiggyBank, RefreshCw } from 'lucide-react';
import MonthDial from './MonthDial';

const SummaryCards = ({ selectedMonth, onMonthChange, monthlyData, prevMonthData, theme }) => {
  const [isVisible, setIsVisible] = useState(true);
  const data = monthlyData || { income: 0, expense: 0, balance: 0 };
  const prevData = prevMonthData || { income: 0, expense: 0, balance: 0 };

  // Destructure dynamic data
  const { balance: totalBalance, income: monthlyIncome, expense: monthlyExpenses } = data;
  const { balance: prevBalance, income: prevIncome, expense: prevExpenses } = prevData;
  
  // Kalkulasi Savings & Savings Rate
  const savings = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? (savings / monthlyIncome) * 100 : 0;
  const isNegativeSavings = savings < 0;

  // Percentage Calculations
  const getPercentageChange = (current, previous) => {
    if (!previous || previous === 0) return { value: '0.0', isPositive: true };
    const diff = current - previous;
    const percent = (diff / previous) * 100;
    return {
      value: Math.abs(percent).toFixed(1),
      isPositive: diff >= 0
    };
  };

  const balanceChange = getPercentageChange(totalBalance, prevBalance);
  const incomeChange = getPercentageChange(monthlyIncome, prevIncome);
  const expenseChange = getPercentageChange(monthlyExpenses, prevExpenses);

  // Format Helper
  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    // Menghilangkan 'Rp' bawaan untuk di-custom styling-nya
    return formatter.format(Math.abs(value)).replace('Rp', '').trim();
  };

  const balanceFmt = formatRupiah(totalBalance);
  const incomeFmt = formatRupiah(monthlyIncome);
  const expensesFmt = formatRupiah(monthlyExpenses);
  const savingsFmt = formatRupiah(savings);

  return (
    <div className="top-cards-new">
      
      {/* Total Balance Card */}
      <div className="glass-card balance-card">
        <div className="card-header">
          <span className="card-title">Total Balance</span>
          <div onClick={() => setIsVisible(!isVisible)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {isVisible ? <Eye size={16} color="#7f8ea3" /> : <EyeOff size={16} color="#7f8ea3" />}
          </div>
        </div>
        <div className="card-value">
          {isVisible ? (
            <span>Rp {balanceFmt}</span>
          ) : (
            <span>Rp •••••••</span>
          )}
        </div>
        <div className="card-footer">
          <div className={`badge ${balanceChange.isPositive ? 'badge-green' : 'badge-red'}`}>
            {balanceChange.isPositive ? <ArrowUpRight size={22} /> : <ArrowDownRight size={22} />} {balanceChange.isPositive ? '+' : '-'}{balanceChange.value}%
          </div>
          <span className="footer-text">vs last month</span>
        </div>
      </div>

      {/* Monthly Income Card */}
      <div className="glass-card metric-card">
        <div className="card-header">
          <div className="small-icon green" style={{ background: 'transparent' }}><Wallet size={22} /></div>
          <span className="card-title" style={{ color: 'var(--accent-green)' }}>Monthly Income</span>
        </div>
        <div className="card-value">
          {isVisible ? (
            <span>Rp {incomeFmt}</span>
          ) : (
            <span>Rp •••••••</span>
          )}
        </div>
        <div className="card-footer">
          <div className={`badge ${incomeChange.isPositive ? 'badge-green' : 'badge-red'}`}>
            {incomeChange.isPositive ? <ArrowUpRight size={22} /> : <ArrowDownRight size={22} />} {incomeChange.isPositive ? '+' : '-'}{incomeChange.value}%
          </div>
          <span className="footer-text">vs last month</span>
        </div>
      </div>

      {/* Monthly Expenses Card */}
      <div className="glass-card metric-card">
        <div className="card-header">
          <div className="small-icon red" style={{ background: 'transparent' }}><TrendingDown size={22} /></div>
          <span className="card-title" style={{ color: 'var(--accent-red)' }}>Monthly Expenses</span>
        </div>
        <div className="card-value">
          {isVisible ? (
            <span>Rp {expensesFmt}</span>
          ) : (
            <span>Rp •••••••</span>
          )}
        </div>
        <div className="card-footer">
          <div className={`badge ${expenseChange.isPositive ? 'badge-red' : 'badge-green'}`}>
            {expenseChange.isPositive ? <ArrowUpRight size={22} /> : <ArrowDownRight size={22} />} {expenseChange.isPositive ? '+' : '-'}{expenseChange.value}%
          </div>
          <span className="footer-text">vs last month</span>
        </div>
      </div>

      {/* Split Cards: Rate & Amount */}
      <div className="split-cards-container">
        
        {/* Monthly Savings Rate Card */}
        <div className="glass-card metric-card" style={{ padding: '1rem' }}>
          <div className="card-header" style={{ marginBottom: '0.5rem', flexWrap: 'nowrap' }}>
            <div className="small-icon" style={{ background: 'transparent', color: isNegativeSavings ? 'var(--accent-red)' : 'var(--accent-green)' }}>
              <PiggyBank size={22} />
            </div>
            <span className="card-title" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Monthly Savings Rate</span>
          </div>
          <div className="card-value" style={{ color: isNegativeSavings ? 'var(--accent-red)' : 'var(--accent-green)', fontSize: '2.25rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>
            <span>{savingsRate > 0 ? '+' : ''}{savingsRate.toFixed(1)}</span><span className="decimal" style={{ color: isNegativeSavings ? 'var(--accent-red)' : 'var(--accent-green)', fontSize: '1.25rem', marginLeft: '2px' }}>%</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: isNegativeSavings ? 'var(--accent-red)' : 'var(--text-secondary)', fontWeight: '500' }}>
            {isVisible ? `${isNegativeSavings ? '- ' : ''}Rp ${savingsFmt}` : 'Rp •••••••'}
          </div>
        </div>

        {/* Month Dial Knob Card */}
        <div className="glass-card" style={{ padding: '0' }}>
          <MonthDial selectedMonth={selectedMonth} onMonthChange={onMonthChange} theme={theme} />
        </div>

      </div>

    </div>
  );
};

export default SummaryCards;
