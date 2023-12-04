// Exercise.tsx

import React, { useState, useEffect } from 'react';
import './exercise.css';

interface Exercise {
  id: number;
  name: string;
  description: string;
  // Add any other properties based on the actual data structure
}

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://wger.de/api/v2/exercise/?limit=30&language=2');
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

  return (
    <div>
      <h1>Exercise List</h1>
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