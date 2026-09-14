import React from 'react';
import { ReceiptText, ArrowRight, Megaphone, Server, Monitor, Cloud, Car } from 'lucide-react';

const RecentExpenses = () => {
  const expenses = [];

  return (
    <div className="glass-card">
      <div className="section-header">
        <div className="section-title-container">
          <div className="icon-box title-icon">
            <ReceiptText size={20} color="#7f8ea3" />
          </div>
          <h3 className="section-title">Recent Expenses</h3>
        </div>
        <a href="#" className="link-all">Lihat Semua <ArrowRight size={14} /></a>
      </div>
      <div className="list-container">
        {expenses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Belum ada transaksi
          </div>
        ) : (
          expenses.map((expense, index) => (
            <div key={index} className="list-item">
              <div className="avatar">
                {expense.icon}
              </div>
              <div className="list-text">
                <div style={{ fontWeight: '500' }}>{expense.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{expense.category}</div>
              </div>
              <div className="list-value" style={{ color: 'var(--accent-red)', textAlign: 'right' }}>
                <div>{expense.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>{expense.date}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentExpenses;
