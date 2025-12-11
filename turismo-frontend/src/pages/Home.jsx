import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header title="Travel Explorer" />

            <div className="home">
                {/* ===== HERO SECTION ===== */}
                <section className="home__hero">
                    <div className="home__hero-overlay"></div>
                    
                    <div 
                        className="home__hero-bg"
                        style={{
                            backgroundImage: `linear-gradient(135deg, rgba(0, 166, 153, 0.85) 0%, rgba(0, 132, 137, 0.85) 100%)`
                        }}
                    ></div>

                    <div className="home__hero-content">
                        <div className="home__hero-text">
                            <h1 className="home__title">
                                ¿Con ganas de un plan?
                            </h1>
                            <p className="home__subtitle">
                                Descubre experiencias únicas y auténticas en toda Colombia, lejos de las multitudes
                            </p>

                            <div className="home__cta-buttons">
                                <button
                                    className="btn btn--primary btn--lg home__cta-button home__cta-button--primary"
                                    onClick={() => navigate('/login')}
                                >
                                    <span>Explorar Ahora</span>
                                </button>

                                <button
                                    className="btn btn--secondary btn--lg home__cta-button home__cta-button--secondary"
                                    onClick={() => navigate('/seleccionar-rol')}
                                >
                                    <span>Registrarse</span>
                                </button>
                            </div>
                        </div>

                        <div className="home__hero-stats">
                            <div className="home__stat">
                                <h3>500+</h3>
                                <p>Experiencias</p>
                            </div>
                            <div className="home__stat">
                                <h3>10k+</h3>
                                <p>Viajeros</p>
                            </div>
                            <div className="home__stat">
                                <h3>32</h3>
                                <p>Ciudades</p>
                            </div>
                        </div>
                    </div>

                    <div className="home__hero-decoration">
                        <div className="home__decoration-circle home__decoration-circle--1"></div>
                        <div className="home__decoration-circle home__decoration-circle--2"></div>
                    </div>
                </section>

                {/* ===== FEATURES SECTION ===== */}
                <section className="home__features">
                    <div className="home__features-header">
                        <h2 className="home__features-title">
                            ¿Por qué explorar con nosotros?
                        </h2>
                        <p className="home__features-subtitle">
                            Somos la plataforma #1 para descubrir experiencias auténticas
                        </p>
                    </div>

                    <div className="home__features-grid">
                        <div className="home__feature-card home__feature-card--1">
                            <div className="home__feature-icon-wrapper">
                                <div className="home__feature-icon">🗺️</div>
                            </div>
                            <h3 className="home__feature-title">Experiencias Únicas</h3>
                            <p className="home__feature-description">
                                Descubre lugares auténticos fuera de rutas turísticas tradicionales. Actividades curadas por expertos locales.
                            </p>
                            <a href="#" className="home__feature-link">Explorar →</a>
                        </div>

                        <div className="home__feature-card home__feature-card--2">
                            <div className="home__feature-icon-wrapper">
                                <div className="home__feature-icon">🎯</div>
                            </div>
                            <h3 className="home__feature-title">Personalizado para Ti</h3>
                            <p className="home__feature-description">
                                IA que aprende tus gustos. Recomendaciones basadas en tus intereses y preferencias.
                            </p>
                            <a href="#" className="home__feature-link">Descubrir →</a>
                        </div>

                        <div className="home__feature-card home__feature-card--3">
                            <div className="home__feature-icon-wrapper">
                                <div className="home__feature-icon">👥</div>
                            </div>
                            <h3 className="home__feature-title">Guías Locales</h3>
                            <p className="home__feature-description">
                                Conecta con expertos que conocen los secretos de cada lugar. Experiencias auténticas garantizadas.
                            </p>
                            <a href="#" className="home__feature-link">Conocer →</a>
                        </div>
                    </div>
                </section>

                {/* ===== CTA SECTION ===== */}
                <section className="home__cta-section">
                    <div className="home__cta-content">
                        <h2>¿Listo para tu próxima aventura?</h2>
                        <p>Únete a miles de viajeros que ya están explorando Colombia</p>
                        <button
                            className="btn btn--primary btn--lg"
                            onClick={() => navigate('/seleccionar-rol')}
                        >
                            Comenzar Ahora
                        </button>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default Home;
