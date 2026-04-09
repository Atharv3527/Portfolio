import React from 'react';
import './ParticleDivider.css';

export const ParticleDivider = () => {
  return (
    <div className="particle-divider-container">
      <div className="divider-line">
        <div className="divider-pulse"></div>
        <div className="divider-glow-left"></div>
        <div className="divider-glow-right"></div>
      </div>
      <div className="divider-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
    </div>
  );
};
