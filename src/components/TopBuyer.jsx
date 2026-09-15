import React, { useState, useEffect } from 'react';
import { User, ArrowRight } from 'lucide-react';

const TopBuyer = () => {
  const [buyers, setBuyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://103.89.1.229:3001/api/top-buyers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Format value as IDR
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

  return (
    <div className="glass-card">
      <div className="section-header">
        <div className="section-title-container">
          <div className="icon-box title-icon">
            <User size={20} color="#7f8ea3" />
          </div>
          <h3 className="section-title">Top Buyer</h3>
        </div>
        <a href="#" className="link-all">Lihat Semua <ArrowRight size={14} /></a>
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
          buyers.map((buyer, index) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default TopBuyer;
