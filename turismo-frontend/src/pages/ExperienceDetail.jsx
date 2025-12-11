import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiClock, HiLightningBolt, HiStar, HiLocationMarker, HiCheck } from 'react-icons/hi';
import { IoArrowBack } from 'react-icons/io5';
import Button from '../components/Button';
import '../styles/ExperienceDetail.css';

// TODAS LAS EXPERIENCIAS REALES DE COLOMBIA
const EXPERIENCIAS_DATA = {
    1: {
        id: 1,
        nombre: 'Caño Cristales',
        descripcion: 'Una de las maravillas naturales más espectaculares de Colombia. Disfruta de vistas panorámicas del río de los cinco colores, senderismo ecológico y la flora y fauna única de la región.',
        categoria: 'Naturaleza',
        ubicacion: 'La Macarena, Meta',
        precio: null,
        isFree: true,
        duracion: '2 días / 1 noche',
        dificultad: 'Media',
        incluye: [
            'Guía experto en naturaleza',
            'Transporte desde punto de encuentro',
            'Alojamiento básico',
            'Comidas incluidas',
            'Seguro de accidentes'
        ],
        imagenes: [
            'https://images.pexels.com/photos/3408357/pexels-photo-3408357.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
        ],
        rating: 4.9,
        resenas: [
            {
                id: 1,
                usuario: 'Laura Martínez',
                rating: 5,
                comentario: '¡Absolutamente increíble! Los colores del río son reales y más hermosos de lo que esperaba.',
                fecha: '2024-12-05',
                fotos: []
            },
            {
                id: 2,
                usuario: 'Pedro González',
                rating: 5,
                comentario: 'Una experiencia que cambió mi perspectiva sobre la naturaleza de Colombia.',
                fecha: '2024-12-01',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Carlos Mendoza',
            avatar: null,
            experiencia: '8 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    2: {
        id: 2,
        nombre: 'Parque Tayrona',
        descripcion: 'Explora una de las áreas protegidas más hermosas de Colombia, donde la selva tropical encuentra el mar Caribe. Camina por senderos rodeados de biodiversidad única.',
        categoria: 'Naturaleza',
        ubicacion: 'Santa Marta, Magdalena',
        precio: 25000,
        isFree: false,
        duracion: '1 día',
        dificultad: 'Fácil',
        incluye: [
            'Entrada al parque',
            'Guía turístico profesional',
            'Refrigerios',
            'Transporte dentro del parque'
        ],
        imagenes: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        rating: 4.8,
        resenas: [
            {
                id: 1,
                usuario: 'Ana López',
                rating: 5,
                comentario: 'Playas vírgenes y selva tropical. Definitivamente uno de los mejores lugares de Colombia.',
                fecha: '2024-11-28',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Miguel Torres',
            avatar: null,
            experiencia: '6 años',
            idiomas: ['Español', 'Inglés', 'Francés']
        }
    },
    3: {
        id: 3,
        nombre: 'San Andrés Islas',
        descripcion: 'Disfruta del paraíso caribeño con playas de arena blanca, aguas cristalinas y un ambiente tropical relajante. Perfecto para descansar y explorar la cultura isleña.',
        categoria: 'Naturaleza',
        ubicacion: 'San Andrés, Departamento de San Andrés',
        precio: null,
        isFree: true,
        duracion: '3 días / 2 noches',
        dificultad: 'Fácil',
        incluye: [
            'Alojamiento en hotel 3 estrellas',
            'Desayuno diario',
            'Tours a snorkel incluidos',
            'Transporte en la isla'
        ],
        imagenes: [
            'https://images.pexels.com/photos/1416550/pexels-photo-1416550.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop'
        ],
        rating: 4.7,
        resenas: [
            {
                id: 1,
                usuario: 'Sofía Ramírez',
                rating: 5,
                comentario: 'El Caribe colombiano es simplemente hermoso. Recomendado 100%.',
                fecha: '2024-11-20',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Jennifer Baptiste',
            avatar: null,
            experiencia: '7 años',
            idiomas: ['Español', 'Inglés', 'Creole']
        }
    },
    4: {
        id: 4,
        nombre: 'Cartagena Colonial',
        descripcion: 'Camina por las calles empedradas de una de las ciudades más románticas de América Latina. Descubre historia, arquitectura colonial y la rica cultura cartagenera.',
        categoria: 'Cultura',
        ubicacion: 'Cartagena, Bolívar',
        precio: 30000,
        isFree: false,
        duracion: '4 horas',
        dificultad: 'Fácil',
        incluye: [
            'Guía histórico especializado',
            'Entrada a iglesias coloniales',
            'Refrigerio típico',
            'Mapas de la ciudad'
        ],
        imagenes: [
            'https://images.pexels.com/photos/1418136/pexels-photo-1418136.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=600&fit=crop'
        ],
        rating: 4.6,
        resenas: [
            {
                id: 1,
                usuario: 'Roberto Silva',
                rating: 5,
                comentario: 'La historia de Cartagena es fascinante. El guía fue excelente explicando cada detalle.',
                fecha: '2024-11-15',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Alejandro Fuentes',
            avatar: null,
            experiencia: '10 años',
            idiomas: ['Español', 'Inglés', 'Italiano']
        }
    },
    5: {
        id: 5,
        nombre: 'Valle de Cocora',
        descripcion: 'Camina entre las palmeras de cera más altas del mundo en un paisaje de ensueño. Una experiencia mágica rodeada de montañas verdes y neblina tropical.',
        categoria: 'Naturaleza',
        ubicacion: 'Salento, Quindío',
        precio: 35000,
        isFree: false,
        duracion: '1 día completo',
        dificultad: 'Media',
        incluye: [
            'Transporte desde Salento',
            'Guía naturalista',
            'Almuerzo típico',
            'Entrada al valle',
            'Fotos profesionales'
        ],
        imagenes: [
            'https://images.pexels.com/photos/2869969/pexels-photo-2869969.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop'
        ],
        rating: 4.8,
        resenas: [
            {
                id: 1,
                usuario: 'Valentina Ortiz',
                rating: 5,
                comentario: 'Uno de los lugares más mágicos que he visitado. Las palmeras son gigantes y el paisaje es de película.',
                fecha: '2024-11-10',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Diego Vargas',
            avatar: null,
            experiencia: '5 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    6: {
        id: 6,
        nombre: 'Medellín Comuna 13',
        descripcion: 'Descubre la transformación urbana más inspiradora de Colombia. Coloridas fachadas, arte callejero y una comunidad que cuenta su historia a través del graffiti.',
        categoria: 'Cultura',
        ubicacion: 'Medellín, Antioquia',
        precio: 20000,
        isFree: false,
        duracion: '3 horas',
        dificultad: 'Media',
        incluye: [
            'Guía de la comunidad local',
            'Tour completo por las escaleras',
            'Visita a galería de arte',
            'Refrigerio'
        ],
        imagenes: [
            'https://images.pexels.com/photos/3785935/pexels-photo-3785935.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
        ],
        rating: 4.7,
        resenas: [
            {
                id: 1,
                usuario: 'Juliana Gómez',
                rating: 5,
                comentario: 'Increíble la historia de transformación. Los guías son apasionados y muy conocedores.',
                fecha: '2024-11-05',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Juan Zapata',
            avatar: null,
            experiencia: '6 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    7: {
        id: 7,
        nombre: 'Ajiaco Bogotano',
        descripcion: 'Vive la experiencia culinaria de Bogotá probando el plato más emblemático de la ciudad. Aprende su historia, ingredientes y técnica de preparación tradicional.',
        categoria: 'Gastronomía',
        ubicacion: 'Bogotá, Cundinamarca',
        precio: 18000,
        isFree: false,
        duracion: '2 horas',
        dificultad: 'Fácil',
        incluye: [
            'Ajiaco completo',
            'Bebida típica',
            'Postre colombiano',
            'Historia gastronómica'
        ],
        imagenes: [
            'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop'
        ],
        rating: 4.9,
        resenas: [
            {
                id: 1,
                usuario: 'Martín Ruiz',
                rating: 5,
                comentario: 'El mejor ajiaco que he probado. Auténtico y delicioso.',
                fecha: '2024-12-02',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Marisol Henao',
            avatar: null,
            experiencia: '12 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    8: {
        id: 8,
        nombre: 'Ceviches Costeños',
        descripcion: 'Disfruta de los sabores frescos del Caribe con un tour gastronómico de ceviches auténticos. Aprende sobre ingredientes locales y técnicas de preparación costeña.',
        categoria: 'Gastronomía',
        ubicacion: 'Barranquilla, Atlántico',
        precio: 22000,
        isFree: false,
        duracion: '2.5 horas',
        dificultad: 'Fácil',
        incluye: [
            'Degustación de 4 ceviches diferentes',
            'Bebidas costeñas',
            'Entrada a mercado de mariscos',
            'Recetas impresas'
        ],
        imagenes: [
            'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1570122310611-5b6b6d44aaf5?w=800&h=600&fit=crop'
        ],
        rating: 4.8,
        resenas: [
            {
                id: 1,
                usuario: 'Gabriela Díaz',
                rating: 5,
                comentario: 'Los ceviches eran frescos y deliciosos. La chef contó historias fascinantes sobre la gastronomía costeña.',
                fecha: '2024-11-30',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Carmen Estrada',
            avatar: null,
            experiencia: '8 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    9: {
        id: 9,
        nombre: 'Bandeja Paisa Auténtica',
        descripcion: 'Vive la experiencia completa de la gastronomía paisa. Desde la historia hasta la degustación de la auténtica bandeja paisa acompañada de bebidas típicas.',
        categoria: 'Gastronomía',
        ubicacion: 'Medellín, Antioquia',
        precio: 25000,
        isFree: false,
        duracion: '3 horas',
        dificultad: 'Fácil',
        incluye: [
            'Bandeja paisa completa',
            'Café paisa',
            'Postre típico antioqueño',
            'Taller de recetas',
            'Visita a mercado local'
        ],
        imagenes: [
            'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
        ],
        rating: 4.7,
        resenas: [
            {
                id: 1,
                usuario: 'Felipe Moreno',
                rating: 5,
                comentario: 'Auténtica gastronomía paisa. El ambiente, la comida y el servicio fueron perfectos.',
                fecha: '2024-11-25',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Rosa María Ceballos',
            avatar: null,
            experiencia: '10 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    10: {
        id: 10,
        nombre: 'Tour Gastronómico Cartagena',
        descripcion: 'Recorre los mejores restaurantes y mercados de Cartagena probando platos típicos costeños con vista a la ciudad amurallada.',
        categoria: 'Gastronomía',
        ubicacion: 'Cartagena, Bolívar',
        precio: 28000,
        isFree: false,
        duracion: '4 horas',
        dificultad: 'Fácil',
        incluye: [
            'Entrada a 3 restaurantes',
            'Degustación de platillos típicos',
            'Bebidas cartageneras',
            'Postre en café histórico',
            'Guía gastronómico especializado'
        ],
        imagenes: [
            'https://images.pexels.com/photos/1611622/pexels-photo-1611622.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1555939594-58d7cb561341?w=800&h=600&fit=crop'
        ],
        rating: 4.8,
        resenas: [
            {
                id: 1,
                usuario: 'Camila Montoya',
                rating: 5,
                comentario: 'Excelente combinación de gastronomía, historia y vista. Recomendado al 100%.',
                fecha: '2024-11-18',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Francisco Navarro',
            avatar: null,
            experiencia: '9 años',
            idiomas: ['Español', 'Inglés', 'Francés']
        }
    },
    11: {
        id: 11,
        nombre: 'Parapente en Medellín',
        descripcion: 'Vuela sobre la Ciudad de la Eterna Primavera con un parapentista experimentado. Disfruta de vistas aéreas espectaculares de los valles de Aburrá.',
        categoria: 'Aventura',
        ubicacion: 'Medellín, Antioquia',
        precio: 45000,
        isFree: false,
        duracion: '2 horas',
        dificultad: 'Difícil',
        incluye: [
            'Equipo de parapente completo',
            'Instructor certificado',
            'Fotos aéreas profesionales',
            'Seguro de aventura',
            'Transporte a zona de despegue'
        ],
        imagenes: [
            'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1526478612444-4e61967c00ee?w=800&h=600&fit=crop'
        ],
        rating: 4.9,
        resenas: [
            {
                id: 1,
                usuario: 'Daniela Cruz',
                rating: 5,
                comentario: 'Experiencia de vida. Las vistas son brutales y el instructor hizo que me sintiera completamente segura.',
                fecha: '2024-12-03',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Andrés Posada',
            avatar: null,
            experiencia: '12 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    12: {
        id: 12,
        nombre: 'Buceo en San Andrés',
        descripcion: 'Explora los arrecifes coralinos de San Andrés con un buzo certificado. Descubre la biodiversidad marina del Caribe colombiano.',
        categoria: 'Aventura',
        ubicacion: 'San Andrés, Departamento de San Andrés',
        precio: 55000,
        isFree: false,
        duracion: '4 horas',
        dificultad: 'Difícil',
        incluye: [
            'Equipo de buceo completo',
            'Instructor PADI certificado',
            'Transporte en barco',
            'Almuerzo en la playa',
            'Certificado de buceo'
        ],
        imagenes: [
            'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1544546375-c477da97edf0?w=800&h=600&fit=crop'
        ],
        rating: 4.8,
        resenas: [
            {
                id: 1,
                usuario: 'Eduardo Vargas',
                rating: 5,
                comentario: 'Los arrecifes son hermosos. El instructor fue profesional y hizo la experiencia muy segura.',
                fecha: '2024-11-22',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Tommy Johnson',
            avatar: null,
            experiencia: '15 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    13: {
        id: 13,
        nombre: 'Escalada en Suesca',
        descripcion: 'Escala las mejores rutas de roca de Colombia en Suesca. Perfecto para principiantes y escaladores experimentados.',
        categoria: 'Aventura',
        ubicacion: 'Suesca, Cundinamarca',
        precio: 40000,
        isFree: false,
        duracion: '4 horas',
        dificultad: 'Difícil',
        incluye: [
            'Equipo de escalada completo',
            'Instructor certificado en escalada',
            'Seguro de accidentes',
            'Refrigerio',
            'Fotos de la actividad'
        ],
        imagenes: [
            'https://images.pexels.com/photos/1103966/pexels-photo-1103966.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1522836369035-c89cebe5b3b1?w=800&h=600&fit=crop'
        ],
        rating: 4.7,
        resenas: [
            {
                id: 1,
                usuario: 'Nicolás Acosta',
                rating: 5,
                comentario: 'Excelente instrucción. Fue mi primera vez escalando y me sintieron muy bien apoyado.',
                fecha: '2024-11-16',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Ricardo Morales',
            avatar: null,
            experiencia: '8 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    14: {
        id: 14,
        nombre: 'Surf en Palomino',
        descripcion: 'Aprende o mejora tus habilidades de surf en las playas salvajes de Palomino. Olas, playa virgen y el espíritu del surfer.',
        categoria: 'Aventura',
        ubicacion: 'Palomino, Magdalena',
        precio: 35000,
        isFree: false,
        duracion: '3 horas',
        dificultad: 'Difícil',
        incluye: [
            'Tabla de surf',
            'Instructor de surf certificado',
            'Traje de baño',
            'Almuerzo típico',
            'Fotos acuáticas'
        ],
        imagenes: [
            'https://images.pexels.com/photos/1444716/pexels-photo-1444716.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop'
        ],
        rating: 4.6,
        resenas: [
            {
                id: 1,
                usuario: 'Mateo Reyes',
                rating: 5,
                comentario: 'Playas vírgenes y olas perfectas. El instructor muy paciente. Épico.',
                fecha: '2024-11-12',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Lucas Fernández',
            avatar: null,
            experiencia: '7 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    15: {
        id: 15,
        nombre: 'Trekking a Ciudad Perdida',
        descripcion: 'Camina por la selva tropical hacia una de las ciudadelas arqueológicas más importantes de América del Sur. Una aventura de 4 días inolvidable.',
        categoria: 'Aventura',
        ubicacion: 'Santa Marta, Magdalena',
        precio: 65000,
        isFree: false,
        duracion: '4 días / 3 noches',
        dificultad: 'Difícil',
        incluye: [
            'Guía arqueológico especializado',
            'Alojamiento en lodges',
            'Todas las comidas',
            'Transporte desde Santa Marta',
            'Seguro de accidentes'
        ],
        imagenes: [
            'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1551503015-016d088db765?w=800&h=600&fit=crop'
        ],
        rating: 4.9,
        resenas: [
            {
                id: 1,
                usuario: 'Óscar Delgado',
                rating: 5,
                comentario: 'Una de las mejores experiencias de mi vida. La historia, la naturaleza y la aventura todo perfecto.',
                fecha: '2024-10-30',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Samuel Quintero',
            avatar: null,
            experiencia: '11 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    16: {
        id: 16,
        nombre: 'Rafting en Río Guayas',
        descripcion: 'Baja rápidos emocionantes del río Guayas en una aventura de agua blanca. Adrenalina y naturaleza en el Valle del Cauca.',
        categoria: 'Aventura',
        ubicacion: 'Valle del Cauca',
        precio: 38000,
        isFree: false,
        duracion: '3 horas',
        dificultad: 'Media',
        incluye: [
            'Equipo de rafting completo',
            'Guía certificado en agua blanca',
            'Chaleco salvavidas',
            'Almuerzo',
            'Seguro de aventura'
        ],
        imagenes: [
            'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
        ],
        rating: 4.8,
        resenas: [
            {
                id: 1,
                usuario: 'Viviana Santos',
                rating: 5,
                comentario: 'Adrenalina pura. El guía fue excelente y el paisaje del río hermoso.',
                fecha: '2024-11-08',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Jorge Restrepo',
            avatar: null,
            experiencia: '9 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    17: {
        id: 17,
        nombre: 'Camping en Cocora',
        descripcion: 'Acampa bajo las estrellas en el corazón del Valle de Cocora, rodeado de las palmeras más altas del mundo y bosques de niebla.',
        categoria: 'Naturaleza',
        ubicacion: 'Salento, Quindío',
        precio: 42000,
        isFree: false,
        duracion: '2 días / 1 noche',
        dificultad: 'Media',
        incluye: [
            'Tienda de campaña y equipo',
            'Alimentos y bebidas',
            'Guía naturalista',
            'Fogata',
            'Transporte desde Salento'
        ],
        imagenes: [
            'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=600&fit=crop'
        ],
        rating: 4.7,
        resenas: [
            {
                id: 1,
                usuario: 'Lucía Vargas',
                rating: 5,
                comentario: 'Mágico. Acampar rodeado de naturaleza tan pura es una experiencia que no olvido.',
                fecha: '2024-11-03',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Wilson Peña',
            avatar: null,
            experiencia: '7 años',
            idiomas: ['Español', 'Inglés']
        }
    },
    18: {
        id: 18,
        nombre: 'Tirolesa en la Selva',
        descripcion: 'Vuela sobre el dosel de la selva amazónica en una emocionante aventura de tirolesa. Vistas únicas de la biodiversidad amazónica.',
        categoria: 'Aventura',
        ubicacion: 'Leticia, Amazonas',
        precio: 55000,
        isFree: false,
        duracion: '3 horas',
        dificultad: 'Difícil',
        incluye: [
            'Equipo de tirolesa completo',
            'Instructor certificado',
            'Guía naturalista amazónico',
            'Fotos profesionales',
            'Transporte desde Leticia'
        ],
        imagenes: [
            'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.unsplash.com/photo-1511316695145-4992006ffddb?w=800&h=600&fit=crop'
        ],
        rating: 4.8,
        resenas: [
            {
                id: 1,
                usuario: 'Rodrigo Gómez',
                rating: 5,
                comentario: 'Ver la selva desde arriba es una perspectiva completamente diferente. Increíble.',
                fecha: '2024-10-25',
                fotos: []
            }
        ],
        guia: {
            nombre: 'Paulo Silva',
            avatar: null,
            experiencia: '8 años',
            idiomas: ['Español', 'Inglés', 'Portugués']
        }
    }
};

const ExperienceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    // Obtener experiencia del objeto usando el ID
    const experiencia = EXPERIENCIAS_DATA[parseInt(id)] || null;

    if (!experiencia) {
        return (
            <div className="experience-detail">
                <div className="experience-detail__error">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="experience-detail__back"
                    >
                        <IoArrowBack />
                    </button>
                    <p>Experiencia no encontrada</p>
                </div>
            </div>
        );
    }

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

    // Renderizado de estrellas dinámico
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
                            {experiencia.guia.avatar ? (
                                <img
                                    src={experiencia.guia.avatar}
                                    alt={`Avatar de ${experiencia.guia.nombre}`}
                                />
                            ) : (
                                <span aria-label={`Iniciales de ${experiencia.guia.nombre}`}>
                                    {experiencia.guia.nombre.charAt(0)}
                                </span>
                            )}
                        </div>

                        <div className="experience-detail__guide-info">
                            <h3>{experiencia.guia.nombre}</h3>
                            <p>Experiencia: {experiencia.guia.experiencia}</p>
                            <p>Idiomas: {experiencia.guia.idiomas.join(', ')}</p>
                        </div>
                    </div>
                </div>

                {/* GALERÍA */}
                {experiencia.imagenes.length > 1 && (
                    <div className="experience-detail__section">
                        <h2 className="experience-detail__section-title">Galería</h2>

                        <div className="experience-detail__gallery">
                            {experiencia.imagenes.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${experiencia.nombre} - foto ${index + 1}`}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                )}

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
                        {experiencia.resenas.map((resena) => (
                            <div key={resena.id} className="experience-detail__review">
                                <div className="experience-detail__review-header">
                                    <h4>{resena.usuario}</h4>
                                    {renderRatingStars(resena.rating)}
                                </div>

                                <p className="experience-detail__review-comment">
                                    {resena.comentario}
                                </p>
                                <span className="experience-detail__review-date">
                                    {resena.fecha}
                                </span>
                            </div>
                        ))}

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
                                            onKeyDown={(e) =>
                                                (e.key === 'Enter' || e.key === ' ') &&
                                                setRating(star)
                                            }
                                            role="button"
                                            tabIndex="0"
                                            aria-label={`${star} estrella${
                                                star !== 1 ? 's' : ''
                                            }`}
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