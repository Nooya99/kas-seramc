import React, { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Zap, X } from 'lucide-react';

const QuickActions = ({ onAddTransaction }) => {
  const [activeModal, setActiveModal] = useState(null);

  const actions = [
    { id: 'income', name: 'Add Income', icon: <ArrowDownCircle size={24} color="var(--accent-green)" /> },
    { id: 'expense', name: 'Add Expenses', icon: <ArrowUpCircle size={24} color="var(--accent-red)" /> }
  ];

  const handleClose = () => setActiveModal(null);

  return (
    <>
      <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="section-title-container" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="var(--text-secondary)" />
          </div>
          <h3 className="section-title">Quick Actions</h3>
        </div>
        <div className="quick-actions-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', alignItems: 'center' }}>
          {actions.map((action) => (
            <div 
              key={action.id} 
              className="quick-action-btn"
              onClick={() => setActiveModal(action.id)}
            >
              <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '0.25rem' }}>
                {action.icon}
              </div>
              <span style={{ textAlign: 'center', lineHeight: '1.2' }}>{action.name}</span>
            </div>
          ))}
        </div>
      </div>

      {activeModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {activeModal === 'income' ? 'Add New Income' : 'Add New Expense'}
              </h3>
              <button className="modal-close" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.target);
              if(onAddTransaction) {
                onAddTransaction({
                  type: activeModal,
                  name: formData.get('name'),
                  date: formData.get('date'),
                  category: formData.get('category'),
                  amount: Number(formData.get('amount')),
                  description: formData.get('description')
                });
              }
              handleClose(); 
            }}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>Nama</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Misal: Gaji Bulanan"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg-2)', color: 'var(--text-primary)', outline: 'none' }} 
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>Tanggal</label>
                <input 
                  type="date" 
                  name="date"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg-2)', color: 'var(--text-primary)', outline: 'none' }} 
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>Kategori</label>
                <select name="category" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg-2)', color: 'var(--text-primary)', outline: 'none', appearance: 'none', cursor: 'pointer' }} required defaultValue="">
                  <option value="" disabled>Pilih Kategori...</option>
                  {activeModal === 'income' ? (
                    <>
                      <option value="revenue">Pendapatan / Revenue</option>
                      <option value="other">Lainnya</option>
                    </>
                  ) : (
                    <>
                      <option value="promotion">PROMOTION</option>
                      <option value="rent">RENT</option>
                      <option value="wns">WNS</option>
                      <option value="exp">EXP</option>
                      <option value="others">Others</option>
                    </>
                  )}
                </select>
              </div>
              
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>Jumlah (Rp)</label>
                <input 
                  type="number" 
                  name="amount"
                  placeholder="Misal: 5000000"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg-2)', color: 'var(--text-primary)', outline: 'none' }} 
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>Deskripsi (Opsional)</label>
                <textarea 
                  name="description"
                  placeholder="Keterangan tambahan..."
                  rows="3"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg-2)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }} 
                ></textarea>
              </div>

              <button 
                type="submit"
                style={{ 
                  width: '100%', padding: '0.85rem', borderRadius: '8px', border: 'none', 
                  background: activeModal === 'income' ? 'var(--accent-green)' : 'var(--accent-red)', 
                  color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' 
                }}
              >
                Simpan {activeModal === 'income' ? 'Pemasukan' : 'Pengeluaran'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;
