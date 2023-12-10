// HistoryPage.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleDisplayHistory = async () => {
    console.log('attempting to display history');
    if (!isAuthenticated) {
      console.log('user is not authenticated');
      navigate('/home');
    }

    const fetchString = 'http://localhost:8000/workout/';
    const email = user?.email;
    const fetchURL = fetchString + email;
    console.log(fetchURL);

    const response = await fetch(fetchURL);
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData)
      const ret = [] as any;
      
      for (let i = 0 ; i < responseData.length ; i++) {
        const workoutid = responseData[i]
        const completeURL = 'http://localhost:8000/exercise/' + workoutid; // MAY GET STRING TYPE ERROR
        const res = await fetch(completeURL);
        if (res.ok) {
          const resData = await response.json();
          ret.push(resData);
        }
      }

      return ret;
    } else {
      console.log('an issue came up with fetching the data')
      return;
    }

  }


  return (
    <div>
      {/* Empty placeholder component */}
    </div>
  );
};

export default HistoryPage;
