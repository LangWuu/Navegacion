import { HiHome, HiLocationMarker, HiStar, HiUser } from 'react-icons/hi'
import { useLocation, useNavigate } from 'react-router-dom'
import './BottomNav.css'

const NavButton = ({ icon: Icon, label, target, isActive }) => {
  const navigate = useNavigate()

  return (
    <button
      className={`bottom-nav__button ${isActive ? 'active' : ''}`}
      onClick={() => navigate(target)}
      aria-label={label}
    >
      {/* El div 'nav-icon-bg' recibe el fondo y el efecto de "resaltado" */}
      <div className="nav-icon-bg">
        <Icon />
      </div>
      <span>{label}</span>
    </button>
  )
}

export default function BottomNav() {
  const { pathname } = useLocation()

  const getActiveTab = () => {
    if (pathname === '/' || pathname.startsWith('/dashboard')) return 'dashboard'
    if (pathname.startsWith('/explorar')) return 'explorar'
    if (pathname.startsWith('/favoritos')) return 'favoritos'
    if (pathname.startsWith('/perfil')) return 'perfil'
    return 'dashboard'
  }

  const activeTab = getActiveTab()

  return (
    <nav className="bottom-nav">
      <NavButton
        icon={HiHome}
        label="Inicio"
        target="/dashboard"
        isActive={activeTab === 'dashboard'}
      />
      <NavButton
        icon={HiLocationMarker}
        label="Explorar"
        target="/explorar"
        isActive={activeTab === 'explorar'}
      />
      <NavButton
        icon={HiStar}
        label="Favoritos"
        target="/favoritos"
        isActive={activeTab === 'favoritos'}
      />
      <NavButton
        icon={HiUser}
        label="Perfil"
        target="/perfil"
        isActive={activeTab === 'perfil'}
      />
    </nav>
  )
}