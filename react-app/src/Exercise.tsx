// Exercise.tsx
import React, { useState, useEffect } from 'react';
import MuscleFilter from './MuscleFilter.tsx'; // Adjust the import path
import './exercise.css';

interface Muscle {
  id: number;
  name: string;
}

interface Exercise {
  id: number;
  name: string;
  description: string;
  exercise_base: string;
  muscles: number;
}



interface ExerciseListProps {
  selectedMuscle: Muscle | null;
  onMuscleSelect: (muscle: Muscle | null) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ selectedMuscle, onMuscleSelect }) => {
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = selectedMuscle
          ? `https://wger.de/api/v2/exercise/?language=2&muscles=${selectedMuscle.id}`
          : 'https://wger.de/api/v2/exercise/?language=2';

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExerciseData(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMuscle]);

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const Exercise: React.FC<{ exercise: Exercise }> = ({ exercise }) => (
    <div className='exercise-box'>
      <strong>{exercise.name}</strong>
      <p>{stripHtmlTags(exercise.description)}</p>
    </div>
  );

  return (
    <div>
      <div>
        <MuscleFilter onSelect={onMuscleSelect} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='exercise-box'>
          {exerciseData.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
