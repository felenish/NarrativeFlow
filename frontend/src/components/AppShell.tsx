import React from 'react';
import Sidebar from './Sidebar.tsx';
import MainPanel from './MainPanel.tsx';
import './AppShell.css';

const AppShell: React.FC = () => (
  <div className="app-shell">
    <Sidebar />
    <MainPanel />
  </div>
);

export default AppShell;
