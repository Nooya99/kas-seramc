import React, { useState } from 'react';
import { Eye, EyeOff, ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, TrendingDown, PiggyBank, RefreshCw } from 'lucide-react';
import MonthDial from './MonthDial';

const SummaryCards = ({ selectedMonth, onMonthChange, monthlyData, theme }) => {
  const [isVisible, setIsVisible] = useState(true);
  const data = monthlyData || { income: 0, expense: 0, balance: 0 };

  // Destructure dynamic data
  const { balance: totalBalance, income: monthlyIncome, expense: monthlyExpenses } = data;
  
  // Kalkulasi Savings & Savings Rate
  const savings = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? (savings / monthlyIncome) * 100 : 0;
  const isNegativeSavings = savings < 0;

  // Format Helper
  const formatRupiah = (value) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    });
    // Menghilangkan 'Rp' bawaan untuk di-custom styling-nya
    const formatted = formatter.format(Math.abs(value)).replace('Rp', '').trim();
    const [main, decimal] = formatted.split(',');
    return { main, decimal };
  };

  const balanceFmt = formatRupiah(totalBalance);
  const incomeFmt = formatRupiah(monthlyIncome);
  const expensesFmt = formatRupiah(monthlyExpenses);

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
            <><span>Rp {balanceFmt.main}</span><span className="decimal">.{balanceFmt.decimal}</span></>
          ) : (
            <span>Rp •••••••</span>
          )}
        </div>
        <div className="card-footer">
          <div className="badge badge-green">
            <ArrowUpRight size={14} /> +5.2%
          </div>
          <span className="footer-text">vs last month</span>
        </div>
      </div>

      {/* Monthly Income Card */}
      <div className="glass-card metric-card">
        <div className="card-header">
          <div className="small-icon green"><Wallet size={12} /></div>
          <span className="card-title" style={{ color: 'var(--accent-green)' }}>Monthly Income</span>
        </div>
        <div className="card-value">
          {isVisible ? (
            <><span>Rp {incomeFmt.main}</span><span className="decimal">.{incomeFmt.decimal}</span></>
          ) : (
            <span>Rp •••••••</span>
          )}
        </div>
        <div className="card-footer">
          <div className="badge badge-green">
            <ArrowUpRight size={14} /> +7.1%
          </div>
          <span className="footer-text">vs last month</span>
        </div>
      </div>

      {/* Monthly Expenses Card */}
      <div className="glass-card metric-card">
        <div className="card-header">
          <div className="small-icon red"><TrendingDown size={12} /></div>
          <span className="card-title" style={{ color: 'var(--accent-red)' }}>Monthly Expenses</span>
        </div>
        <div className="card-value">
          {isVisible ? (
            <><span>Rp {expensesFmt.main}</span><span className="decimal">.{expensesFmt.decimal}</span></>
          ) : (
            <span>Rp •••••••</span>
          )}
        </div>
        <div className="card-footer">
          <div className="badge badge-red">
            <ArrowDownRight size={14} /> -3.6%
          </div>
          <span className="footer-text">vs last month</span>
        </div>
      </div>

      {/* Split Cards: Rate & Amount */}
      <div className="split-cards-container">
        
        {/* Monthly Savings Rate Card */}
        <div className="glass-card metric-card" style={{ padding: '1rem' }}>
          <div className="card-header" style={{ marginBottom: '0.5rem', flexWrap: 'nowrap' }}>
            <div className="small-icon" style={{ width: '20px', height: '20px', background: isNegativeSavings ? 'rgba(225, 78, 101, 0.2)' : 'rgba(26, 176, 126, 0.2)', color: isNegativeSavings ? 'var(--accent-red)' : 'var(--accent-green)' }}>
              <PiggyBank size={10} />
            </div>
            <span className="card-title" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>Monthly Savings Rate</span>
          </div>
          <div className="card-value" style={{ color: isNegativeSavings ? 'var(--accent-red)' : 'var(--accent-green)', fontSize: '2.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            <span>{savingsRate > 0 ? '+' : ''}{savingsRate.toFixed(1)}</span><span className="decimal" style={{ color: isNegativeSavings ? 'var(--accent-red)' : 'var(--accent-green)', fontSize: '1.25rem', marginLeft: '2px' }}>%</span>
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
