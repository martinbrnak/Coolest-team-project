// WorkoutPage.tsx
import React, { useState, useEffect } from 'react';
import MuscleFilter from './MuscleFilter.tsx';
import EquipmentFilter from './EquipmentFilter.tsx';
import "./WorkoutPage.css";

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
  muscles: number;
  equipment: number;
}



interface ExerciseListProps {
  selectedMuscle: Muscle | null;
  onMuscleSelect: (muscle: Muscle | null) => void;
  selectedEquipment: Equipment | null;
  onEquipmentSelect: (muscle: Muscle | null) => void;
}

const WorkoutExerciseList: React.FC<ExerciseListProps> = ({ selectedMuscle, onMuscleSelect, selectedEquipment, onEquipmentSelect, onExerciseSelect }) => {
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

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
            <div key={exercise.id} >
              <p>{exercise.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Render the ExerciseDetails modal when an exercise is selected */}
    </div>
  );
};


const WorkoutPage: React.FC<ExerciseListProps> = () => {
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
      <div className='NewBox'>
        <button className='StartNewButton'>Start new Workout</button>
      </div>
      <div className='PresetBox'>
        <h1>Select one from the following presets</h1>
        <button className='StartPresetButtons'>Push Day</button>
        <button className='StartPresetButtons'>Pull Day</button>
        <button className='StartPresetButtons'>Leg Day</button>
      </div>
      <div className='ExerciseBox'>
        <WorkoutExerciseList
          onMuscleSelect={handleMuscleSelect}
          onEquipmentSelect={handleEquipmentSelect}
          selectedMuscle={selectedMuscle}
          selectedEquipment={selectedEquipment}
        />
      </div>

    </div>
  );
};
export default WorkoutPage;