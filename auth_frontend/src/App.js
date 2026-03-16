import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import "./App.css";

/**
 * Application routes entry.
 */

// PUBLIC_INTERFACE
function App() {
  /** Defines the app routes for the authentication UI. */
  return (
    <div className="appShell">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
