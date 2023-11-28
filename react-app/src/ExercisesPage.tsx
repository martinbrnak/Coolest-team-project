// ExercisesPage.tsx

import React from 'react';
import ExerciseList from './exercise.js';

const ExercisesPage: React.FC = () => {
  return (
    <div>
      <main className="main-content">
        {/* Render your content directly here */}
        <ExerciseList />
      </main>
    </div>
  );
};

export default ExercisesPage;
