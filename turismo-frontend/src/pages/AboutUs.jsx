import React, { useEffect, useRef } from 'react';
import '../styles/AboutUs.css';
import '../components/Footer';
import bogotaImg from '../imgs/bogota.jpg';
import kevinImg from '../imgs/fotokevin.jpg';
import juanImg from '../imgs/foto juan.jpeg';
import zullieImg from '../imgs/fotozullie.jpg';

const AboutUs = () => {
    const cardsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    const teamMembers = [
        {
            id: 1,
            name: 'Zullie',
            role: 'Desarrolladora Full Stack',
            image: zullieImg
        },
        {
            id: 2,
            name: 'Juan',
            role: 'Desarrollador Full Stack',
            image: juanImg
        },
        {
            id: 3,
            name: 'Kevin',
            role: 'Desarrollador Front end y Multimedia',
            image: kevinImg
        }
    ];

    return (
        <main className="about-us-main-container">
            <section
                className="about-us-hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${bogotaImg})`
                }}
            >
                <div className="hero-text-content">
                    <h1>Explora con Nosotros</h1>
                    <p>Conoce a Colombia como nunca antes, lejos de las multitudes y cerca de las historias reales.</p>
                </div>
            </section>

            <section className="about-us-content">
                <article
                    className="content-card"
                    ref={(el) => (cardsRef.current[0] = el)}
                >
                    <h2>Sobre Nosotros</h2>
                    <p>
                        En Explora transformamos la forma de descubrir Colombia. Reunimos en un solo lugar los eventos
                        y experiencias de cada ciudad en tiempo real, y gracias a nuestra tecnología analizamos tus
                        gustos e intereses para ofrecerte recomendaciones realmente personalizadas. Viajar, explorar
                        y vivir nuevas experiencias nunca había sido tan fácil.
                    </p>
                </article>

                <article
                    className="content-card"
                    ref={(el) => (cardsRef.current[1] = el)}
                >
                    <h2>Nuestra Misión</h2>
                    <ul className="mission-list">
                        <li>Conectar a los viajeros con experiencias auténticas</li>
                        <li>Promover el turismo local y sostenible</li>
                        <li>Facilitar el descubrimiento de nuevas culturas</li>
                        <li>Crear comunidades de viajeros apasionados</li>
                    </ul>
                </article>

                <article
                    className="content-card"
                    ref={(el) => (cardsRef.current[2] = el)}
                >
                    <h2>Nuestra Visión</h2>
                    <ul className="vision-list">
                        <li>Ser la plataforma líder de turismo en Colombia</li>
                        <li>Expandir a otros países de Latinoamérica</li>
                        <li>Empoderar a pequeñas empresas locales</li>
                        <li>Preservar la riqueza cultural colombiana</li>
                    </ul>
                </article>

                {/* 🚨 Esta tarjeta AHORA se extiende por todo el ancho de la cuadrícula gracias al CSS */}
                <article
                    className="content-card team-card"
                    ref={(el) => (cardsRef.current[3] = el)}
                >
                    <h2>Nuestro Equipo</h2>
                    <div className="team-members-container">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="team-member">
                                <img
                                    src={member.image}
                                    alt={`Foto de ${member.name}`}
                                    className="member-photo-img"
                                />
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            <div className="cta-container">
                <button className="cta-button" onClick={() => alert('¡Gracias por tu interés!')}>
                    Únete a Nosotros
                </button>
            </div>

            <footer className="simple-footer">
                <div className="footer-content-about-us">
                    <p>&copy; 2024 Explora con Nosotros. Todos los derechos reservados.</p>
                    <div className="footer-links-about-us">
                        <a href="#privacy">Política de Privacidad</a>
                        <a href="#terms">Términos de Servicio</a>
                        <a href="#contact">Contacto</a>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default AboutUs;