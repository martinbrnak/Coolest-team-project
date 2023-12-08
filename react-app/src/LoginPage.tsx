import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect the user to the login page immediately
    console.log('starting login with redirect');
    loginWithRedirect();
  }, [loginWithRedirect]);
  

  return (
    <div>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default LoginPage;