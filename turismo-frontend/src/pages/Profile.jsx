import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoArrowBack } from 'react-icons/io5';
import { HiHome, HiLocationMarker, HiStar, HiUser } from 'react-icons/hi';
import '../styles/Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Estado para saber si estamos editando o solo viendo
    const [isEditing, setIsEditing] = useState(false);

    // Aquí guardamos los datos del perfil
    const [formData, setFormData] = useState({
        nombre: user ? user.nombre : 'Usuario',
        apellido: user ? user.apellido : '',
        email: user ? user.email : '',
        telefono: user ? user.telefono : '', // Ojo: usar 'telefono' para que cuadre con el back
        fechaNacimiento: user ? user.fechaNacimiento : '',
        genero: user ? user.genero : ''
    });

    // Cuando escriben en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Cuando le dan a guardar
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Guardando cambios...", formData);
        // Aquí iría la llamada al backend para actualizar
        // Por ahora solo simulamos que guardó
        setIsEditing(false);
        alert("¡Cambios guardados! (Mentiris, falta conectar al back)");
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        if (window.confirm("¿Seguro que te quieres ir?")) {
            logout();
            navigate('/login');
        }
    };

    return (
        <div className="profile">
            {/* Cabecera del perfil */}
            <div className="profile__header">
                <div className="profile__header-content">
                    <button onClick={() => navigate('/dashboard')} className="profile__back">
                        <IoArrowBack />
                    </button>
                    <h1 className="profile__title">Mi Perfil</h1>
                    <button onClick={handleLogout} className="profile__logout-btn">
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            <div className="profile__content">
                <div className="profile__form">
                    <div className="profile__section">
                        <h3 className="profile__section-title">Información Personal</h3>

                        <form onSubmit={handleSubmit}>
                            {/* Nombre y Apellido */}
                            <div className="profile__row">
                                <div className="profile__input-group">
                                    <label className="input-label">Nombre</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className="profile__input-group">
                                    <label className="input-label">Apellido</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                            {/* Email (generalmente no se deja editar fácil) */}
                            <div className="profile__input-group">
                                <label className="input-label">Email</label>
                                <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={true} // Mejor no dejamos editar el email por ahora
                                    style={{ backgroundColor: '#f0f0f0' }}
                                />
                            </div>

                            {/* Teléfono y Fecha */}
                            <div className="profile__row">
                                <div className="profile__input-group">
                                    <label className="input-label">Teléfono</label>
                                    <input
                                        className="input"
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className="profile__input-group">
                                    <label className="input-label">Fecha de Nacimiento</label>
                                    <input
                                        className="input"
                                        type="date"
                                        name="fechaNacimiento"
                                        value={formData.fechaNacimiento ? formData.fechaNacimiento.split('T')[0] : ''}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                            {/* Género */}
                            <div className="profile__input-group">
                                <label className="input-label">Género</label>
                                <select
                                    className="input"
                                    name="genero"
                                    value={formData.genero}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            {/* Botones de acción */}
                            <div className="profile__actions">
                                {!isEditing ? (
                                    <button
                                        type="button"
                                        className="btn btn--primary"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Editar Perfil
                                    </button>
                                ) : (
                                    <>
                                        <button type="submit" className="btn btn--primary">
                                            Guardar Cambios
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn--outline"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Menú de navegación inferior */}
            <nav className="profile__nav">
                <div className="profile__nav-container">
                    <button className="profile__nav-item" onClick={() => navigate('/dashboard')}>
                        <HiHome className="profile__nav-icon" />
                        <span>Inicio</span>
                    </button>
                    <button className="profile__nav-item" onClick={() => navigate('/explorar')}>
                        <HiLocationMarker className="profile__nav-icon" />
                        <span>Lugares</span>
                    </button>
                    <button className="profile__nav-item" onClick={() => navigate('/favoritos')}>
                        <HiStar className="profile__nav-icon" />
                        <span>Favoritos</span>
                    </button>
                    <button className="profile__nav-item profile__nav-item--active">
                        <HiUser className="profile__nav-icon" />
                        <span>Perfil</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Profile;
