import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Experiencia from '../models/Experiencia.js';
import Ruta from '../models/Ruta.js';
import Insignia from '../models/Insignia.js';
import connectDB from '../config/db.js';

dotenv.config();

// datos de ejemplo para poblar la base de datos
const seedDatabase = async () => {
    try {
        console.log('🌱 Iniciando seed de la base de datos...');

        // conectamos a la BD
        await connectDB();

        // limpiamos la base de datos
        console.log('🗑️  Limpiando base de datos...');
        await User.deleteMany({});
        await Experiencia.deleteMany({});
        await Ruta.deleteMany({});
        await Insignia.deleteMany({});

        // creamos usuarios de prueba
        console.log('👤 Creando usuarios...');
        const usuarios = await User.create([
            {
                nombre: 'Juan',
                apellido: 'Pérez',
                email: 'juan@test.com',
                telefono: '+573001234567',
                fechaNacimiento: new Date('1995-05-15'),
                genero: 'masculino',
                password: '123456',
                rol: 'turista',
                preferenciasViaje: {
                    categoriasPreferidas: ['gastronomía', 'cultura'],
                    estiloViaje: 'cultural',
                    rangoPresupuesto: { minimo: 50000, maximo: 200000 },
                    disponibilidad: 'fin de semana'
                }
            },
            {
                nombre: 'María',
                apellido: 'González',
                email: 'maria@test.com',
                telefono: '+573009876543',
                fechaNacimiento: new Date('1990-08-20'),
                genero: 'femenino',
                password: '123456',
                rol: 'guia',
                idiomas: ['Español', 'Inglés'],
                añosExperiencia: 5,
                descripcionPerfil: 'Guía turística especializada en rutas gastronómicas y culturales'
            },
            {
                nombre: 'Carlos',
                apellido: 'Rodríguez',
                email: 'carlos@test.com',
                telefono: '+573005555555',
                fechaNacimiento: new Date('1988-03-10'),
                genero: 'masculino',
                password: '123456',
                rol: 'guia',
                idiomas: ['Español', 'Francés'],
                añosExperiencia: 8,
                descripcionPerfil: 'Guía especializado en aventura y naturaleza'
            }
        ]);

        console.log(`✅ ${usuarios.length} usuarios creados`);

        // creamos experiencias agrupadas por ciudad
        console.log('🎨 Creando experiencias...');
        const experiencias = await Experiencia.create([
            // ===== BOGOTÁ (3 experiencias) =====
            {
                titulo: 'Tour Gastronómico por La Candelaria',
                descripcion: 'Descubre los sabores tradicionales de Bogotá en un recorrido por el centro histórico',
                categorias: ['gastronomía', 'cultura'],
                ubicacion: {
                    ciudad: 'Bogotá',
                    pais: 'Colombia',
                    direccion: 'La Candelaria',
                    coordenadas: { type: 'Point', coordinates: [-74.1810727, 4.316107698] }
                },
                guias: [usuarios[1]._id],
                ediciones: [{ nombre: 'Tour diurno', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 80000, horario: '10:00 AM - 2:00 PM', isActiva: true }],
                capacidadMaxima: 10,
                calificacionPromedio: 4.8
            },
            {
                titulo: 'Recorrido por Museos de Bogotá',
                descripcion: 'Visita los principales museos de la capital: Museo del Oro, Botero y Nacional',
                categorias: ['cultura', 'arte', 'historia'],
                ubicacion: {
                    ciudad: 'Bogotá',
                    pais: 'Colombia',
                    direccion: 'Centro Histórico',
                    coordenadas: { type: 'Point', coordinates: [-74.1810727, 4.316107698] }
                },
                guias: [usuarios[1]._id],
                ediciones: [{ nombre: 'Tour completo', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 60000, horario: '9:00 AM - 1:00 PM', isActiva: true }],
                capacidadMaxima: 15,
                calificacionPromedio: 4.7
            },
            {
                titulo: 'Ciclopaseo por Bogotá',
                descripcion: 'Recorre la ciudad en bicicleta por las ciclorrutas más emblemáticas',
                categorias: ['deportes', 'naturaleza'],
                ubicacion: {
                    ciudad: 'Bogotá',
                    pais: 'Colombia',
                    direccion: 'Parque Simón Bolívar',
                    coordenadas: { type: 'Point', coordinates: [-74.1810727, 4.316107698] }
                },
                guias: [usuarios[2]._id],
                ediciones: [{ nombre: 'Ciclopaseo dominical', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 40000, horario: '7:00 AM - 11:00 AM', isActiva: true }],
                capacidadMaxima: 20,
                calificacionPromedio: 4.6
            },

            // ===== MEDELLÍN (4 experiencias) =====
            {
                titulo: 'Clase de Cocina Paisa',
                descripcion: 'Aprende a preparar la tradicional bandeja paisa con ingredientes locales',
                categorias: ['gastronomía', 'cultura'],
                ubicacion: {
                    ciudad: 'Medellín',
                    pais: 'Colombia',
                    direccion: 'El Poblado',
                    coordenadas: { type: 'Point', coordinates: [-75.61103107, 6.257590259] }
                },
                guias: [usuarios[1]._id],
                ediciones: [{ nombre: 'Clase grupal', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 120000, horario: '3:00 PM - 6:00 PM', isActiva: true }],
                capacidadMaxima: 8,
                calificacionPromedio: 5.0
            },
            {
                titulo: 'Graffiti Tour Comuna 13',
                descripcion: 'Recorre la Comuna 13 y conoce su transformación a través del arte urbano',
                categorias: ['arte', 'cultura'],
                ubicacion: {
                    ciudad: 'Medellín',
                    pais: 'Colombia',
                    direccion: 'Comuna 13 - San Javier',
                    coordenadas: { type: 'Point', coordinates: [-75.61103107, 6.257590259] }
                },
                guias: [usuarios[1]._id],
                ediciones: [{ nombre: 'Tour de grafiti', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 45000, horario: '2:00 PM - 5:00 PM', isActiva: true }],
                capacidadMaxima: 20,
                calificacionPromedio: 5.0
            },
            {
                titulo: 'Parapente en San Félix',
                descripcion: 'Experimenta la adrenalina de volar en parapente con vistas espectaculares de Medellín',
                categorias: ['aventura', 'deportes'],
                ubicacion: {
                    ciudad: 'Medellín',
                    pais: 'Colombia',
                    direccion: 'San Félix',
                    coordenadas: { type: 'Point', coordinates: [-75.61103107, 6.257590259] }
                },
                guias: [usuarios[2]._id],
                ediciones: [{ nombre: 'Vuelo básico', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 150000, horario: '8:00 AM - 12:00 PM', isActiva: true }],
                capacidadMaxima: 5,
                calificacionPromedio: 4.9
            },
            {
                titulo: 'Parque Arví y Metrocable',
                descripcion: 'Sube en el Metrocable y disfruta del Parque Arví con senderismo ecológico',
                categorias: ['naturaleza', 'aventura'],
                ubicacion: {
                    ciudad: 'Medellín',
                    pais: 'Colombia',
                    direccion: 'Parque Arví',
                    coordenadas: { type: 'Point', coordinates: [-75.61103107, 6.257590259] }
                },
                guias: [usuarios[2]._id],
                ediciones: [{ nombre: 'Tour completo', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 70000, horario: '9:00 AM - 3:00 PM', isActiva: true }],
                capacidadMaxima: 15,
                calificacionPromedio: 4.7
            },

            // ===== CARTAGENA (3 experiencias) =====
            {
                titulo: 'Recorrido por la Ciudad Amurallada',
                descripcion: 'Explora la historia colonial de Cartagena a través de sus murallas y calles empedradas',
                categorias: ['cultura', 'historia'],
                ubicacion: {
                    ciudad: 'Cartagena',
                    pais: 'Colombia',
                    direccion: 'Centro Histórico',
                    coordenadas: { type: 'Point', coordinates: [-75.45889915, 10.46343362] }
                },
                guias: [usuarios[1]._id],
                ediciones: [{ nombre: 'Tour histórico', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 65000, horario: '9:00 AM - 1:00 PM', isActiva: true }],
                capacidadMaxima: 15,
                calificacionPromedio: 4.9
            },
            {
                titulo: 'Tour Gastronómico Costero',
                descripcion: 'Degusta los mejores platos de la cocina caribeña colombiana',
                categorias: ['gastronomía', 'cultura'],
                ubicacion: {
                    ciudad: 'Cartagena',
                    pais: 'Colombia',
                    direccion: 'Getsemaní',
                    coordenadas: { type: 'Point', coordinates: [-75.45889915, 10.46343362] }
                },
                guias: [usuarios[1]._id],
                ediciones: [{ nombre: 'Tour de comida', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 90000, horario: '11:00 AM - 3:00 PM', isActiva: true }],
                capacidadMaxima: 12,
                calificacionPromedio: 4.8
            },
            {
                titulo: 'Islas del Rosario en Lancha',
                descripcion: 'Excursión a las hermosas Islas del Rosario con snorkel y almuerzo',
                categorias: ['naturaleza', 'aventura'],
                ubicacion: {
                    ciudad: 'Cartagena',
                    pais: 'Colombia',
                    direccion: 'Muelle La Bodeguita',
                    coordenadas: { type: 'Point', coordinates: [-75.45889915, 10.46343362] }
                },
                guias: [usuarios[2]._id],
                ediciones: [{ nombre: 'Tour de isla', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 180000, horario: '8:00 AM - 4:00 PM', isActiva: true }],
                capacidadMaxima: 25,
                calificacionPromedio: 4.7
            },

            // ===== OTRAS CIUDADES (1 experiencia cada una) =====
            {
                titulo: 'Rafting en el Río Suárez',
                descripcion: 'Experimenta la adrenalina del rafting en los rápidos del río Suárez cerca de San Gil',
                categorias: ['aventura', 'deportes', 'naturaleza'],
                ubicacion: {
                    ciudad: 'Bucaramanga',
                    pais: 'Colombia',
                    direccion: 'San Gil',
                    coordenadas: { type: 'Point', coordinates: [-73.11156997, 7.155833544] }
                },
                guias: [usuarios[2]._id],
                ediciones: [{ nombre: 'Rafting completo', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 150000, horario: '8:00 AM - 3:00 PM', isActiva: true }],
                capacidadMaxima: 12,
                calificacionPromedio: 4.9
            },
            {
                titulo: 'Tour del Café en el Eje Cafetero',
                descripcion: 'Descubre el proceso del café desde la semilla hasta la taza en una finca tradicional',
                categorias: ['gastronomía', 'cultura', 'naturaleza'],
                ubicacion: {
                    ciudad: 'Armenia',
                    pais: 'Colombia',
                    direccion: 'Finca Cafetera',
                    coordenadas: { type: 'Point', coordinates: [-75.72489985, 4.499501128] }
                },
                guias: [usuarios[1]._id],
                ediciones: [{ nombre: 'Tour del café', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 95000, horario: '9:00 AM - 4:00 PM', isActiva: true }],
                capacidadMaxima: 12,
                calificacionPromedio: 5.0
            },
            {
                titulo: 'Trekking en el Parque Tayrona',
                descripcion: 'Explora las playas paradisíacas y selva tropical del Parque Tayrona',
                categorias: ['naturaleza', 'aventura'],
                ubicacion: {
                    ciudad: 'Santa Marta',
                    pais: 'Colombia',
                    direccion: 'Parque Nacional Tayrona',
                    coordenadas: { type: 'Point', coordinates: [-73.88527855, 11.12189436] }
                },
                guias: [usuarios[2]._id],
                ediciones: [{ nombre: 'Trekking 2 días', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 250000, horario: '7:00 AM - 6:00 PM (2 días)', isActiva: true }],
                capacidadMaxima: 15,
                calificacionPromedio: 4.9
            },
            {
                titulo: 'Clase de Salsa Caleña',
                descripcion: 'Aprende a bailar salsa como los caleños en la capital mundial de la salsa',
                categorias: ['cultura', 'arte'],
                ubicacion: {
                    ciudad: 'Cali',
                    pais: 'Colombia',
                    direccion: 'Juanchito',
                    coordenadas: { type: 'Point', coordinates: [-76.57649259, 3.399043723] }
                },
                guias: [usuarios[1]._id],
                ediciones: [{ nombre: 'Clase de salsa', fechaInicio: new Date('2025-01-01'), fechaFin: new Date('2025-12-31'), precio: 50000, horario: '7:00 PM - 9:00 PM', isActiva: true }],
                capacidadMaxima: 20,
                calificacionPromedio: 4.8
            }
        ]);

        const ciudadesUnicas = new Set(experiencias.map(e => e.ubicacion.ciudad));
        console.log(`✅ ${experiencias.length} experiencias creadas en ${ciudadesUnicas.size} ciudades de Colombia`);

        // creamos rutas temáticas POR CIUDAD
        console.log('🗺️  Creando rutas temáticas...');
        const rutas = await Ruta.create([
            // Ruta en Bogotá
            {
                nombre: 'Bogotá Cultural Completa',
                descripcion: 'Explora lo mejor de la cultura bogotana en un día',
                tema: 'cultura',
                experiencias: [
                    { experienciaId: experiencias[0]._id, orden: 1, duracionEstimada: 240, notas: 'Tour gastronómico La Candelaria' },
                    { experienciaId: experiencias[1]._id, orden: 2, duracionEstimada: 240, notas: 'Recorrido por museos' }
                ],
                tiempoTotalEstimado: 480,
                dificultad: 'baja',
                creadaPor: usuarios[1]._id,
                tipoCreadaPor: 'guia',
                esOficial: true,
                esPublica: true,
                calificacionPromedio: 4.8
            },
            // Ruta en Medellín - Aventura
            {
                nombre: 'Medellín Aventura Total',
                descripcion: 'Vive la adrenalina de Medellín en un solo día',
                tema: 'aventura',
                experiencias: [
                    { experienciaId: experiencias[5]._id, orden: 1, duracionEstimada: 240, notas: 'Parapente por la mañana' },
                    { experienciaId: experiencias[6]._id, orden: 2, duracionEstimada: 360, notas: 'Parque Arví por la tarde' }
                ],
                tiempoTotalEstimado: 600,
                dificultad: 'alta',
                creadaPor: usuarios[2]._id,
                tipoCreadaPor: 'guia',
                esOficial: true,
                esPublica: true,
                calificacionPromedio: 4.9
            },
            // Ruta en Medellín - Cultura
            {
                nombre: 'Medellín Cultural y Gastronómica',
                descripcion: 'Arte, cultura y cocina paisa en esta ruta completa',
                tema: 'cultura',
                experiencias: [
                    { experienciaId: experiencias[4]._id, orden: 1, duracionEstimada: 180, notas: 'Graffiti tour Comuna 13' },
                    { experienciaId: experiencias[3]._id, orden: 2, duracionEstimada: 180, notas: 'Clase de cocina paisa' }
                ],
                tiempoTotalEstimado: 360,
                dificultad: 'baja',
                creadaPor: usuarios[1]._id,
                tipoCreadaPor: 'guia',
                esOficial: true,
                esPublica: true,
                calificacionPromedio: 5.0
            },
            // Ruta en Cartagena
            {
                nombre: 'Cartagena Mar y Cultura',
                descripcion: 'Historia colonial y playas caribeñas en un solo día',
                tema: 'cultura',
                experiencias: [
                    { experienciaId: experiencias[7]._id, orden: 1, duracionEstimada: 240, notas: 'Recorrido ciudad amurallada por la mañana' },
                    { experienciaId: experiencias[8]._id, orden: 2, duracionEstimada: 240, notas: 'Tour gastronómico al mediodía' }
                ],
                tiempoTotalEstimado: 480,
                dificultad: 'baja',
                creadaPor: usuarios[1]._id,
                tipoCreadaPor: 'guia',
                esOficial: true,
                esPublica: true,
                calificacionPromedio: 4.8
            }
        ]);

        console.log(`✅ ${rutas.length} rutas creadas (todas dentro de la misma ciudad)`);

        // creamos insignias
        console.log('🏆 Creando insignias...');
        const insignias = await Insignia.create([
            {
                nombre: 'Explorador Novato',
                descripcion: 'Completaste tu primera experiencia',
                iconoUrl: 'https://example.com/badge1.png',
                tipo: 'experiencias',
                criterio: 'Completar 1 experiencia',
                condicion: { tipo: 'experiencias', valor: 1 },
                nivel: 1
            },
            {
                nombre: 'Viajero Frecuente',
                descripcion: 'Has completado 5 experiencias',
                iconoUrl: 'https://example.com/badge2.png',
                tipo: 'experiencias',
                criterio: 'Completar 5 experiencias',
                condicion: { tipo: 'experiencias', valor: 5 },
                nivel: 2
            },
            {
                nombre: 'Maestro Explorador',
                descripcion: '¡Has completado 10 experiencias!',
                iconoUrl: 'https://example.com/badge3.png',
                tipo: 'experiencias',
                criterio: 'Completar 10 experiencias',
                condicion: { tipo: 'experiencias', valor: 10 },
                nivel: 3
            },
            {
                nombre: 'Opinador Activo',
                descripcion: 'Has dejado 5 reseñas',
                iconoUrl: 'https://example.com/badge4.png',
                tipo: 'resenas',
                criterio: 'Dejar 5 reseñas',
                condicion: { tipo: 'resenas', valor: 5 },
                nivel: 2
            }
        ]);

        console.log(`✅ ${insignias.length} insignias creadas`);

        console.log('\n🎉 ¡Seed completado exitosamente!');
        console.log('\n📊 Resumen:');
        console.log(`   - Usuarios: ${usuarios.length}`);
        console.log(`   - Experiencias: ${experiencias.length} en ${ciudadesUnicas.size} ciudades`);
        console.log(`   - Rutas: ${rutas.length} (todas dentro de la misma ciudad)`);
        console.log(`   - Insignias: ${insignias.length}`);
        console.log('\n🏙️  Ciudades con experiencias:');
        ciudadesUnicas.forEach(ciudad => console.log(`   - ${ciudad}`));
        console.log('\n👤 Usuarios de prueba:');
        console.log('   - juan@test.com / 123456 (Turista)');
        console.log('   - maria@test.com / 123456 (Guía)');
        console.log('   - carlos@test.com / 123456 (Guía)');

        process.exit(0);

    } catch (error) {
        console.error('❌ Error en el seed:', error);
        process.exit(1);
    }
};

// ejecutamos el seed
seedDatabase();
