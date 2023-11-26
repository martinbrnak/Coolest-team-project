// Sidebar.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/home" className={`sidebar-button ${location.pathname === '/home' ? 'active' : ''}`}>Home</Link>
      <Link to="/exercises" className={`sidebar-button ${location.pathname === '/exercises' ? 'active' : ''}`}>Exercises</Link>
      <Link to="/login" className={`sidebar-button ${location.pathname === '/login' ? 'active' : ''}`}>Login</Link>
      <Link to="/history" className={`sidebar-button ${location.pathname === '/history' ? 'active' : ''}`}>History</Link>
      <Link to="/plans" className={`sidebar-button ${location.pathname === '/plans' ? 'active' : ''}`}>Plans</Link>
    </div>
  );
};

export default Sidebar;
