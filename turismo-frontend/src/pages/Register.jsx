import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";


export default function Register() {
  const navigate = useNavigate();


  // Aquí guardamos los datos del nuevo usuario
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
    genero: "",
    password: "",
    confirmPassword: ""
  });


  // Estados para mostrar si hubo error o éxito
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  // Actualizamos el estado cuando escriben
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };


  // Al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");


    console.log("Datos a enviar:", form);


    //  Validaciones mejoradas - TODOS los campos son obligatorios
    if (!form.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    if (!form.apellido.trim()) {
      setError("El apellido es obligatorio");
      return;
    }

    if (!form.email.trim()) {
      setError("El correo es obligatorio");
      return;
    }

    if (!form.telefono.trim()) {
      setError("El teléfono es obligatorio");
      return;
    }

    if (!form.fechaNacimiento) {
      setError("La fecha de nacimiento es obligatoria");
      return;
    }

    if (!form.genero) {
      setError("El género es obligatorio");
      return;
    }

    if (!form.password) {
      setError("La contraseña es obligatoria");
      return;
    }

    if (!form.confirmPassword) {
      setError("Debes confirmar la contraseña");
      return;
    }


    // Validar que las contraseñas coincidan
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }


    // Validar longitud mínima
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }


    setLoading(true);


    try {
      // Enviamos los datos al backend con los nombres CORRECTOS
      console.log("Registrando usuario...");
      const response = await api.post("/auth/register", {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        telefono: form.telefono,
        fechaNacimiento: form.fechaNacimiento,
        genero: form.genero,
        password: form.password,
        confirmPassword: form.confirmPassword
      });


      console.log("Respuesta del servidor:", response.data);
      setSuccess("¡Genial! Ya estás registrado. Te vamos a mandar al login...");


      // Esperamos un ratico y lo mandamos al login
      setTimeout(() => navigate("/login"), 2000);


    } catch (err) {
      console.error("Error en registro:", err);
      // Mensaje de error amigable
      const errorMsg = err.response?.data?.message || "No se pudo registrar, intenta más tarde";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="register">
      <div className="register__container">


        {/* Título motivador */}
        <div className="register__header">
          <h2 className="register__title">
            Porque turistear no debe ser un dolor de cabeza
          </h2>
        </div>


        {/* Mensajes de feedback */}
        {error && <div className="register__message register__message--error">{error}</div>}
        {success && <div className="register__message register__message--success">{success}</div>}


        <form className="register__form" onSubmit={handleSubmit}>


          {/* Nombre y Apellido en la misma línea */}
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


          {/* Teléfono y Fecha de Nacimiento */}
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


          {/* Botón de registro */}
          <button
            className="btn btn--primary btn--full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registrando..." : "¡Registrarme!"}
          </button>
        </form>


        <div className="register__footer">
          <button
            className="btn btn--secondary btn--full"
            type="button"
            onClick={() => navigate('/')}
            style={{ marginBottom: '16px' }}
          >
            Volver a Inicio
          </button>

          <p className="register__footer-text">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="register__footer-link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}