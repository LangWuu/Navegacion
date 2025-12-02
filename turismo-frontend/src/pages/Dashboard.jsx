import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiHome, HiLocationMarker, HiStar, HiUser, HiLogout } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import Card from '../components/Card';
import '../styles/Dashboard.css';


// Las pestañas para filtrar
const TABS = [
    { id: 'lugares', label: 'Lugares' },
    { id: 'restaurantes', label: 'Restaurantes' },
    { id: 'deporte', label: 'Deporte' },
    { id: 'aventura', label: 'Aventura' }
];


// Datos de prueba (luego vendrán del backend)
const SAMPLE_EXPERIENCES = [
    {
        id: 1,
        title: 'Alto Palací',
        location: 'Valle Del Cauca',
        price: null,
        isFree: true,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        title: 'Explora Aspen',
        location: 'Villavicencio',
        price: 18500,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        title: 'Luxurious Aspen',
        location: 'Jamundí',
        price: 18500,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=400&h=300&fit=crop'
    }
];


const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Sacamos el usuario del contexto


    // Estados para la búsqueda y las pestañas
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('lugares');


    // Función para cerrar sesión
    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    // Preparamos el nombre para mostrar
    let nombreMostrar = 'Usuario';
    if (user && user.nombre) {
        nombreMostrar = user.nombre;
    }


    return (
        <div className="dashboard">
            {/* Header con saludo y buscador */}
            <div className="dashboard__header">
                <div className="dashboard__header-content">
                    <p className="dashboard__greeting">Buen día</p>
                    <h1 className="dashboard__user-name">{nombreMostrar}</h1>


                    <div className="dashboard__search">
                        <FiSearch className="dashboard__search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar experiencias..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="dashboard__search-input input"
                        />
                    </div>


                    {/* Pestañas de categorías */}
                    <div className="dashboard__tabs">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`dashboard__tab ${activeTab === tab.id ? 'dashboard__tab--active' : ''}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {/* Contenido principal */}
            <div className="dashboard__content">
                <h2 className="dashboard__section-title">Experiencias Destacadas</h2>


                <div className="dashboard__grid">
                    {SAMPLE_EXPERIENCES.map(exp => (
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
            </div>


            {/* Menú de navegación inferior */}
            <nav className="dashboard__nav">
                <div className="dashboard__nav-container">
                    <button
                        className="dashboard__nav-item dashboard__nav-item--active"
                        onClick={() => navigate('/dashboard')}
                    >
                        <HiHome className="dashboard__nav-icon" />
                        <span>Inicio</span>
                    </button>
                    <button
                        className="dashboard__nav-item"
                        onClick={() => navigate('/explorar')}
                    >
                        <HiLocationMarker className="dashboard__nav-icon" />
                        <span>Lugares</span>
                    </button>
                    <button
                        className="dashboard__nav-item"
                        onClick={() => navigate('/favoritos')}
                    >
                        <HiStar className="dashboard__nav-icon" />
                        <span>Favoritos</span>
                    </button>
                    <button
                        className="dashboard__nav-item"
                        onClick={() => navigate('/perfil')}
                    >
                        <HiUser className="dashboard__nav-icon" />
                        <span>Perfil</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};


export default Dashboard;