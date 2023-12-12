// WorkoutPage.tsx
import React, { useState, useEffect } from 'react';
import MuscleFilter from './MuscleFilter.tsx';
import EquipmentFilter from './EquipmentFilter.tsx';
import "./WorkoutPage.css";
import { array } from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { PopupCancelledError } from '@auth0/auth0-react';
import "./fixed-bottom-container.css"

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
  exercise: Array<Exercise>;
  reps: Array<number>;
  weight: Array<number>;
  sets: Array<number>;
}

interface ExerciseListProps {
  selectedMuscle: Muscle | null;
  onMuscleSelect: (muscle: Muscle | null) => void;
  selectedEquipment: Equipment | null;
  onEquipmentSelect: (muscle: Muscle | null) => void;
  onExerciseSelect: (exercise: Exercise) => void;
}

const WorkoutExerciseList: React.FC<ExerciseListProps> = ({
  selectedMuscle,
  onMuscleSelect,
  selectedEquipment,
  onEquipmentSelect,



  onExerciseSelect }) => {
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
              <p>{exercise.id}</p>
              <button onClick={() => onExerciseSelect(exercise)}>Add to Workout</button>
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
  const [workout, setWorkout] = useState<Workout>({ exercise: [], reps: Array.from({ length: 2164 }), weight: Array.from({ length: 2164 }), sets: Array.from({ length: 2164 }) });
  const [isAddingExercise, setIsAddingExercise] = useState(false)
  const [reps, setReps] = useState({});
  const [weights, setWeights] = useState({});
  const [set, setSets] = useState({});
  const { user, isAuthenticated } = useAuth0();

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

  const handleSaveWorkout = async () => {
    console.log('handle save workout called properly');
    if (isAuthenticated) {
      const response = await fetch('http://localhost:8000/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })

      if (response.status === 201) {
        const responseData = await response.json();
        const workoutid = responseData.id;

        for (let i = 0; i < workout.exercise.length; i++) {
          const exerciseData = workout.exercise[i];
          const exerciseToAdd = {
            workout: workoutid,
            reps: workout.reps[exerciseData.id],
            weight: workout.weight[exerciseData.id],
            name: exerciseData.name,
            sets: workout.sets[exerciseData.id] 
          }
          const response = await fetch('http://localhost:8000/exercise', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(exerciseToAdd)
          })
        }
      } else {
        console.log('uh oh! adding workout failed');
        return;
      }

    }
    console.log('Saving workout:', workout);
    navigate('/history');
  };

  const handleAddNewExercise = () => {
    setIsAddingExercise(true);
    console.log("Add new Exercise, shows exercise list and able to click")
  }

  const handleAddToWorkout = (exercise: Exercise) => {
    if (!workout.exercise.some((ex) => ex.id === exercise.id)) {
      setWorkout(prevWorkout => ({
        ...prevWorkout,
        exercise: [...prevWorkout.exercise, exercise],
      }));
      setIsAddingExercise(false);
      console.log(`Exercise ${exercise.name} added to the workout!`);
      console.log(`Exercise array is now ${workout.exercise}`)
    } else {
      console.log(`Exercise ${exercise.name} is already in the workout.`);
    }
  }




  const handleStartPreset = (presetName: string) => {
    // Placeholder for handling the start of a preset workout
    setIsNewWorkout(true);
    console.log(`Starting ${presetName} workout...`);
    if (presetName = 'Pull') {
      const exercise1 = {
        id: 74,
        name: "Biceps Curls With Barbell",
        muscles: 0,
        equipment: 0,
      };
      const exercise2 = {
        id: 213,
        name: "Close-grip Lat Pull Down",
        muscles: 0,
        equipment: 0,
      };
      const exercise3 = {
        id: 105,
        name: "Deadlifts",
        muscles: 0,
        equipment: 0,
      };
      setWorkout({ exercise: [ exercise1, exercise2, exercise3 ], reps: Array.from({ length: 2164 }), weight: Array.from({ length: 2164 }), sets: Array.from({ length: 2164 })});
    }
    else if (presetName = 'Push') {
      const exercise1 = {
        id: 192,
        name: "Bench Press",
        muscles: 0,
        equipment: 0,
      };
      const exercise2 = {
        id: 227,
        name: "Arnold Shoulder Press",
        muscles: 0,
        equipment: 0,
      };
      const exercise3 = {
        id: 344,
        name: "Barbell Triceps Extension",
        muscles: 0,
        equipment: 0,
      };
      setWorkout({ exercise: [ exercise1, exercise2, exercise3 ], reps: Array.from({ length: 2164 }), weight: Array.from({ length: 2164 }), sets: Array.from({ length: 2164 })});
    }
    else if (presetName = 'Leg') {
      const exercise1 = {
        id: 1101,
        name: "Barbell Squat",
        muscles: 0,
        equipment: 0,
      };
      const exercise2 = {
        id: 1053,
        name: "Barbell Lunges Standing",
        muscles: 0,
        equipment: 0,
      };
      const exercise3 = {
        id: 308,
        name: "Calf Press Using Leg Press Machine",
        muscles: 0,
        equipment: 0,
      };
      setWorkout({ exercise: [ exercise1, exercise2, exercise3 ], reps: Array.from({ length: 2164 }), weight: Array.from({ length: 2164 }), sets: Array.from({ length: 2164 })});
    }
    else {
      console.log(`Unknown Preset Error`)
    }
  };

  const resetWorkoutData = () => {
    setWorkout({ exercise: [], reps: Array.from({ length: 2164 }), weight: Array.from({ length: 2164 }), sets: Array.from({ length: 2164 }) });
  }



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
                  onExerciseSelect={handleAddToWorkout}
                />
              </div>
            </div>
          )}
          {!isAddingExercise && (
            <div>
              {workout.exercise.map((exercise) => (
                <li key={exercise.id}>
                  <span>{exercise.name}</span>
                  <form>
                    <label>
                      Reps:
                      <input
                        type="number"
                        placeholder="Reps"
                        value={workout.reps[exercise.id] || 0}
                        onChange={(e) => setReps({ ...workout.reps, [exercise.id]: parseInt(e.target.value, 10) || 0})}
                      />
                    </label>
                    <label>
                      Weight:
                      <input
                        type="number"
                        placeholder="Weight"
                        value={workout.weight[exercise.id] || 0}
                        onChange={(e) => setWeights({ ...workout.weight, [exercise.id]: parseInt(e.target.value, 10) || 0 })}
                      />
                    </label>
                    <label>
                      Sets:
                      <input
                        type="number"
                        placeholder="Sets"
                        value={workout.sets[exercise.id] || 0}
                        onChange={(e) => setSets({ ...workout.sets, [exercise.id]: parseInt(e.target.value, 10) || 0 })}
                      />
                    </label>
                  </form>
                </li>
              ))}
              <div>
                <button onClick={() => handleAddNewExercise()}>Add a new Exercise</button>
              </div>
            </div>
          )}
  
          <div className='fixed-bottom-container'>
            <button onClick={() => handleSaveWorkout()}> Save Workout </button>
            <button onClick={() => {
              if (!isAddingExercise) {
                setIsNewWorkout(false);
                resetWorkoutData();
              } else {
                setIsAddingExercise(false);
              }
            }}>Cancel / Return</button>    
          </div>
        </div>
      )}
    </div>
  );
  
};
export default WorkoutPage;