// WorkoutBox.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const WorkoutBox: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const startWorkout = () => {
    if (isAuthenticated) {
      navigate('/workout')
    } else {
      loginWithRedirect();
    }
  };

  const navigate = useNavigate();

  return (
    <div className="workout-box">
      <p>Start a new workout?</p>
      {isAuthenticated && (
        <button onClick={startWorkout}>Let's Go!</button>)}
      {!isAuthenticated && (
        <button onClick={() => navigate("/login")}>You need to be logged in</button>
      )}
    </div>
  );
};

export default WorkoutBox;