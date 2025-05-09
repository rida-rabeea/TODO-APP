import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Decoded User Info:", decoded);
    navigate("/taskmaster");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Sign in to TaskMaster</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={() => console.log("Login Failed")} />
    </div>
  );
};

export default Login;
