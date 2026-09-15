import React, { useState } from 'react';
import { ReceiptText, ArrowRight, TrendingUp, Building, Zap, Receipt, LayoutGrid, X, ChevronLeft, ChevronRight, Info, Edit2, Trash2, Check, XCircle } from 'lucide-react';

const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getIcon = (category) => {
  switch (category) {
    case 'promotion': return <TrendingUp size={18} color="var(--accent-green)" />;
    case 'rent': return <Building size={18} color="var(--accent-blue)" />;
    case 'wns': return <Zap size={18} color="#facc15" />;
    case 'exp': return <Receipt size={18} color="var(--accent-red)" />;
    case 'others': return <LayoutGrid size={18} color="#7f8ea3" />;
    case 'revenue': return <TrendingUp size={18} color="var(--accent-green)" />;
    case 'other': return <LayoutGrid size={18} color="#7f8ea3" />;
    default: return <ReceiptText size={18} color="var(--text-secondary)" />;
  }
};

const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const RecentActivity = ({ transactions = [], selectedMonth, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMonth, setModalMonth] = useState(selectedMonth || 'Aug');
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const listRef = React.useRef(null);

  React.useEffect(() => {
    if (selectedMonth && !isModalOpen) {
      setModalMonth(selectedMonth);
    }
  }, [selectedMonth, isModalOpen]);

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [selectedMonth]);

  const currentActivities = transactions.filter(t => {
    if (!t.date) return false;
    const dateObj = new Date(t.date);
    const m = monthsList[dateObj.getMonth()];
    return m === selectedMonth;
  });

  const modalIncomes = transactions.filter(t => {
    if (!t.date || t.type !== 'income') return false;
    const dateObj = new Date(t.date);
    return monthsList[dateObj.getMonth()] === modalMonth;
  });

  const modalExpenses = transactions.filter(t => {
    if (!t.date || t.type !== 'expense') return false;
    const dateObj = new Date(t.date);
    return monthsList[dateObj.getMonth()] === modalMonth;
  });

  const nextMonth = () => {
    const idx = monthsList.indexOf(modalMonth);
    if (idx < 11) setModalMonth(monthsList[idx + 1]);
  };

  const prevMonth = () => {
    const idx = monthsList.indexOf(modalMonth);
    if (idx > 0) setModalMonth(monthsList[idx - 1]);
  };

  const handleEditSubmit = (e, txn) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onUpdate(txn.id, {
      ...txn,
      name: formData.get('name'),
      date: formData.get('date'),
      category: formData.get('category'),
      amount: Number(formData.get('amount')),
      description: formData.get('description')
    });
    setEditingId(null);
  };

  const renderTransactionItem = (txn, index) => {
    const uniqueId = txn.id || `fallback-${index}`;
    const isIncome = txn.type === 'income';
    return (
      <div key={uniqueId} style={{ background: 'var(--glass-bg-2)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', border: '1px solid var(--glass-border)' }}>
        {editingId === uniqueId ? (
          <form onSubmit={(e) => handleEditSubmit(e, txn)}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nama</label>
                <input type="text" name="name" defaultValue={txn.name} required style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tanggal</label>
                <input type="date" name="date" defaultValue={txn.date} required style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Kategori</label>
                <select name="category" defaultValue={txn.category} required style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)' }}>
                  {isIncome ? (
                    <>
                      <option value="revenue">Pendapatan</option>
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
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nominal (Rp)</label>
                <input type="number" name="amount" defaultValue={txn.amount} required style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Deskripsi</label>
                <textarea name="description" defaultValue={txn.description} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button type="button" onClick={() => setEditingId(null)} style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <XCircle size={16} /> Batal
              </button>
              <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: 'var(--accent-green)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={16} /> Simpan
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="expense-modal-item">
              <div className="expense-modal-info">
                <div className="avatar">
                  {getIcon(txn.category)}
                </div>
                <div className="expense-modal-text">
                  <div className="expense-modal-name">{txn.name || 'Activity'}</div>
                  <div className="expense-modal-date">{txn.date} • <span style={{textTransform: 'uppercase'}}>{txn.category}</span></div>
                </div>
              </div>
              
              <div className="expense-modal-actions">
                <div className="expense-modal-amount" style={{ color: isIncome ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                  {isIncome ? '+' : '-'} {formatRupiah(txn.amount)}
                </div>
                <div className="expense-modal-buttons">
                  <button onClick={() => setExpandedId(expandedId === uniqueId ? null : uniqueId)} title="Detail" className="action-btn modal-action-btn">
                    <Info size={18} />
                  </button>
                  <button onClick={() => setEditingId(uniqueId)} title="Edit" className="action-btn modal-action-btn edit-btn">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => setDeleteConfirmId(txn.id)} title="Hapus" className="action-btn modal-action-btn delete-btn">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {expandedId === uniqueId && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Catatan:</div>
                <div style={{ marginTop: '4px', lineHeight: '1.5' }}>{txn.description || <i>Tidak ada catatan tambahan.</i>}</div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="section-header">
          <div className="section-title-container">
            <div className="icon-box title-icon">
              <ReceiptText size={20} color="#7f8ea3" />
            </div>
            <h3 className="section-title">Recent Activity</h3>
          </div>
          <button 
            className="link-all" 
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            onClick={() => setIsModalOpen(true)}
          >
            Lihat Semua <ArrowRight size={14} />
          </button>
        </div>
        <div className="list-container" ref={listRef} style={{ overflowY: 'auto', paddingRight: '0.5rem', maxHeight: '34rem' }}>
          {currentActivities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Belum ada transaksi
            </div>
          ) : (
            currentActivities.map((txn, index) => {
              const isIncome = txn.type === 'income';
              return (
                <div key={index} className="list-item">
                  <div className="avatar">
                    {getIcon(txn.category)}
                  </div>
                  <div className="list-text">
                    <div style={{ fontWeight: '500' }}>{txn.name || 'Activity'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{txn.category || 'N/A'}</div>
                  </div>
                  <div className="list-value" style={{ color: isIncome ? 'var(--accent-green)' : 'var(--accent-red)', textAlign: 'right' }}>
                    <div>{isIncome ? '+' : '-'} {formatRupiah(txn.amount)}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>{txn.date || 'Today'}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '1000px', width: '95%', maxHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '1.5rem' }}>
            <div className="modal-header" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem', flexShrink: 0, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={prevMonth} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><ChevronLeft size={24} /></button>
                <h3 className="modal-title" style={{ margin: 0, minWidth: '100px', textAlign: 'center' }}>{modalMonth}</h3>
                <button onClick={nextMonth} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><ChevronRight size={24} /></button>
              </div>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', overflow: 'hidden' }}>
              {/* Left Column: Incomes */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h4 style={{ textAlign: 'center', color: 'var(--accent-green)', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '1rem' }}>Pemasukan</h4>
                <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
                  {modalIncomes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                      Tidak ada pemasukan di bulan {modalMonth}
                    </div>
                  ) : (
                    modalIncomes.map(renderTransactionItem)
                  )}
                </div>
              </div>

              {/* Right Column: Expenses */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h4 style={{ textAlign: 'center', color: 'var(--accent-red)', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '1rem' }}>Pengeluaran</h4>
                <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
                  {modalExpenses.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                      Tidak ada pengeluaran di bulan {modalMonth}
                    </div>
                  ) : (
                    modalExpenses.map(renderTransactionItem)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)} style={{ zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', width: '90%', padding: '2rem', textAlign: 'center', borderRadius: '16px' }}>
            <Trash2 size={48} color="var(--accent-red)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Hapus Transaksi?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Apakah Anda yakin ingin menghapus transaksi ini? Data ini akan dihapus secara permanen dari perhitungan kas Anda.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setDeleteConfirmId(null)} 
                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: '500' }}
              >
                Batal
              </button>
              <button 
                onClick={() => { onDelete(deleteConfirmId); setDeleteConfirmId(null); }} 
                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'var(--accent-red)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: '500' }}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentActivity;
