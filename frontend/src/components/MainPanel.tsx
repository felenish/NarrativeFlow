import React from 'react';
import './MainPanel.css';

const MainPanel: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <main className="main-panel">
    {children}
  </main>
);

export default MainPanel;
