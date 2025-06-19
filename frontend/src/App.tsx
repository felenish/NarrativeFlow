import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';

const Home = () => <div>Welcome to Narrative Flow!</div>;

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here */}
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
