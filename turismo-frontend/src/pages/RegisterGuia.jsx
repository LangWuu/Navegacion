import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

export default function RegisterGuia() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    email: "",
    telefono: "",
    experiencia: "",
    genero: "",
    descripcion: "",
    cv: null,
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cv") {
      setForm({ ...form, cv: files[0] });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones
    if (!form.nombre.trim()) return setError("El nombre es obligatorio");
    if (!form.apellido.trim()) return setError("El apellido es obligatorio");
    if (!form.fechaNacimiento)
      return setError("La fecha de nacimiento es obligatoria");
    if (!form.genero) return setError("El género es obligatorio");
    if (!form.email.trim()) return setError("El correo es obligatorio");
    if (!form.telefono.trim()) return setError("El teléfono es obligatorio");
    if (!form.experiencia.trim())
      return setError("La experiencia es obligatoria");
    if (!form.descripcion.trim())
      return setError("La descripción es obligatoria");
    if (!form.cv) return setError("La hoja de vida en PDF es obligatoria");
    if (!form.password) return setError("La contraseña es obligatoria");
    if (!form.confirmPassword) return setError("Debes confirmar la contraseña");
    if (form.password !== form.confirmPassword)
      return setError("Las contraseñas no coinciden");
    if (form.password.length < 6)
      return setError("La contraseña debe tener mínimo 6 caracteres");

    setLoading(true);

    try {
      const data = new FormData();
      data.append("nombre", form.nombre);
      data.append("apellido", form.apellido);
      data.append("fechaNacimiento", form.fechaNacimiento);
      data.append("genero", form.genero);
      data.append("email", form.email);
      data.append("telefono", form.telefono);
      data.append("experiencia", form.experiencia);
      data.append("descripcion", form.descripcion);
      data.append("cv", form.cv);
      data.append("password", form.password);

      const response = await api.post("/guia/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

     setSuccess("Perfecto. Tu registro como guía fue enviado.  Nos pondremos en contacto contigo pronto :)");

      setTimeout(() => navigate("/guia/login"), 1800);

    } catch (err) {
      const msg = err.response?.data?.message || "No se pudo registrar al guía";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__header">
          <h2 className="register__title">
            Registra tu perfil como Guía Turístico
          </h2>
          <p className="register__subtitle">
            Queremos conocer tu experiencia para conectar viajeros contigo.
          </p>
        </div>

        {error && (
          <div className="register__message register__message--error">
            {error}
          </div>
        )}
        {success && (
          <div className="register__message register__message--success">
            {success}
          </div>
        )}

        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__row">
            <div className="register__input-group">
              <label className="input-label">Nombre *</label>
              <input
                type="text"
                name="nombre"
                className="input"
                value={form.nombre}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="register__input-group">
              <label className="input-label">Apellido *</label>
              <input
                type="text"
                name="apellido"
                className="input"
                value={form.apellido}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="register__input-group register__input-group--full">
            <label className="input-label">Fecha de Nacimiento *</label>
            <input
              type="date"
              name="fechaNacimiento"
              className="input"
              value={form.fechaNacimiento}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="register__input-group register__input-group--full">
            <label className="input-label">Género *</label>
            <select
              name="genero"
              className="input"
              value={form.genero}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Selecciona tu género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="register__input-group register__input-group--full">
            <label className="input-label">Correo Electrónico *</label>
            <input
              type="email"
              name="email"
              className="input"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="register__input-group register__input-group--full">
            <label className="input-label">Teléfono *</label>
            <input
              type="tel"
              name="telefono"
              className="input"
              value={form.telefono}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="register__input-group register__input-group--full">
            <label className="input-label">Años de experiencia *</label>
            <input
              type="text"
              name="experiencia"
              className="input"
              value={form.experiencia}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="register__input-group register__input-group--full">
            <label className="input-label">Cuéntanos sobre ti *</label>
            <textarea
              name="descripcion"
              rows="4"
              className="input"
              value={form.descripcion}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="register__input-group register__input-group--full">
            <label className="input-label">Hoja de Vida (PDF) *</label>
            <input
              type="file"
              name="cv"
              accept="application/pdf"
              className="input"
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="register__row">
            <div className="register__input-group">
              <label className="input-label">Contraseña *</label>
              <input
                type="password"
                name="password"
                className="input"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="register__input-group">
              <label className="input-label">Confirmar Contraseña *</label>
              <input
                type="password"
                name="confirmPassword"
                className="input"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <button
            className="btn btn--primary btn--full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Guía"}
          </button>
        </form>

        <div className="register__footer">
          <p className="register__footer-text">
            ¿Ya eres guía registrado?{" "}
            <Link to="/guia/login" className="register__footer-link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
