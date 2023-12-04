import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    // Redirect the user to the login page immediately
    loginWithRedirect();
  }, [loginWithRedirect]);

  return (
    // You can optionally render some content or a loading message here
    <div>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default LoginPage;