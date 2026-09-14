import React, { useState, useRef, useEffect, useCallback } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthDial = ({ selectedMonth, onMonthChange }) => {
  // Find the index of the selectedMonth to set initial rotation
  const initialIndex = months.indexOf(selectedMonth) !== -1 ? months.indexOf(selectedMonth) : 8;
  
  const [rotation, setRotation] = useState(-initialIndex * 30); 
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef(null);

  // For tracking drag state
  const dragState = useRef({
    isDragging: false,
    startAngle: 0,
    startRotation: 0,
    center: { x: 0, y: 0 }
  });

  useEffect(() => {
    if (!dragState.current.isDragging) {
      const index = months.indexOf(selectedMonth);
      if (index !== -1) {
        // Calculate nearest equivalent rotation to prevent spinning multiple times
        const currentRot = rotation;
        const targetRot = -index * 30;
        
        // Find shortest path to target
        let diff = (targetRot - currentRot) % 360;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        
        setRotation(currentRot + diff);
      }
    }
  }, [selectedMonth]);

  const getCenter = () => {
    if (!dialRef.current) return { x: 0, y: 0 };
    const rect = dialRef.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };

  const getAngle = (x, y, center) => {
    const dx = x - center.x;
    const dy = y - center.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = angle + 90;
    return angle;
  };

  const updateActiveMonth = (currentRotation) => {
    let normRot = currentRotation % 360;
    if (normRot < 0) normRot += 360;
    
    const targetAngle = (360 - normRot) % 360;
    const index = Math.round(targetAngle / 30) % 12;
    
    const newMonth = months[index];
    if (newMonth !== selectedMonth && onMonthChange) {
      onMonthChange(newMonth);
    }
  };

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current.isDragging = true;
    dragState.current.center = getCenter();
    dragState.current.startAngle = getAngle(e.clientX, e.clientY, dragState.current.center);
    dragState.current.startRotation = rotation;
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragState.current.isDragging) return;
    const currentAngle = getAngle(e.clientX, e.clientY, dragState.current.center);
    const angleDiff = currentAngle - dragState.current.startAngle;
    const newRotation = dragState.current.startRotation + angleDiff;
    setRotation(newRotation);
    updateActiveMonth(newRotation);
  };

  const handlePointerUp = (e) => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);

    // Snap to nearest 30 degrees
    const snappedRotation = Math.round(rotation / 30) * 30;
    setRotation(snappedRotation);
    updateActiveMonth(snappedRotation);
  };

  const resetToCurrentMonth = (e) => {
    e.stopPropagation();
    const currentMonthIndex = new Date().getMonth(); // Real current month
    const newRotation = -currentMonthIndex * 30;
    setRotation(newRotation);
    
    const newMonth = months[currentMonthIndex];
    if (selectedMonth !== newMonth && onMonthChange) {
      onMonthChange(newMonth);
    }
  };

  return (
    <div className="glass-card dial-card">
      <div className="dial-container">
        {/* The pointer at the top */}
        <div className="dial-indicator"></div>
        
        {/* The rotating dial */}
        <div 
          className="month-dial" 
          ref={dialRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            touchAction: 'none' // Prevent scrolling while rotating on mobile
          }}
        >
          <div 
            className="dial-center-knob" 
            onPointerDown={resetToCurrentMonth}
            style={{ cursor: 'pointer', zIndex: 10 }}
            title="Reset to current month"
          >
             {/* Small visual dots on the knob to make it look spinnable */}
             <div className="knob-dot top"></div>
             <div className="knob-dot bottom"></div>
             <div className="knob-dot left"></div>
             <div className="knob-dot right"></div>
          </div>
          
          {months.map((month, i) => {
            const angle = i * 30;
            return (
              <div 
                key={month} 
                className="month-label-container"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div 
                  className={`month-label ${selectedMonth === month ? 'active' : ''}`}
                  // Counter-rotate the text so it stays upright
                  style={{ transform: `rotate(${-angle - rotation}deg)` }}
                >
                  {month}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthDial;
