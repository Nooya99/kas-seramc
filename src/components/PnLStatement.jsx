import React from 'react';
import { FileText, Download } from 'lucide-react';

const PnLStatement = () => {
  return (
    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
      <div className="section-header" style={{ padding: '1.25rem', marginBottom: 0 }}>
        <div className="section-title-container">
          <div className="icon-box title-icon">
            <FileText size={20} color="#7f8ea3" />
          </div>
          <h3 className="section-title">PnL Statement</h3>
        </div>
        <button className="btn-download">
          <Download size={14} /> Download
        </button>
      </div>
      <div className="table-responsive">
        <table className="pnl-table">
          <thead>
            <tr>
              <th>KETERANGAN</th>
              <th className="text-right">AMOUNT (IDR)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="total-row">
              <td colSpan={2}>REVENUE / PENDAPATAN</td>
            </tr>
            <tr>
              <td>Pendapatan Server</td>
              <td className="text-right">Rp 0</td>
            </tr>
            <tr className="total-row">
              <td>TOTAL REVENUE</td>
              <td className="text-right">Rp 0</td>
            </tr>
            <tr className="total-row">
              <td colSpan={2}>EXPENSES / BEBAN</td>
            </tr>
            <tr>
              <td>WNS</td>
              <td className="text-right">Rp 0</td>
            </tr>
            <tr>
              <td>EXP</td>
              <td className="text-right">Rp 0</td>
            </tr>
            <tr>
              <td>PROMOTION</td>
              <td className="text-right">Rp 0</td>
            </tr>
            <tr>
              <td>RENT</td>
              <td className="text-right">Rp 0</td>
            </tr>
            <tr className="total-row" style={{ color: 'var(--accent-red)' }}>
              <td>TOTAL EXPENSES</td>
              <td className="text-right">- Rp 0</td>
            </tr>
            <tr className="profit-row">
              <td>NET PROFIT / LABA BERSIH</td>
              <td className="text-right">Rp 0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PnLStatement;
