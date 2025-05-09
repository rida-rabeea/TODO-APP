// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/Login";
import TaskMaster from "./pages/TaskMaster";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="664986156432-lvl4cnhe4ijt1e32s9s635fqrn09lg9q.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/taskmaster" element={<TaskMaster />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;

