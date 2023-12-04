import React, { useState, useEffect, ChangeEvent } from 'react';
import './exercise.css';

interface Exercise {
  id: number;
  name: string;
  description: string;
  exercise_base: string;
  muscles: number;
  // Add any other properties based on the actual data structure
}
interface Muscle {
  id: number;
  name: string;
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
            {muscle.name}
          </option>
        ))}
      </select>
    </div>
  );
};


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

const ExerciseList: React.FC = () => {
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMuscleGroup, setFilterMuscleGroup] = useState<string | null>(null);

  const url = "https://wger.de/api/v2/exercise/?language=2"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: { results: Exercise[] } = await response.json();
        setExerciseData(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };


  return (
    <div>
      <h1>Exercise List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='exercise-box'>
          {exerciseData.map((exercise) => (
            <li key={exercise.id}>
              <strong>{exercise.name}</strong>
              <p>{stripHtmlTags(exercise.description)}</p>
              <p>Muscle Group: {exercise.muscles}</p>
            </li>
            //            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseList;