// ExercisesPage.tsx
import React, { useState } from 'react';
import ExerciseList from './Exercise.tsx';

const ExercisesPage: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const handleMuscleSelect = (muscle: Muscle | null) => {
    setSelectedMuscle(muscle);
  };

  const handleEquipmentSelect = (equipment: Equipment | null) => {
    setSelectedEquipment(equipment);
  }

  return (
    <div>
      <main className="main-content">
        <h1>Exercises</h1>
        <ExerciseList selectedMuscle={selectedMuscle} onMuscleSelect={handleMuscleSelect} selectedEquipment={selectedEquipment} onEquipmentSelect={handleEquipmentSelect} />
      </main>
    </div>
  );
};

export default ExercisesPage;
