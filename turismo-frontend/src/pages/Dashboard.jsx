import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiSearch } from 'react-icons/fi';
import Card from '../components/Card';
import '../styles/Dashboard.css';


const TABS = [
    { id: 'lugares', label: ' Lugares' },
    { id: 'restaurantes', label: ' Gastronomía' },
    { id: 'deporte', label: ' Deporte' },
    { id: 'aventura', label: ' Aventura' }
];

// DATOS REALES DE COLOMBIA
const EXPERIENCES = {
    lugares: [
        {
            id: 1,
            title: 'Caño Cristales',
            location: 'La Macarena, Meta',
            price: null,
            isFree: true,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
            category: 'lugares'
        },
        {
            id: 2,
            title: 'Parque Tayrona',
            location: 'Santa Marta, Magdalena',
            price: 25000,
            isFree: false,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            category: 'lugares'
        },
        {
            id: 3,
            title: 'San Andrés Islas',
            location: 'Departamento de San Andrés',
            price: null,
            isFree: true,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop',
            category: 'lugares'
        },
        {
            id: 4,
            title: 'Cartagena Colonial',
            location: 'Cartagena, Bolívar',
            price: 30000,
            isFree: false,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop',
            category: 'lugares'
        },
        {
            id: 5,
            title: 'Eje Cafetero',
            location: 'Quindío y Risaralda',
            price: 35000,
            isFree: false,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
            category: 'lugares'
        },
        {
            id: 6,
            title: 'Medellín Comuna 13',
            location: 'Medellín, Antioquia',
            price: 20000,
            isFree: false,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            category: 'lugares'
        }
    ],
    restaurantes: [
        {
            id: 7,
            title: 'Ajiaco Bogotano',
            location: 'Bogotá, Cundinamarca',
            price: 18000,
            isFree: false,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
            category: 'restaurantes'
        },
        {
            id: 8,
            title: 'Ceviches de Pescado',
            location: 'Barranquilla, Atlántico',
            price: 22000,
            isFree: false,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1570122310611-5b6b6d44aaf5?w=400&h=300&fit=crop',
            category: 'restaurantes'
        },
        {
            id: 9,
            title: 'Bandeja Paisa Tour',
            location: 'Medellín, Antioquia',
            price: 25000,
            isFree: false,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
            category: 'restaurantes'
        },
        {
            id: 10,
            title: 'Tour Gastronómico',
            location: 'Cartagena, Bolívar',
            price: 28000,
            isFree: false,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561341?w=400&h=300&fit=crop',
            category: 'restaurantes'
        }
    ],
    deporte: [
        {
            id: 11,
            title: 'Parapente en Medellín',
            location: 'Medellín, Antioquia',
            price: 45000,
            isFree: false,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1526478612444-4e61967c00ee?w=400&h=300&fit=crop',
            category: 'deporte'
        },
        {
            id: 12,
            title: 'Buceo en San Andrés',
            location: 'San Andrés, Departamento de San Andrés',
            price: 55000,
            isFree: false,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
            category: 'deporte'
        },
        {
            id: 13,
            title: 'Escalada en Suesca',
            location: 'Suesca, Cundinamarca',
            price: 40000,
            isFree: false,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1522836369035-c89cebe5b3b1?w=400&h=300&fit=crop',
            category: 'deporte'
        },
        {
            id: 14,
            title: 'Surf en Palomino',
            location: 'Palomino, Magdalena',
            price: 35000,
            isFree: false,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop',
            category: 'deporte'
        }
    ],
    aventura: [
        {
            id: 15,
            title: 'Trekking a Ciudad Perdida',
            location: 'Santa Marta, Magdalena',
            price: 65000,
            isFree: false,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1551503015-016d088db765?w=400&h=300&fit=crop',
            category: 'aventura'
        },
        {
            id: 16,
            title: 'Rafting en Río Guayas',
            location: 'Valle del Cauca',
            price: 38000,
            isFree: false,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            category: 'aventura'
        },
        {
            id: 17,
            title: 'Camping en Cocora',
            location: 'Salento, Quindío',
            price: 42000,
            isFree: false,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&h=300&fit=crop',
            category: 'aventura'
        },
        {
            id: 18,
            title: 'Tirolesa en la Selva',
            location: 'Leticia, Amazonas',
            price: 55000,
            isFree: false,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1511316695145-4992006ffddb?w=400&h=300&fit=crop',
            category: 'aventura'
        }
    ]
};

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('lugares');

    const nombreMostrar = user?.nombre ? user.nombre.split(' ')[0] : 'Explorador';

    // Filtrar experiencias por tab y búsqueda
    const filteredExperiences = EXPERIENCES[activeTab].filter(exp =>
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            
            
            <div className="dashboard">
                <div className="dashboard__header">
                    <div className="dashboard__header-content">
                        <p className="dashboard__greeting">Buen día</p>
                        <h1 className="dashboard__user-name">{nombreMostrar}</h1>

                        <div className="dashboard__search">
                            <FiSearch className="dashboard__search-icon" aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Buscar experiencias..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="dashboard__search-input input"
                                aria-label="Campo de búsqueda de experiencias"
                            />
                        </div>

                        <div className="dashboard__tabs" role="tablist">
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`dashboard__tab ${activeTab === tab.id ? 'dashboard__tab--active' : ''}`}
                                    role="tab"
                                    aria-selected={activeTab === tab.id}
                                    id={`tab-${tab.id}`}
                                    aria-controls={`panel-${tab.id}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="dashboard__content">
                    <h2 className="dashboard__section-title">
                        {activeTab === 'lugares' && ' Lugares Destacados'}
                        {activeTab === 'restaurantes' && ' Experiencias Gastronómicas'}
                        {activeTab === 'deporte' && ' Actividades Deportivas'}
                        {activeTab === 'aventura' && ' Aventuras Extremas'}
                    </h2>

                    <div
                        className="dashboard__tab-panel"
                        id={`panel-${activeTab}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${activeTab}`}
                    >
                        {filteredExperiences.length > 0 ? (
                            <div className="dashboard__grid">
                                {filteredExperiences.map(exp => (
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
                        ) : (
                            <div className="dashboard__no-results">
                                <p>No se encontraron experiencias que coincidan con "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>

                
            </div>

            
        </>
    );
};

export default Dashboard;
