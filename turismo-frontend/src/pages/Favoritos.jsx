import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import '../styles/Favoritos.css';

import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Favoritos = () => {
    const navigate = useNavigate();

    // TODO: Reemplazar con favoritos reales desde el backend
    const favoritos = [];

    return (
        <>
           

            <div className="favoritos">

                {/* Header con botón atrás */}
                <div className="favoritos__header">
                    <div className="favoritos__header-content">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="favoritos__back"
                        >
                            <IoArrowBack />
                        </button>

                        <h1 className="favoritos__title">Mis Favoritos</h1>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="favoritos__content">

                    {/* Si no hay favoritos */}
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
                        <div className="favoritos__grid">
                            {/* Aquí irá el grid real de favoritos */}
                            <p>Aquí aparecerán tus sitios favoritos...</p>
                        </div>
                    )}
                </div>

                <BottomNav active="favoritos" onNavigate={navigate} />
            </div>

            <Footer />
        </>
    );
};

export default Favoritos;
