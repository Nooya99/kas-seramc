import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarWidget = () => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = i + 1;
    let type = 'future';
    let value = '';
    
    if (date <= 13) {
      if ([3, 5, 11].includes(date)) {
        type = 'orange';
      } else {
        type = 'green';
      }
      const values = {
        1: '289K', 2: '223K', 3: '90K', 4: '131K', 5: '45K',
        6: '566K', 7: '208K', 8: '200K', 9: '470K', 10: '176K',
        11: '45K', 12: '118K', 13: '153K'
      };
      value = values[date];
    }
    
    return { date, type, value };
  });

  return (
    <div className="glass-card calendar-widget" style={{ height: '100%' }}>
      <div className="calendar-header">
        <div className="calendar-title-box">
          <h3 className="calendar-title">Kalender</h3>
          <span className="calendar-subtitle">Total Pendapatan Harian</span>
        </div>
        <div className="calendar-toggle">
          <button className="toggle-btn active">IN</button>
          <button className="toggle-btn">OUT</button>
        </div>
      </div>

      <div className="month-nav">
        <button className="nav-btn"><ChevronLeft size={16} /></button>
        <div className="month-nav-title">September 2026</div>
        <button className="nav-btn"><ChevronRight size={16} /></button>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map((day, idx) => (
          <div key={`header-${idx}`} className="day-header">{day}</div>
        ))}
        
        {/* Empty slots for Sunday and Monday since Sept 2026 starts on Tuesday */}
        <div className="cal-cell empty"></div>
        <div className="cal-cell empty"></div>
        
        {days.map((d) => (
          <div key={d.date} className={`cal-cell ${d.type}`}>
            <span className="cal-date">{d.date}</span>
            {d.value && <span className="cal-value">{d.value}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
