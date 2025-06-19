import React from 'react';
import Sidebar from './Sidebar';
import MainPanel from './MainPanel';
import './AppShell.css';

const AppShell: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="app-shell">
    <Sidebar />
    <MainPanel>{children}</MainPanel>
  </div>
);

export default AppShell;
