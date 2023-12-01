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
import ExerciseList from './Exercise.tsx';
import { Auth0Provider } from '@auth0/auth0-react';




const App: React.FC = () => {
  return (


    <div className="app">
      <Router>
        <Auth0Provider
          domain="dev-ra4mhrpcnf2e1xtu.us.auth0.com"
          clientId="FZD4oquHkioFyUqUlUNV4CewMMEoWMlS"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
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


        </Auth0Provider>
      </Router>

    </div>

  );
};

export default App;
