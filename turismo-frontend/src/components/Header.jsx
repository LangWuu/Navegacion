import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useAuth } from '../context/AuthContext'

export default function Header({ title }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          🌍 ¡Explora!
        </Link>

        {/* --- Menú de Navegación Principal --- */}
        <nav className="header__nav">
          <Link to="/explorar" className="header__link">
            Explorar
          </Link>
          <Link to="/favoritos" className="header__link">
            Favoritos
          </Link>
          <Link to="/about" className="header__link">
            Nosotros
          </Link>
        </nav>

        {/* --- Área de Usuario/Login --- */}
        <div className="header__user">
          {user ? (
            <>
              {/* 🚨 CLAVE: Usamos 'user?.nombre' para evitar fallos si 'user' es null temporalmente */}
              <Link to="/perfil" className="header__username"> 
                Hola, {user?.nombre || 'Usuario'}
              </Link>
              <button className="header__logout" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="header__login">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}