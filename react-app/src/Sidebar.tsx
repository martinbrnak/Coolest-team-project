import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth0();

  return (
    <div className="sidebar">
      <Link to="/home" className={`sidebar-button ${location.pathname === '/HomePage' ? 'active' : ''}`}>Home</Link>
      <Link to="/exercises" className={`sidebar-button ${location.pathname === '/ExercisesPage' ? 'active' : ''}`}>Exercises</Link>

      {isAuthenticated ? (
        <Link to="/user" className={`sidebar-button ${location.pathname === '/UserPage' ? 'active' : ''}`}>User Page</Link>
      ) : (
        <Link to="/login" className={`sidebar-button ${location.pathname === '/LoginPage' ? 'active' : ''}`}>Login</Link>
      )}

      <Link to="/history" className={`sidebar-button ${location.pathname === '/HistoryPage' ? 'active' : ''}`}>History</Link>
      {isAuthenticated ? (
        <button className="sidebar-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Log Out
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Sidebar;