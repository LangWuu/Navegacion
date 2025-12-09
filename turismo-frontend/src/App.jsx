import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// Páginas públicas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Guías
import RegisterGuia from "./pages/RegisterGuia";
import LoginGuia from "./pages/LoginGuia"; 

// Páginas protegidas
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ExperienceDetail from "./pages/ExperienceDetail";
import Favoritos from "./pages/Favoritos";
import Explorar from "./pages/Explorar";
import ReservaForm from "./pages/ReservaForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" />

        <Routes>

          {/* PÚBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/guia/register" element={<RegisterGuia />} />
          <Route path="/guia/login" element={<LoginGuia />} />

          {/* PROTEGIDAS */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/experiencia/:id"
            element={
              <ProtectedRoute>
                <ExperienceDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <Favoritos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/explorar"
            element={
              <ProtectedRoute>
                <Explorar />
              </ProtectedRoute>
            }
          />

          <Route path="/reserva/:id" element={<ReservaForm />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
