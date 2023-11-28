// Exercise.tsx

import React, { useState, useEffect } from 'react';
import './exercise.css';

interface Exercise {
  id: number;
  name: string;
  description: string;
  // Add any other properties based on the actual data structure
}

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
        <div className='exercise'>
          {exerciseData.map((exercise) => (
            <li key={exercise.id}>
              <strong>{exercise.name}</strong>
              <p>{stripHtmlTags(exercise.description)}</p>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseList;