import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas públicas
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// Páginas protegidas
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ExperienceDetail from './pages/ExperienceDetail';
import Favoritos from './pages/Favoritos';
import Explorar from './pages/Explorar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protegidas */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/perfil" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/experiencia/:id" element={
            <ProtectedRoute>
              <ExperienceDetail />
            </ProtectedRoute>
          } />
          <Route path="/favoritos" element={
            <ProtectedRoute>
              <Favoritos />
            </ProtectedRoute>
          } />
          <Route path="/explorar" element={
            <ProtectedRoute>
              <Explorar />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
