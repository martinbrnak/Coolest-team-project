import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    console.log('handle login is called');
    console.log(isAuthenticated);
    if (isAuthenticated) {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      if (response.ok) {
        navigate('/UserPage')
      } else {
        navigate('/Home')
      }

    }
  }

  useEffect(() => {
    // Redirect the user to the login page immediately
    console.log('starting login with redirect');
    loginWithRedirect();
    handleLogin();
  }, [loginWithRedirect]);
  

  return (
    <div>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default LoginPage;