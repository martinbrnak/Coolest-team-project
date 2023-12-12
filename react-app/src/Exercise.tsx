// Exercise.tsx
import React, { useState, useEffect } from 'react';
import MuscleFilter from './MuscleFilter.tsx';
import EquipmentFilter from './EquipmentFilter.tsx';
import ExerciseDetails from './ExerciseDetails.tsx';
import './exercise.css';

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
  exercise_base: number;
  muscles: number;
  equipment: number;
}

interface ExerciseProps {
  exercise: Exercise;
  onClick: (exercise: Exercise) => void;
}

interface ExerciseListProps {
  selectedMuscle: Muscle | null;
  onMuscleSelect: (muscle: Muscle | null) => void;
  selectedEquipment: Equipment | null;
  onEquipmentSelect: (muscle: Muscle | null) => void;
}



const ExerciseList: React.FC<ExerciseListProps> = ({ selectedMuscle, onMuscleSelect, selectedEquipment, onEquipmentSelect, onExerciseSelect }) => {
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://wger.de/api/v2/exercise/?language=2&limit=100"
        var apiUrl = selectedMuscle
          ? url + `&muscles=${selectedMuscle.id}`
          : url
        const equipmentUrl = selectedEquipment
          ? apiUrl + `&equipment=${selectedEquipment.id}`
          : apiUrl

        apiUrl = equipmentUrl;

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
  }, [selectedMuscle, selectedEquipment]);

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const closeModal = () => {
    setSelectedExercise(null);
  };

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const Exercise: React.FC<ExerciseProps> = ({ exercise, onClick }) => {
    const handleClick = () => {
      onClick(exercise);
    };

    return (
      <div className='exercise-box' onClick={handleClick}>
        <strong>{exercise.name}</strong>
        <p>{stripHtmlTags(exercise.description)}</p>
      </div>
    );
  };


  return (
    <div>
      <div>
        <MuscleFilter onSelect={onMuscleSelect} />
        <EquipmentFilter onSelect={onEquipmentSelect} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='exercise-box'>
          {exerciseData.map((exercise) => (
            <div key={exercise.id} onClick={() => handleExerciseClick(exercise)}>
              {/* Exercise component modified to be clickable */}
              <strong>{exercise.name}</strong>
              <p>{stripHtmlTags(exercise.description)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Render the ExerciseDetails modal when an exercise is selected */}
      {selectedExercise && (
        <ExerciseDetails exercise={selectedExercise} onClose={closeModal} />
      )}
    </div>
  );
};

export default ExerciseList;
