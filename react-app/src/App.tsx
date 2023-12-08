// App.tsx

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar.tsx';
import './Sidebar.css';
import './App.css';
import HistoryPage from './HistoryPage.tsx';
import LoginPage from './LoginPage.tsx';
import ExercisesPage from './ExercisesPage.tsx';
import HomePage from './HomePage.tsx';
import PlansPage from './PlansPage.tsx';
import UserPage from './UserPage.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import WorkoutPage from './WorkoutPage.tsx';



const App: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log(JSON.stringify(user));

  const handleLogin = async () => {
    console.log('handle login is called');
    console.log(isAuthenticated);
    if (isAuthenticated) {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
    }
  }

  useEffect(() => {
    handleLogin();
  });

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
              <Route path="/user" element={<UserPage />} />
              <Route path="/workout" element={<WorkoutPage />} />
            </Routes>
          </main>
        </div>
      </Router>

    </div>

  );
};

export default App;
