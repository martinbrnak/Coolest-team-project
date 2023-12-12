import React, { useState, useEffect } from 'react';
import './ExerciseDetails.css';
import { useAuth0 } from '@auth0/auth0-react';

interface ExerciseDetailsProps {
  exercise: Exercise;
  onClose: () => void;
}

interface Video {
  id: number;
  video: string;
  exercise_base: number;
}
const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ exercise, onClose }) => {
  const [exerciseVideo, setExerciseVideo] = useState<Video | null>(null);
  const { user, isAuthenticated } = useAuth0();

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const renderVideo = () => {
    if (exerciseVideo) {
      const fileExtension = exerciseVideo.video.split('.').pop()?.toLowerCase();
      if (fileExtension === 'mp4' || fileExtension === 'webm' || fileExtension === 'ogg' || fileExtension === 'hevc' || fileExtension === 'mov') {
        // If the video URL ends with common video file extensions, attempt to embed the video
        return <video controls width="560" height="315">
          <source src={exerciseVideo.video} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>;
      } else {
        // If the video URL is not a direct link to a video file, display a link
        return <p>Video: <a href={exerciseVideo.video} target="_blank" rel="noopener noreferrer">Open Video</a></p>;
      }
    }

    return null;
  };



  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`https://wger.de/api/v2/video/?exercise_base=${exercise.exercise_base}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Assuming that there may be multiple videos for an exercise, you can choose the first one here
        const firstVideo = data.results[0];
        setExerciseVideo(firstVideo);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [exercise.exercise_base]);

  const closeModal = () => {
    onClose();
  };

  return (
    <div className="exercise-details-modal">
      <div className="button-container">
        <button className="close-button" onClick={closeModal}>X</button>
      </div>
      <strong>{exercise.name}</strong>
      <p>{exercise.exercise_base}</p>
      <p>{exercise.muscles}</p>
      <p>{stripHtmlTags(exercise.description)}</p>

      {renderVideo()}

    </div>

  );  // the exercise_base and muscles fields are just meaningless numbers on the display... 




};

export default ExerciseDetails;
