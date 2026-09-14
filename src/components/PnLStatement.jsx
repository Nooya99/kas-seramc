import React from 'react';
import { FileText, Calendar } from 'lucide-react';
import { getCategoryBreakdown } from './SpendingOverview';

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

const PnLStatement = ({ monthlyData, month }) => {
  const displayMonth = month ? (monthMap[month] || month.toUpperCase()) : 'SEMUA BULAN';
  const data = monthlyData || { income: 0, expense: 0, balance: 0 };
  const incomeFormatted = `Rp ${data.income.toLocaleString('id-ID')}`;
  
  const categoriesData = data.categories || {};
  const categories = getCategoryBreakdown(categoriesData, data.expense);
  const getCatAmount = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? `Rp ${cat.amount.toLocaleString('id-ID')}` : 'Rp 0';
  };
  
  const totalExpenseFormatted = `- Rp ${data.expense.toLocaleString('id-ID')}`;
  const netProfit = data.income - data.expense;
  const netProfitFormatted = `${netProfit < 0 ? '-' : ''}Rp ${Math.abs(netProfit).toLocaleString('id-ID')}`;


  return (
    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
      <div className="section-header" style={{ padding: '1.25rem', marginBottom: 0 }}>
        <div className="section-title-container">
          <div className="icon-box title-icon">
            <FileText size={20} color="#7f8ea3" />
          </div>
          <h3 className="section-title">PnL Statement</h3>
        </div>
        <div className="month-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--box-bg)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <Calendar size={14} />
          <span style={{ fontWeight: 500 }}>{displayMonth}</span>
        </div>
      </div>
      <div className="table-responsive">
        <table className="pnl-table">
          <thead>
            <tr>
              <th>KETERANGAN</th>
              <th style={{ textAlign: 'right' }}>AMOUNT (IDR)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="total-row" style={{ backgroundColor: 'var(--box-green)' }}>
              <td>REVENUE / PENDAPATAN</td>
              <td></td>
            </tr>
            <tr>
              <td>Pendapatan Server</td>
              <td className="text-right">{incomeFormatted}</td>
            </tr>
            <tr className="total-row" style={{ backgroundColor: 'var(--box-green)' }}>
              <td>TOTAL REVENUE</td>
              <td className="text-right">{incomeFormatted}</td>
            </tr>
            <tr className="total-row" style={{ backgroundColor: 'var(--box-red)' }}>
              <td>EXPENSES / BEBAN</td>
              <td></td>
            </tr>
            <tr>
              <td>WNS</td>
              <td className="text-right">{getCatAmount('wns')}</td>
            </tr>
            <tr>
              <td>EXP</td>
              <td className="text-right">{getCatAmount('exp')}</td>
            </tr>
            <tr>
              <td>PROMOTION</td>
              <td className="text-right">{getCatAmount('promotion')}</td>
            </tr>
            <tr>
              <td>RENT</td>
              <td className="text-right">{getCatAmount('rent')}</td>
            </tr>
            <tr>
              <td>Others</td>
              <td className="text-right">{getCatAmount('others')}</td>
            </tr>
            <tr className="total-row" style={{ color: 'var(--accent-red)', backgroundColor: 'var(--box-red)' }}>
              <td>TOTAL EXPENSES</td>
              <td className="text-right">{totalExpenseFormatted}</td>
            </tr>
            <tr className="profit-row">
              <td style={{ color: netProfit < 0 ? 'var(--accent-red)' : undefined }}>NET PROFIT / LABA BERSIH</td>
              <td className="text-right" style={{ color: netProfit < 0 ? 'var(--accent-red)' : undefined }}>{netProfitFormatted}</td>
            </tr>
            <tr className="profit-row">
              <td style={{ color: netProfit < 0 ? 'var(--accent-red)' : undefined }}>NET PROFIT MARGIN</td>
              <td className="text-right" style={{ color: netProfit < 0 ? 'var(--accent-red)' : undefined, fontSize: '1.25rem' }}>
                {data.income > 0 ? ((netProfit / data.income) * 100).toFixed(1) : 0}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PnLStatement;
