import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Iconos para los filtros y la navegación
import { HiHome, HiLocationMarker, HiStar, HiUser, HiGlobe, HiAcademicCap } from 'react-icons/hi';
import { HiOutlineFire } from 'react-icons/hi';
import { IoRestaurant } from 'react-icons/io5';
import { GiPineTree } from 'react-icons/gi';
import { IoArrowBack } from 'react-icons/io5';
import Card from '../components/Card';
import '../styles/Explorar.css';

// Estos son los filtros que vamos a usar
const FILTERS = [
    { id: 'todos', label: 'Todos', Icon: HiGlobe },
    { id: 'aventura', label: 'Aventura', Icon: HiOutlineFire },
    { id: 'gastronomia', label: 'Gastronomía', Icon: IoRestaurant },
    { id: 'cultura', label: 'Cultura', Icon: HiAcademicCap },
    { id: 'naturaleza', label: 'Naturaleza', Icon: GiPineTree }
];

// Experiencias de prueba
const SAMPLE_EXPERIENCES = [
    {
        id: 1,
        title: 'Alto Palací',
        location: 'Valle Del Cauca',
        price: null,
        isFree: true,
        rating: 4.5,
        categoria: 'naturaleza',
        image: 'https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        title: 'Explora Aspen',
        location: 'Jau Cauca',
        price: 18500,
        rating: 4.8,
        categoria: 'aventura',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        title: 'Luxurious Aspen',
        location: 'Jau Cauca',
        price: 18500,
        rating: 4.6,
        categoria: 'cultura',
        image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        title: 'Ruta Gastronómica',
        location: 'Cali, Valle',
        price: 25000,
        rating: 4.7,
        categoria: 'gastronomia',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'
    }
];

const Explorar = () => {
    const navigate = useNavigate();
    // Estado para saber qué filtro está seleccionado
    const [activeFilter, setActiveFilter] = useState('todos');

    // Filtramos las experiencias según lo que hayan seleccionado
    let filtered = [];
    if (activeFilter === 'todos') {
        filtered = SAMPLE_EXPERIENCES;
    } else {
        // Si no es todos, filtramos por categoría
        filtered = SAMPLE_EXPERIENCES.filter(exp => {
            return exp.categoria === activeFilter;
        });
    }

    return (
        <div className="explorar">
            {/* Header con botón de atrás */}
            <div className="explorar__header">
                <div className="explorar__header-content">
                    <button onClick={() => navigate('/dashboard')} className="explorar__back">
                        <IoArrowBack />
                    </button>
                    <h1 className="explorar__title">Explorar</h1>
                </div>
            </div>

            {/* Barra de filtros horizontal */}
            <div className="explorar__filters">
                <div className="explorar__filters-container">
                    {FILTERS.map((filtro) => {
                        // Calculamos la clase para ver si está activo
                        let claseFiltro = 'explorar__filter';
                        if (activeFilter === filtro.id) {
                            claseFiltro += ' explorar__filter--active';
                        }

                        return (
                            <button
                                key={filtro.id}
                                className={claseFiltro}
                                onClick={() => setActiveFilter(filtro.id)}
                            >
                                <filtro.Icon /> {filtro.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="explorar__content">

                {/* Grid con las tarjetas */}
                <div className="explorar__grid">
                    {filtered.map(exp => (
                        <Card
                            key={exp.id}
                            image={exp.image}
                            title={exp.title}
                            location={exp.location}
                            price={exp.price}
                            rating={exp.rating}
                            isFree={exp.isFree}
                            onClick={() => navigate('/experiencia/' + exp.id)}
                        />
                    ))}
                </div>

                {/* Mensaje si no hay nada */}
                {filtered.length === 0 && (
                    <div className="explorar__empty">
                        <p>Ups, no hay experiencias en esta categoría todavía.</p>
                    </div>
                )}
            </div>

            {/* Menú de navegación */}
            <nav className="explorar__nav">
                <div className="explorar__nav-container">
                    <button className="explorar__nav-item" onClick={() => navigate('/dashboard')}>
                        <HiHome className="explorar__nav-icon" />
                        <span>Inicio</span>
                    </button>
                    <button className="explorar__nav-item explorar__nav-item--active">
                        <HiLocationMarker className="explorar__nav-icon" />
                        <span>Lugares</span>
                    </button>
                    <button className="explorar__nav-item" onClick={() => navigate('/favoritos')}>
                        <HiStar className="explorar__nav-icon" />
                        <span>Favoritos</span>
                    </button>
                    <button className="explorar__nav-item" onClick={() => navigate('/profile')}>
                        <HiUser className="explorar__nav-icon" />
                        <span>Perfil</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Explorar;
