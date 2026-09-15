import React, { useState, useEffect } from 'react';
import { User, ArrowRight, X, Search } from 'lucide-react';

const TopBuyer = () => {
  const [buyers, setBuyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [allBuyers, setAllBuyers] = useState([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://103.89.1.229:3001/api/top-buyers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const formattedData = data.map(b => ({
            name: b.name || 'Unknown',
            value: `Rp ${Number(b.value).toLocaleString('id-ID')}`
          }));
          setBuyers(formattedData);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch top buyers:', err);
        setIsLoading(false);
      });
  }, []);

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    setSearchTerm(''); // Reset search when opening
    setIsLoadingAll(true);
    fetch('http://103.89.1.229:3001/api/top-buyers?limit=all')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const formattedData = data.map(b => ({
            name: b.name || 'Unknown',
            value: `Rp ${Number(b.value).toLocaleString('id-ID')}`
          }));
          setAllBuyers(formattedData);
        }
        setIsLoadingAll(false);
      })
      .catch(err => {
        console.error('Failed to fetch all buyers:', err);
        setIsLoadingAll(false);
      });
  };

  const renderList = (dataList) => {
    return dataList.map((buyer, index) => {
      let rankClass = 'rank-other';
      if (index === 0) rankClass = 'rank-1';
      else if (index === 1) rankClass = 'rank-2';
      else if (index === 2) rankClass = 'rank-3';

      return (
        <div key={index} className="list-item">
          <div className={`rank-badge ${rankClass}`}>{index + 1}</div>
          <div className="avatar">
            <User size={18} color="#7f8ea3" />
          </div>
          <div className="list-text">{buyer.name}</div>
          <div className="list-value positive">{buyer.value}</div>
        </div>
      );
    });
  };

  const filteredAllBuyers = allBuyers.filter(buyer => 
    buyer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="glass-card">
        <div className="section-header">
          <div className="section-title-container">
            <div className="icon-box title-icon">
              <User size={20} color="#7f8ea3" />
            </div>
            <h3 className="section-title">Top Buyer</h3>
          </div>
          <a href="#" className="link-all" onClick={openModal}>Lihat Semua <ArrowRight size={14} /></a>
        </div>
        <div className="list-container">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Memuat data...
            </div>
          ) : buyers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Belum ada data
            </div>
          ) : (
            renderList(buyers)
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header" style={{ marginBottom: '1rem' }}>
              <h3 className="modal-title">Semua Top Buyer</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ marginBottom: '1rem', position: 'relative' }}>
              <Search size={16} color="#7f8ea3" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input 
                type="text" 
                placeholder="Cari nama pemain..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.6rem 0.75rem 0.6rem 2.5rem', 
                  borderRadius: '8px', 
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
              {isLoadingAll ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Memuat semua data...
                </div>
              ) : filteredAllBuyers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {searchTerm ? 'Pemain tidak ditemukan' : 'Belum ada data'}
                </div>
              ) : (
                renderList(filteredAllBuyers)
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBuyer;
