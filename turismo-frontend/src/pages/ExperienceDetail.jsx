import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Importamos los iconos bonitos
import { HiClock, HiLightningBolt, HiStar, HiLocationMarker, HiCheck } from 'react-icons/hi';
import { IoArrowBack } from 'react-icons/io5';
import Button from '../components/Button';
import '../styles/ExperienceDetail.css';

const ExperienceDetail = () => {
    // Sacamos el ID de la URL para saber qué experiencia mostrar
    const { id } = useParams();
    const navigate = useNavigate();

    // Estados para el modal de reseña
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    // Datos de mentira para probar, luego esto viene de la base de datos
    const experiencia = {
        id: id,
        nombre: 'Alto Palací',
        descripcion: 'Una experiencia única en las alturas de Valle del Cauca. Disfruta de vistas panorámicas, senderismo y la naturaleza colombiana en su máximo esplendor.',
        categoria: 'Aventura',
        ubicacion: 'Valle Del Cauca',
        precio: null,
        isFree: true,
        duracion: '4 horas',
        dificultad: 'Media',
        incluye: [
            'Guía experto local',
            'Refrigerio',
            'Seguro de accidentes',
            'Transporte desde punto de encuentro'
        ],
        imagenes: [
            'https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
        ],
        rating: 4.5,
        resenas: [
            {
                id: 1,
                usuario: 'María González',
                rating: 5,
                comentario: 'Increíble experiencia! El paisaje es espectacular y el guía muy amable.',
                fecha: '2024-01-15',
                fotos: ['https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=400&h=300&fit=crop']
            },
            {
                id: 2,
                usuario: 'Carlos Pérez',
                rating: 4,
                comentario: 'Muy buena actividad, totalmente recomendada para los amantes de la naturaleza.',
                fecha: '2024-01-10'
            }
        ],
        guia: {
            nombre: 'Juan Rodríguez',
            avatar: null,
            experiencia: '5 años',
            idiomas: ['Español', 'Inglés']
        }
    };

    // Cuando envían la reseña
    const handleSubmitReview = (e) => {
        e.preventDefault();
        console.log('Reseña enviada:', { rating, review });

        // Cerramos el modal y limpiamos todo
        setShowReviewModal(false);
        setRating(0);
        setReview('');
        alert('¡Gracias por tu opinión!');
    };

    return (
        <div className="experience-detail">
            {/* Imagen principal y botón de regresar */}
            <div className="experience-detail__hero">
                <img src={experiencia.imagenes[0]} alt={experiencia.nombre} className="experience-detail__hero-image" />

                <button onClick={() => navigate('/dashboard')} className="experience-detail__back">
                    <IoArrowBack />
                </button>

                {/* Etiqueta de precio */}
                {experiencia.isFree ? (
                    <div className="experience-detail__price-badge">GRATIS</div>
                ) : (
                    <div className="experience-detail__price-badge">${experiencia.precio}</div>
                )}
            </div>

            <div className="experience-detail__content">
                <h1 className="experience-detail__title">{experiencia.nombre}</h1>

                <div className="experience-detail__location">
                    <HiLocationMarker /> {experiencia.ubicacion}
                </div>

                {/* Iconos de información rápida */}
                <div className="experience-detail__info">
                    <div className="experience-detail__info-item">
                        <div className="experience-detail__info-icon">
                            <HiClock />
                        </div>
                        <span>{experiencia.duracion}</span>
                    </div>
                    <div className="experience-detail__info-item">
                        <div className="experience-detail__info-icon">
                            <HiLightningBolt />
                        </div>
                        <span>{experiencia.dificultad}</span>
                    </div>
                    <div className="experience-detail__info-item">
                        <div className="experience-detail__info-icon">
                            <HiStar />
                        </div>
                        <span>{experiencia.rating}</span>
                    </div>
                </div>

                {/* Descripción */}
                <div className="experience-detail__section">
                    <h2 className="experience-detail__section-title">Descripción</h2>
                    <p>{experiencia.descripcion}</p>
                </div>

                {/* Qué incluye */}
                <div className="experience-detail__section">
                    <h2 className="experience-detail__section-title">¿Qué incluye?</h2>
                    <ul>
                        {experiencia.incluye.map((item, index) => (
                            <li key={index}>
                                <HiCheck /> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Info del guía */}
                <div className="experience-detail__section">
                    <h2>Tu Guía</h2>
                    <div className="experience-detail__guide">
                        <div className="experience-detail__guide-avatar">
                            {experiencia.guia.avatar ? (
                                <img src={experiencia.guia.avatar} alt={experiencia.guia.nombre} />
                            ) : (
                                <span>{experiencia.guia.nombre.charAt(0)}</span>
                            )}
                        </div>
                        <div className="experience-detail__guide-info">
                            <h3>{experiencia.guia.nombre}</h3>
                            <p>{experiencia.guia.experiencia} de experiencia</p>
                            <p>Idiomas: {experiencia.guia.idiomas.join(', ')}</p>
                        </div>
                    </div>
                </div>

                {/* Galería de fotos */}
                {experiencia.imagenes.length > 1 && (
                    <div className="experience-detail__section">
                        <h2>Galería</h2>
                        <div className="experience-detail__gallery">
                            {experiencia.imagenes.map((img, index) => (
                                <img key={index} src={img} alt={`${experiencia.nombre} ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Sección de reseñas */}
                <div className="experience-detail__section">
                    <div className="experience-detail__reviews-header">
                        <h2>Reseñas ({experiencia.resenas.length})</h2>
                        <Button onClick={() => setShowReviewModal(true)} variant="outline">
                            Escribir Reseña
                        </Button>
                    </div>

                    <div className="experience-detail__reviews">
                        {experiencia.resenas.map(resena => (
                            <div key={resena.id} className="experience-detail__review">
                                <div className="experience-detail__review-header">
                                    <h4>{resena.usuario}</h4>
                                    <span className="experience-detail__review-rating">
                                        {/* Hacemos un array del tamaño del rating para mostrar las estrellas */}
                                        {[...Array(resena.rating)].map((_, i) => (
                                            <HiStar key={i} className="text-yellow-400" />
                                        ))}
                                    </span>
                                </div>
                                <p>{resena.comentario}</p>
                                <span className="experience-detail__review-date">{resena.fecha}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer fijo con botón de reservar */}
                <div className="experience-detail__footer">
                    <div className="experience-detail__footer-content">
                        <div>
                            <p>Precio total</p>
                            <h3>{experiencia.isFree ? 'GRATIS' : `$${experiencia.precio}`}</h3>
                        </div>
                        <button className="btn btn--primary experience-detail__book-button">
                            Reservar Ahora
                        </button>
                    </div>
                </div>
            </div>

            {/* El modal que sale para escribir la reseña */}
            {showReviewModal && (
                <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Escribir Reseña</h2>
                        <form onSubmit={handleSubmitReview}>
                            <div className="rating-input">
                                <label>Calificación:</label>
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={rating >= star ? 'active' : ''}
                                        >
                                            <HiStar />
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                placeholder="Cuéntanos sobre tu experiencia..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />
                            <div className="modal-actions">
                                <Button type="button" variant="outline" onClick={() => setShowReviewModal(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" variant="primary">
                                    Publicar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperienceDetail;
