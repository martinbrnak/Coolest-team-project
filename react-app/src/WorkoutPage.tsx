// WorkoutPage.tsx
import React, { useState, useEffect } from 'react';
import MuscleFilter from './MuscleFilter.tsx';
import EquipmentFilter from './EquipmentFilter.tsx';
import "./WorkoutPage.css";
import { array } from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

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

interface Workout {
  exercise: Array<number>;
  reps: Array<number>;
  Weight: Array<number>;
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


    </div>
  );
};


const WorkoutPage: React.FC<ExerciseListProps> = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isNewWorkout, setIsNewWorkout] = useState(false);
  const [workout, setWorkout] = useState<Workout>({ exercise: [], reps: [], Weight: [] });
  const [isAddingExercise, setIsAddingExercise] = useState(false)

  const handleMuscleSelect = (muscle: Muscle | null) => {
    setSelectedMuscle(muscle);
  };

  const handleEquipmentSelect = (equipment: Equipment | null) => {
    setSelectedEquipment(equipment);
  }

  const handleStartNewWorkout = () => {
    // Placeholder for handling the start of a new workout
    setIsNewWorkout(true);
  }

  const navigate = useNavigate();
  const handleSaveWorkout = () => {
    // TODO: Implement save workout logic
    {/* TODO: The save workout will then put all of the
        Exercises into the db */}
    console.log('Saving workout:', workout);
    navigate('/history');
  };

  const handleAddNewExercise = () => {
    setIsAddingExercise(true);
    console.log("Add new Exercise, shows exercise list and able to click")
  }

  const handleAddToWorkout = (exerciseId: number) => {
    if (!workout.exercise.includes(exerciseId)) {
      setWorkout(prevWorkout => ({
        ...prevWorkout,
        exercise: [...prevWorkout.exercise, exerciseId],
      }));
      console.log(`Exercise ${exerciseId} added to the workout!`);
    } else {
      console.log(`Exercise ${exerciseId} is already in the workout.`);
    }
  }



  const handleStartPreset = (presetName: string) => {
    // Placeholder for handling the start of a preset workout
    setIsNewWorkout(true);
    console.log(`Starting ${presetName} workout...`);
    if (presetName = 'Pull') {
      console.log(`We would add Pull exercises`)
    }
    else if (presetName = 'Push') {
      console.log(`We would add Push exercises`)
    }
    else if (presetName = 'Leg') {
      console.log(`We would add Leg day exercises`)
    }
    else {
      console.log(`Unknown Preset Error`)
    }
  };



  return (
    <div>
      <div className='NewBox'>
        <button className='StartNewButton' onClick={handleStartNewWorkout}>Start new Workout</button>
      </div>
      <div className='PresetBox'>
        <h1>Select one from the following presets</h1>
        <button className='StartPresetButtons' onClick={() => handleStartPreset('Push')}>Push Day</button>
        <button className='StartPresetButtons' onClick={() => handleStartPreset('Pull')}>Pull Day</button>
        <button className='StartPresetButtons' onClick={() => handleStartPreset('Leg')}>Leg Day</button>
      </div>

      {isNewWorkout && (
        <div className='NewWorkout'>
          {isAddingExercise && (
            <div>
              <div className='ExerciseBox'>
                <WorkoutExerciseList
                  onMuscleSelect={handleMuscleSelect}
                  onEquipmentSelect={handleEquipmentSelect}
                  selectedMuscle={selectedMuscle}
                  selectedEquipment={selectedEquipment}
                />
              </div>
            </div>
          )}
          {!isAddingExercise && (
            <div>
              <button onClick={() => handleAddNewExercise()}>Add a new Exercise</button>
            </div>
          )}

          <div>
            <button onClick={() => { { !isAddingExercise && (setIsNewWorkout(false)); }; { isAddingExercise && (setIsAddingExercise(false)); } }}>Cancel / Return</button>
          </div>
          {workout.exercise.length > 0 && (
            <div>
              <button onClick={() => handleSaveWorkout}> Save Workout </button>
            </div>
          )}

        </div>
      )
      }


    </div >
  );
};
export default WorkoutPage;