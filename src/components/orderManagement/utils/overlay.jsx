import React from 'react';
import './../styles/overlay.css';

const Overlay = ({ children, onClose }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        {children}
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Overlay;
