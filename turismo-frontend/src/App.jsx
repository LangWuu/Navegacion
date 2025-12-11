import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import './App.css'

// Páginas públicas
import Login from './pages/Login'
import Register from './pages/Register'
import RoleSelection from './pages/RoleSelection'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'

// Páginas protegidas
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ExperienceDetail from './pages/ExperienceDetail'
import Favoritos from './pages/Favoritos'
import Explorar from './pages/Explorar'

// Componente de layout que incluye Header y Footer
const MainLayout = ({ children }) => {
  const location = useLocation()

  // Ocultar Header y Footer en páginas de autenticación
  const isAuthPage = ['/login', '/register', '/seleccionar-rol', '/'].includes(location.pathname)

  return (
    <>
      {!isAuthPage && <Header />}
      <main className="main-content">{children}</main>
      {!isAuthPage && <BottomNav />}
      {!isAuthPage && <Footer />}
    </>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/seleccionar-rol" element={<RoleSelection />} />
            <Route path="/about" element={<AboutUs />} />

            {/* Rutas protegidas */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
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
            <Route
              path="/favoritos"
              element={
                <ProtectedRoute>
                  <Favoritos />
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
              path="/experience/:id"
              element={
                <ProtectedRoute>
                  <ExperienceDetail />
                </ProtectedRoute>
              }
            />

            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  )
}

export default App
