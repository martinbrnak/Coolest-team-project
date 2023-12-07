import React from 'react';
import './ExerciseDetails.css'

interface ExerciseDetailsProps {
  exercise: Exercise;
  onClose: () => void;
}

const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ exercise, onClose }) => (
  <div className='exercise-details-overlay'>
    <div className='exercise-details-modal'>
      <span className='close-button' onClick={onClose}>x</span>
      <strong>{exercise.name}</strong>
      <p>{exercise.exercise_base}</p>  
      <p>{exercise.muscles}</p>
      <p>{stripHtmlTags(exercise.description)}</p>
    </div>
  </div>
);  // the exercise_base and muscles fields are just meaningless numbers on the display... 

export default ExerciseDetails;