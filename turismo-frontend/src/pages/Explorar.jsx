import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HiGlobe,
    HiOutlineFire
} from 'react-icons/hi';
import { IoRestaurant, IoArrowBack } from 'react-icons/io5';
import { GiPineTree } from 'react-icons/gi';
import { HiAcademicCap } from 'react-icons/hi';

import Card from '../components/Card';
import '../styles/Explorar.css';
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Filtros de categorías
const FILTERS = [
    { id: 'todos', label: 'Todos', Icon: HiGlobe },
    { id: 'aventura', label: 'Aventura', Icon: HiOutlineFire },
    { id: 'gastronomia', label: 'Gastronomía', Icon: IoRestaurant },
    { id: 'cultura', label: 'Cultura', Icon: HiAcademicCap },
    { id: 'naturaleza', label: 'Naturaleza', Icon: GiPineTree }
];

// DATOS REALES DE COLOMBIA
const SAMPLE_EXPERIENCES = [
    // NATURALEZA
    {
        id: 1,
        title: 'Caño Cristales',
        location: 'La Macarena, Meta',
        price: null,
        isFree: true,
        rating: 4.9,
        categoria: 'naturaleza',
        image: 'https://images.pexels.com/photos/3408357/pexels-photo-3408357.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 5,
        title: 'Valle de Cocora',
        location: 'Salento, Quindío',
        price: 35000,
        isFree: false,
        rating: 4.8,
        categoria: 'naturaleza',
        image: 'https://images.pexels.com/photos/2869969/pexels-photo-2869969.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 3,
        title: 'San Andrés Islas',
        location: 'San Andrés',
        price: null,
        isFree: true,
        rating: 4.7,
        categoria: 'naturaleza',
        image: 'https://images.pexels.com/photos/1416550/pexels-photo-1416550.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 17,
        title: 'Camping en Cocora',
        location: 'Salento, Quindío',
        price: 42000,
        isFree: false,
        rating: 4.7,
        categoria: 'naturaleza',
        image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    // AVENTURA
    {
        id: 11,
        title: 'Parapente en Medellín',
        location: 'Medellín, Antioquia',
        price: 45000,
        isFree: false,
        rating: 4.9,
        categoria: 'aventura',
        image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 15,
        title: 'Trekking a Ciudad Perdida',
        location: 'Santa Marta, Magdalena',
        price: 65000,
        isFree: false,
        rating: 4.9,
        categoria: 'aventura',
        image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 14,
        title: 'Surf en Palomino',
        location: 'Palomino, Magdalena',
        price: 35000,
        isFree: false,
        rating: 4.6,
        categoria: 'aventura',
        image: 'https://images.pexels.com/photos/1444716/pexels-photo-1444716.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 16,
        title: 'Rafting en Río Guayas',
        location: 'Valle del Cauca',
        price: 38000,
        isFree: false,
        rating: 4.8,
        categoria: 'aventura',
        image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    // GASTRONOMÍA
    {
        id: 7,
        title: 'Ajiaco Bogotano',
        location: 'Bogotá, Cundinamarca',
        price: 18000,
        isFree: false,
        rating: 4.9,
        categoria: 'gastronomia',
        image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 9,
        title: 'Bandeja Paisa Auténtica',
        location: 'Medellín, Antioquia',
        price: 25000,
        isFree: false,
        rating: 4.7,
        categoria: 'gastronomia',
        image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 8,
        title: 'Ceviches Costeños',
        location: 'Barranquilla, Atlántico',
        price: 22000,
        isFree: false,
        rating: 4.8,
        categoria: 'gastronomia',
        image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 10,
        title: 'Tour Gastronómico Cartagena',
        location: 'Cartagena, Bolívar',
        price: 28000,
        isFree: false,
        rating: 4.8,
        categoria: 'gastronomia',
        image: 'https://images.pexels.com/photos/1611622/pexels-photo-1611622.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    // CULTURA
    {
        id: 4,
        title: 'Cartagena Colonial',
        location: 'Cartagena, Bolívar',
        price: 30000,
        isFree: false,
        rating: 4.6,
        categoria: 'cultura',
        image: 'https://images.pexels.com/photos/1418136/pexels-photo-1418136.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 6,
        title: 'Medellín Comuna 13',
        location: 'Medellín, Antioquia',
        price: 20000,
        isFree: false,
        rating: 4.7,
        categoria: 'cultura',
        image: 'https://images.pexels.com/photos/3785935/pexels-photo-3785935.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 2,
        title: 'Parque Tayrona',
        location: 'Santa Marta, Magdalena',
        price: 25000,
        isFree: false,
        rating: 4.8,
        categoria: 'cultura',
        image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 12,
        title: 'Buceo en San Andrés',
        location: 'San Andrés',
        price: 55000,
        isFree: false,
        rating: 4.8,
        categoria: 'cultura',
        image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        id: 13,
        title: 'Escalada en Suesca',
        location: 'Suesca, Cundinamarca',
        price: 40000,
        isFree: false,
        rating: 4.7,
        categoria: 'cultura',
        image: 'https://images.pexels.com/photos/1103966/pexels-photo-1103966.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
];

const Explorar = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('todos');

    // Aplicar filtro
    const filtered =
        activeFilter === 'todos'
            ? SAMPLE_EXPERIENCES
            : SAMPLE_EXPERIENCES.filter(exp => exp.categoria === activeFilter);

    return (
        <>
            <Header />

            <div className="explorar">
                {/* Header con botón atrás */}
                <div className="explorar__header">
                    <div className="explorar__header-content">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="explorar__back"
                        >
                            <IoArrowBack />
                        </button>

                        <h1 className="explorar__title">Explorar</h1>
                    </div>
                </div>

                {/* Barra de filtros */}
                <div className="explorar__filters">
                    <div className="explorar__filters-container">
                        {FILTERS.map(filtro => {
                            const classes =
                                'explorar__filter' +
                                (activeFilter === filtro.id
                                    ? ' explorar__filter--active'
                                    : '');

                            return (
                                <button
                                    key={filtro.id}
                                    className={classes}
                                    onClick={() => setActiveFilter(filtro.id)}
                                >
                                    <filtro.Icon /> {filtro.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="explorar__content">
                    {/* Grid de tarjetas */}
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
                                onClick={() => navigate('/experience/' + exp.id)}
                            />
                        ))}
                    </div>

                    {/* Mensaje cuando no hay resultados */}
                    {filtered.length === 0 && (
                        <div className="explorar__empty">
                            <p>Ups, no hay experiencias en esta categoría todavía.</p>
                        </div>
                    )}
                </div>

                {/* Navegación inferior */}
                <BottomNav />
            </div>

            <Footer />
        </>
    );
};

export default Explorar;
