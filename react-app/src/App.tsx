// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar.tsx';
import './Sidebar.css';
import './App.css';
import HistoryPage from './HistoryPage.tsx';
import LoginPage from './LoginPage.tsx';
import ExercisesPage from './ExercisesPage.tsx';
import HomePage from './HomePage.tsx';
import PlansPage from './PlansPage.tsx';
import ExerciseList from './exercise.js';


const App: React.FC = () => {
  return (

    <div className="app">
      <Router>
        <div className="app">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
            </Routes>
          </main>
        </div>
      </Router>
      <main className="main-content">
        {/* Render your content directly here */}
        <ExerciseList />
      </main>
    </div>

  );
};

export default App;
