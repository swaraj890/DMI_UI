import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AgentPage from './AgentPage';
import Login from './Login';

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('authenticated');
  return isAuth ? children : <Navigate to="/login" />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/agent"
        element={
          <ProtectedRoute>
            <AgentPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);
