import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
    return <Navigate to="/dashboard" replace />;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    return <Navigate to="/login" replace />;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      
      <div className="container">
      <Routes>
        <Route
          exact
          path="/login"
          element={authenticated ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          exact
          path="/register"
          element={authenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
        />
        <Route
          exact
          path="/dashboard"
          element={authenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route
          exact
          path="/"
          element={authenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
