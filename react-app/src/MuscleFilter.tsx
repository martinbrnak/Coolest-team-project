// MuscleFilter.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';

interface Muscle {
  id: number;
  name: string;
  name_en: string;
}

interface MuscleFilterProps {
  onSelect: (muscle: Muscle | null) => void;
}

const MuscleFilter: React.FC<MuscleFilterProps> = ({ onSelect }) => {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle | null>(null);

  useEffect(() => {
    const fetchMuscles = async () => {
      try {
        const response = await fetch('https://wger.de/api/v2/muscle/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMuscles(data.results);
      } catch (error) {
        console.error('Error fetching muscles:', error);
      }
    };

    fetchMuscles();
  }, []);

  const handleMuscleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const muscleId = parseInt(event.target.value, 10);
    const selectedMuscle = muscles.find((muscle) => muscle.id === muscleId) || null;
    setSelectedMuscle(selectedMuscle);
    onSelect(selectedMuscle);
  };

  return (
    <div>
      <label htmlFor="muscleSelect">Select Muscle:</label>
      <select id="muscleSelect" value={selectedMuscle ? selectedMuscle.id : ''} onChange={handleMuscleSelect}>
        <option value="">All Muscles</option>
        {muscles.map((muscle) => (
          <option key={muscle.id} value={muscle.id}>
            {muscle.name_en || muscle.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MuscleFilter;
