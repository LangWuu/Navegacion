import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoArrowBack } from 'react-icons/io5';
import '../styles/Profile.css';
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    nombre: user?.nombre || 'Usuario',
    apellido: user?.apellido || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    fechaNacimiento: user?.fechaNacimiento || '',
    genero: user?.genero || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Guardando cambios...", formData);
    setIsEditing(false);
    alert("¡Cambios guardados! (Falta conectar al backend)");
  };

  const handleLogout = () => {
    if (window.confirm("¿Seguro que quieres cerrar sesión?")) {
      logout();
      navigate('/login');
    }
  };

  return (
    <>
   
      <div className="profile">
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

                <div className="profile__input-group">
                  <label className="input-label">Email</label>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    style={{ backgroundColor: '#f0f0f0' }}
                  />
                </div>

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

        <BottomNav active="perfil" onNavigate={navigate} />
      </div>
    </>
  );
};

export default Profile;
