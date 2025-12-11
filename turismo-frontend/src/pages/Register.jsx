import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import "../styles/register.css";
import { validateRequired } from "../utils/validateForm";
import Message from "../components/Message";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Tomamos el rol desde la URL
  const rolFromUrl = searchParams.get('rol') || 'turista';

  // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    genero: "",
    password: "",
    confirmPassword: "",
    rol: rolFromUrl
  });

  // Otros estados
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Cada que cambian un input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log("Datos enviados al back:", form);

    // Validar campos requeridos
    const requiredFields = [
      "nombre",
      "apellido",
      "email",
      "telefono",
      "fechaNacimiento",
      "genero",
      "password",
      "confirmPassword"
    ];

    const errorMsg = validateRequired(requiredFields, form);
    if (errorMsg) return setError(errorMsg);

    // Validar contraseñas
    if (form.password !== form.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }

    if (form.password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres");
    }

    setLoading(true);

    try {
      // Petición al backend
      const response = await api.post("/auth/register", {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        telefono: form.telefono,
        fechaNacimiento: form.fechaNacimiento,
        genero: form.genero,
        password: form.password,
        confirmPassword: form.confirmPassword,
        rol: form.rol
      });

      console.log("Respuesta del servidor:", response.data);

      setSuccess("¡Genial! Ya estás registrado. Te estamos redirigiendo...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error("Error en registro:", err);
      const errorMsg = err.response?.data?.message || "No se pudo registrar, intenta más tarde";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Registro" />

      <div className="register">
        <div className="register__container">

          {/* Título dinámico según el rol */}
          <div className="register__header">
            <h2 className="register__title">
              {form.rol === 'guia' ? 'Regístrate como Guía' : 'Regístrate como Turista'}
            </h2>
            <p className="register__subtitle">
              {form.rol === 'guia'
                ? 'Comparte tus conocimientos y crea experiencias únicas'
                : 'Descubre experiencias auténticas en Colombia'}
            </p>
          </div>

          {/* Mensajes */}
          {error && <Message type="error">{error}</Message>}
          {success && <Message type="success">{success}</Message>}

          {/* Formulario */}
          <form className="register__form" onSubmit={handleSubmit}>

            {/* Nombre y apellido */}
            <div className="register__row">
              <div className="register__input-group">
                <label className="input-label">Nombre *</label>
                <input
                  className="input"
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="register__input-group">
                <label className="input-label">Apellido *</label>
                <input
                  className="input"
                  type="text"
                  name="apellido"
                  placeholder="Tu apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div className="register__input-group register__input-group--full">
              <label className="input-label">Correo Electrónico *</label>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="ejemplo@gmail.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {/* Teléfono y fecha */}
            <div className="register__row">
              <div className="register__input-group">
                <label className="input-label">Celular / Teléfono *</label>
                <input
                  className="input"
                  type="tel"
                  name="telefono"
                  placeholder="312 123 4567"
                  value={form.telefono}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="register__input-group">
                <label className="input-label">Fecha de Nacimiento *</label>
                <input
                  className="input"
                  type="date"
                  name="fechaNacimiento"
                  value={form.fechaNacimiento}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Género */}
            <div className="register__input-group register__input-group--full">
              <label className="input-label">Género *</label>
              <select
                className="input"
                name="genero"
                value={form.genero}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Selecciona...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Contraseñas */}
            <div className="register__row">
              <div className="register__input-group">
                <label className="input-label">Contraseña *</label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="register__input-group">
                <label className="input-label">Confirmar Contraseña *</label>
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Repíte la contraseña"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Botón */}
            <button
              className="btn btn--primary btn--full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registrando..." : "¡Registrarme!"}
            </button>
          </form>

          {/* Footer */}
          <div className="register__footer">
            <p className="register__footer-text">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="register__footer-link">
                Inicia sesión aquí
              </Link>
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
