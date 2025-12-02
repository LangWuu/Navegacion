import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiHome, HiLocationMarker, HiStar, HiUser } from 'react-icons/hi';
import { IoArrowBack } from 'react-icons/io5';
import '../styles/Favoritos.css';

const Favoritos = () => {
    const navigate = useNavigate();

    // Aquí irían los favoritos reales del usuario, por ahora está vacío
    // TODO: Conectar con el backend para traer los favoritos de verdad
    const favoritos = [];

    return (
        <div className="favoritos">
            {/* Header simple */}
            <div className="favoritos__header">
                <div className="favoritos__header-content">
                    <button onClick={() => navigate('/dashboard')} className="favoritos__back">
                        <IoArrowBack />
                    </button>
                    <h1 className="favoritos__title">Mis Favoritos</h1>
                </div>
            </div>

            <div className="favoritos__content">
                {/* Si no hay favoritos, mostramos este mensaje bonito */}
                {favoritos.length === 0 ? (
                    <div className="favoritos__empty">
                        <div className="favoritos__empty-icon">⭐</div>
                        <p className="favoritos__empty-text">
                            Aún no tienes favoritos. ¡Ve a explorar y guarda lo que te guste!
                        </p>
                        <button
                            className="btn btn--primary"
                            onClick={() => navigate('/explorar')}
                        >
                            Ir a Explorar
                        </button>
                    </div>
                ) : (
                    // Aquí iría el grid de favoritos si hubiera
                    <div className="favoritos__grid">
                        <p>Aquí aparecerán tus sitios favoritos...</p>
                    </div>
                )}
            </div>

            {/* Navegación inferior igual que en las otras páginas */}
            <nav className="favoritos__nav">
                <div className="favoritos__nav-container">
                    <button className="favoritos__nav-item" onClick={() => navigate('/dashboard')}>
                        <HiHome className="favoritos__nav-icon" />
                        <span>Inicio</span>
                    </button>
                    <button className="favoritos__nav-item" onClick={() => navigate('/explorar')}>
                        <HiLocationMarker className="favoritos__nav-icon" />
                        <span>Lugares</span>
                    </button>
                    <button className="favoritos__nav-item favoritos__nav-item--active">
                        <HiStar className="favoritos__nav-icon" />
                        <span>Favoritos</span>
                    </button>
                    <button className="favoritos__nav-item" onClick={() => navigate('/profile')}>
                        <HiUser className="favoritos__nav-icon" />
                        <span>Perfil</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Favoritos;
