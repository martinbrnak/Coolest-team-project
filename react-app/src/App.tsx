// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Sidebar.css';
import './App.css';
import HistoryPage from './HistoryPage';
import LoginPage from './LoginPage';
import ExercisesPage from './ExercisesPage';
import HomePage from './HomePage';
import PlansPage from './PlansPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
        </main>
      </div>
    </Router>
  );
};

export default App;
