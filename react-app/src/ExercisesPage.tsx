// Rest of your code for ExercisesPage.tsx
import React, { useState } from 'react';
import ExerciseList from './Exercise.tsx';
import ExerciseDetails from './ExerciseDetails.tsx';


interface Muscle {
  id: number;
  name: string;
}

interface Equipment {
  id: number;
  name: string;
}

interface Exercise {
  id: number;
  name: string;
  description: string;
  exercise_base: string;
  muscles: number;
  equipment: number;
}



const ExercisesPage: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleMuscleSelect = (muscle: Muscle | null) => {
    setSelectedMuscle(muscle);
  };

  const handleEquipmentSelect = (equipment: Equipment | null) => {
    setSelectedEquipment(equipment);
  }

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const closeModal = () => {
    setSelectedExercise(null);
  };

  return (
    <div>
      <main className="main-content">
        <h1>Exercises</h1>
        <ExerciseList
          selectedMuscle={selectedMuscle}
          onMuscleSelect={handleMuscleSelect}
          selectedEquipment={selectedEquipment}
          onEquipmentSelect={handleEquipmentSelect}
          selectedExercise={selectedExercise}
          onExerciseSelect={handleExerciseClick}
        />
      </main>
    </div>
  );
};

export default ExercisesPage;
