// Sidebar.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  if (!location) {
    // Handle the case when location is null or undefined
    return null; // or some default behavior
  }

  else {
    return (

      <div className="sidebar">
        <Link to="/home" className={`sidebar-button ${location.pathname === '/HomePage' ? 'active' : ''}`}>Home</Link>
        <Link to="/exercises" className={`sidebar-button ${location.pathname === '/ExercisesPage' ? 'active' : ''}`}>Exercises</Link>
        <Link to="/login" className={`sidebar-button ${location.pathname === '/LoginPage' ? 'active' : ''}`}>Login</Link>
        <Link to="/history" className={`sidebar-button ${location.pathname === '/HistoryPage' ? 'active' : ''}`}>History</Link>
        <Link to="/plans" className={`sidebar-button ${location.pathname === '/PlansPage' ? 'active' : ''}`}>Plans</Link>
      </div>
    );
  };
}

export default Sidebar;
