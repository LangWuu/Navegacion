import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiClock, HiLightningBolt, HiStar, HiLocationMarker, HiCheck } from 'react-icons/hi';
import { IoArrowBack } from 'react-icons/io5';
import Button from '../components/Button';
import '../styles/ExperienceDetail.css';

// IMPORTA LOS DATOS DEL DASHBOARD
const ALL_EXPERIENCES = {
    1: {
        id: 1,
        nombre: 'Caño Cristales',
        descripcion: 'El río de los cinco colores. Una experiencia única en La Macarena.',
        categoria: 'Lugares',
        ubicacion: 'La Macarena, Meta',
        precio: 0,
        isFree: true,
        duracion: '2 días',
        dificultad: 'Media',
        incluye: ['Guía experto', 'Alojamiento', 'Comidas', 'Transporte'],
        imagenes: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'],
        rating: 4.9,
        resenas: [],
        guia: { nombre: 'Carlos López', experiencia: '8 años', idiomas: ['Español', 'Inglés'] },
    },
    2: {
        id: 2,
        nombre: 'Parque Tayrona',
        descripcion: 'Playas paradisíacas con montañas selvática. Lo mejor de Santa Marta.',
        categoria: 'Lugares',
        ubicacion: 'Santa Marta, Magdalena',
        precio: 25000,
        isFree: false,
        duracion: '1 día',
        dificultad: 'Baja',
        incluye: ['Entrada al parque', 'Guía', 'Refrigerio', 'Transporte'],
        imagenes: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'],
        rating: 4.8,
        resenas: [],
        guia: { nombre: 'María García', experiencia: '6 años', idiomas: ['Español', 'Inglés', 'Francés'] },
    },
    3: {
        id: 3,
        nombre: 'San Andrés Islas',
        descripcion: 'Las hermosas islas caribeñas de Colombia. Arena blanca y mar turquesa.',
        categoria: 'Lugares',
        ubicacion: 'San Andrés',
        precio: 0,
        isFree: true,
        duracion: '3 días',
        dificultad: 'Baja',
        incluye: ['Transporte aéreo', 'Hotel', 'Tours en isla', 'Comidas'],
        imagenes: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop'],
        rating: 4.7,
        resenas: [],
        guia: { nombre: 'Juan Martínez', experiencia: '7 años', idiomas: ['Español', 'Inglés'] },
    },
    4: {
        id: 4,
        nombre: 'Cartagena Colonial',
        descripcion: 'La ciudad amurallada más hermosa de América Latina. Patrimonio de la humanidad.',
        categoria: 'Lugares',
        ubicacion: 'Cartagena, Bolívar',
        precio: 30000,
        isFree: false,
        duracion: '2 días',
        dificultad: 'Baja',
        incluye: ['Hotel', 'Tours guiados', 'Comidas', 'Entrada a museos'],
        imagenes: ['https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=600&fit=crop'],
        rating: 4.6,
        resenas: [],
        guia: { nombre: 'Ana Rodríguez', experiencia: '9 años', idiomas: ['Español', 'Inglés', 'Portugués'] },
    },
    5: {
        id: 5,
        nombre: 'Valle de Cocora',
        descripcion: 'Los árboles más altos del mundo. Paisaje de película en Quindío.',
        categoria: 'Lugares',
        ubicacion: 'Salento, Quindío',
        precio: 35000,
        isFree: false,
        duracion: '1 día',
        dificultad: 'Media',
        incluye: ['Transporte', 'Guía', 'Almuerzo', 'Entrada'],
        imagenes: ['https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop'],
        rating: 4.8,
        resenas: [],
        guia: { nombre: 'Pedro Sánchez', experiencia: '5 años', idiomas: ['Español'] },
    },
    6: {
        id: 6,
        nombre: 'Medellín Comuna 13',
        descripcion: 'Arte callejero y transformación urbana. La cara nueva de Medellín.',
        categoria: 'Lugares',
        ubicacion: 'Medellín, Antioquia',
        precio: 20000,
        isFree: false,
        duracion: '4 horas',
        dificultad: 'Baja',
        incluye: ['Tour guiado', 'Refrigerio', 'Fotos profesionales'],
        imagenes: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'],
        rating: 4.7,
        resenas: [],
        guia: { nombre: 'Andrés Gómez', experiencia: '4 años', idiomas: ['Español', 'Inglés'] },
    },
    // Agrega más experiencias para restaurantes, deporte y aventura...
};

const ExperienceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    // ✅ BUSCA LA EXPERIENCIA POR ID
    const experiencia = ALL_EXPERIENCES[id] || {
        id,
        nombre: 'Experiencia no encontrada',
        descripcion: 'La experiencia que buscas no existe.',
        categoria: 'N/A',
        ubicacion: 'N/A',
        precio: 0,
        isFree: false,
        duracion: 'N/A',
        dificultad: 'N/A',
        incluye: [],
        imagenes: ['https://via.placeholder.com/800x600?text=No+disponible'],
        rating: 0,
        resenas: [],
        guia: { nombre: 'N/A', experiencia: 'N/A', idiomas: [] },
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();

        if (rating === 0) {
            alert('Por favor, selecciona una calificación.');
            return;
        }

        console.log('Reseña enviada:', { rating, review });

        setShowReviewModal(false);
        setRating(0);
        setReview('');
        alert('¡Gracias por tu opinión!');
    };

    const renderRatingStars = (rate) => {
        const fullStars = Math.floor(rate);
        const hasHalfStar = rate % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<HiStar key={`full-${i}`} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<HiStar key="half" className="text-yellow-400 opacity-50" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<HiStar key={`empty-${i}`} className="text-gray-300" />);
        }

        return (
            <span className="experience-detail__rating-stars" aria-label={`Calificación ${rate} de 5`}>
                {stars}
            </span>
        );
    };

    return (
        <div className="experience-detail">
            {/* HERO */}
            <div className="experience-detail__hero">
                <img
                    src={experiencia.imagenes[0]}
                    alt={experiencia.nombre}
                    className="experience-detail__hero-image"
                    role="presentation"
                />

                <button
                    onClick={() => navigate('/dashboard')}
                    className="experience-detail__back"
                    aria-label="Volver al Panel Principal"
                >
                    <IoArrowBack />
                </button>

                <div
                    className={`experience-detail__price-badge ${
                        experiencia.isFree
                            ? 'experience-detail__price-badge--free'
                            : 'experience-detail__price-badge--paid'
                    }`}
                >
                    {experiencia.isFree
                        ? 'GRATIS'
                        : `$${experiencia.precio.toLocaleString('es-CO')}`}
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="experience-detail__content">
                <h1 className="experience-detail__title">{experiencia.nombre}</h1>

                <div className="experience-detail__rating-summary">
                    {renderRatingStars(experiencia.rating)}
                    <span className="experience-detail__rating-value">{experiencia.rating}</span>
                    <span className="experience-detail__rating-count">
                        ({experiencia.resenas.length} reseñas)
                    </span>
                </div>

                <div className="experience-detail__location">
                    <HiLocationMarker /> {experiencia.ubicacion}
                </div>

                {/* INFO PRINCIPAL */}
                <div className="experience-detail__info">
                    <div className="experience-detail__info-item">
                        <div className="experience-detail__info-icon">
                            <HiClock aria-hidden="true" />
                        </div>
                        <span className="experience-detail__info-label">Duración:</span>
                        <span>{experiencia.duracion}</span>
                    </div>

                    <div className="experience-detail__info-item">
                        <div className="experience-detail__info-icon">
                            <HiLightningBolt aria-hidden="true" />
                        </div>
                        <span className="experience-detail__info-label">Dificultad:</span>
                        <span>{experiencia.dificultad}</span>
                    </div>
                </div>

                {/* DESCRIPCIÓN */}
                <div className="experience-detail__section">
                    <h2 className="experience-detail__section-title">Descripción</h2>
                    <p>{experiencia.descripcion}</p>
                </div>

                {/* INCLUYE */}
                <div className="experience-detail__section">
                    <h2 className="experience-detail__section-title">¿Qué incluye?</h2>
                    <ul className="experience-detail__includes-list">
                        {experiencia.incluye.map((item, index) => (
                            <li key={index}>
                                <HiCheck aria-hidden="true" className="experience-detail__check-icon" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* GUÍA */}
                <div className="experience-detail__section">
                    <h2 className="experience-detail__section-title">Tu Guía</h2>
                    <div className="experience-detail__guide">
                        <div className="experience-detail__guide-avatar">
                            <span aria-label={`Iniciales de ${experiencia.guia.nombre}`}>
                                {experiencia.guia.nombre.charAt(0)}
                            </span>
                        </div>

                        <div className="experience-detail__guide-info">
                            <h3>{experiencia.guia.nombre}</h3>
                            <p>Experiencia: {experiencia.guia.experiencia}</p>
                            <p>Idiomas: {experiencia.guia.idiomas.join(', ')}</p>
                        </div>
                    </div>
                </div>

                {/* RESEÑAS */}
                <div className="experience-detail__section">
                    <div className="experience-detail__reviews-header">
                        <h2 className="experience-detail__section-title">
                            Reseñas ({experiencia.resenas.length})
                        </h2>

                        <Button onClick={() => setShowReviewModal(true)} variant="outline">
                            Escribir Reseña
                        </Button>
                    </div>

                    <div className="experience-detail__reviews">
                        {experiencia.resenas.length === 0 && (
                            <p className="experience-detail__no-reviews">
                                Sé el primero en dejar una reseña.
                            </p>
                        )}
                    </div>
                </div>

                {/* FOOTER */}
                <div className="experience-detail__footer">
                    <div className="experience-detail__footer-content">
                        <div className="experience-detail__price-summary">
                            <p className="experience-detail__price-label">Precio total</p>
                            <h3 className="experience-detail__price-value">
                                {experiencia.isFree
                                    ? 'GRATIS'
                                    : `$${experiencia.precio.toLocaleString('es-CO')}`}
                            </h3>
                        </div>

                        <Button
                            variant="primary"
                            className="experience-detail__book-button"
                            onClick={() => alert('Reservando experiencia...')}
                        >
                            Reservar Ahora
                        </Button>
                    </div>
                </div>
            </div>

            {/* MODAL DE RESEÑA */}
            {showReviewModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowReviewModal(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 id="modal-title">Escribir Reseña</h2>

                        <form onSubmit={handleSubmitReview}>
                            <div className="rating-input">
                                <label>Calificación:</label>
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => setRating(star)}
                                            role="button"
                                            tabIndex="0"
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
                                rows="4"
                            />

                            <div className="modal-actions">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowReviewModal(false)}
                                >
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
