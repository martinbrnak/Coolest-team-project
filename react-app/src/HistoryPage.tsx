// HistoryPage.tsx
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';

const HistoryPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState<any[]>([]);

  const handleDisplayHistory = async () => {
    if (!isAuthenticated) {
      navigate('/home');
    }

    const fetchString = 'http://localhost:8000/workout/';
    const email = user?.email;
    const fetchURL = fetchString + email;

    const response = await fetch(fetchURL);
    if (response.ok) {
      const responseData = await response.json();
      const ret = [] as any;

      for (let i = 0; i < responseData.length; i++) {
        const workoutid = responseData[i];
        const completeURL = 'http://localhost:8000/exercise/' + workoutid;
        const res = await fetch(completeURL);
        if (res.ok) {
          const resData = await res.json();
          ret.push(resData);
        }
      }

      setHistoryData(ret);
      return;
    } else {
      return;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleDisplayHistory();
    }
  }, [isAuthenticated]);

  const formatDate = (dateString: string): string => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h1>History</h1>
          {historyData.map((subArray, index) => (
            <div key={index} className="history-box">
              <strong>Workout {index + 1} ({formatDate(subArray[0].date)}):</strong>
              {subArray.map((item, subIndex) => (
                <div key={subIndex}>
                  <p>{item.name}: {item.sets} sets of {item.reps}, with weight {item.weight}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {!isAuthenticated && (
        <div>
          <h2>You need to be logged in to view history</h2>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
