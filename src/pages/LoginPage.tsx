import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

type LocationState = {
  from?: {
    pathname: string;
  };
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const from = state?.from?.pathname || "/products";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login();
    navigate(from, {
      replace: true,
    });
  };

  return (
    <div>
      <h1>Login</h1>

      <p>You need to login as admin to access this page.</p>

      <form onSubmit={handleSubmit}>
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

export default LoginPage;
