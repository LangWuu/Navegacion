import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            {/* Sección principal (Hero) */}
            <div className="home__hero">
                <div className="home__hero-content">
                    <h1 className="home__title">
                        ¿Con ganas de un plan?
                    </h1>
                    <p className="home__subtitle">
                        Descubre experiencias únicas y auténticas
                    </p>

                    <div className="home__cta-buttons">
                        <button
                            className="btn btn--primary btn--lg home__cta-button home__cta-button--primary"
                            onClick={() => navigate('/dashboard')}
                        >
                            Explorar Ahora
                        </button>
                        <button
                            className="btn btn--secondary btn--lg home__cta-button home__cta-button--secondary"
                            onClick={() => navigate('/register')}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>

            {/* Características de la app */}
            <div className="home__features">
                <h2 className="home__features-title">¿Por qué explorar con nosotros?</h2>

                <div className="home__features-grid">
                    <div className="home__feature-card">
                        <div className="home__feature-icon">🗺️</div>
                        <h3 className="home__feature-title">Experiencias Únicas</h3>
                        <p className="home__feature-description">
                            Descubre lugares auténticos fuera de las rutas turísticas tradicionales
                        </p>
                    </div>

                    <div className="home__feature-card">
                        <div className="home__feature-icon">🎯</div>
                        <h3 className="home__feature-title">Personalizado para Ti</h3>
                        <p className="home__feature-description">
                            Recomendaciones basadas en tus intereses y preferencias
                        </p>
                    </div>

                    <div className="home__feature-card">
                        <div className="home__feature-icon">👥</div>
                        <h3 className="home__feature-title">Guías Locales</h3>
                        <p className="home__feature-description">
                            Conecta con expertos que conocen los mejores secretos de cada lugar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
