import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Usamos el método login del contexto

  // Aquí guardamos lo que el usuario escribe
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Estados para saber si hubo error o si está cargando
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // puede ser 'success' o 'error'
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Esta función actualiza el estado cuando escriben en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Si es checkbox usamos 'checked', si no usamos 'value'
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Para que no se recargue la página
    setMensaje("");

    console.log("Intentando iniciar sesión con:", form.email);

    // Validamos que no estén vacíos
    if (!form.email || !form.password) {
      setMensaje("Oye, te faltó llenar los campos");
      setTipoMensaje("error");
      return;
    }

    setLoading(true);

    try {
      // Le pegamos al backend
      console.log("Enviando petición al servidor...");
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      console.log("Respuesta del server:", response.data);

      //  Guardamos TODOS los datos del usuario usando el contexto
      const userData = {
        _id: response.data._id,
        nombre: response.data.nombre,
        apellido: response.data.apellido,
        email: response.data.email,
        telefono: response.data.telefono,
        fechaNacimiento: response.data.fechaNacimiento,
        genero: response.data.genero,
      };

      // Usamos el método login del contexto
      login(userData, response.data.token);

      // Si marcó "No cerrar sesión" podemos guardar preferencia (opcional)
      if (form.remember) {
        localStorage.setItem("rememberMe", "true");
      }

      setMensaje("¡Listo! Entrando...");
      setTipoMensaje("success");

      // Esperamos un poquito para que lean el mensaje
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Hubo un error en el login:", error);
      // Mostramos el error que nos devuelve el back o uno genérico
      const errorMsg =
        error.response?.data?.message || "Algo salió mal, intenta de nuevo";
      setMensaje(errorMsg);
      setTipoMensaje("error");
    } finally {
      // Pase lo que pase, quitamos el loading
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        {/* La cabecera con el logo */}
        <div className="login__header">
          <div className="login__logo">Exp</div>
          <h1 className="login__title">Iniciar Sesión</h1>
          <p className="login__subtitle">¡Qué bueno verte otra vez!</p>
        </div>

        {/* Aquí mostramos los mensajes de error o éxito */}
        {mensaje && (
          <div className={`login__message login__message--${tipoMensaje}`}>
            {mensaje}
          </div>
        )}

        <form className="login__form" onSubmit={handleSubmit}>
          {/* Input de Email */}
          <div className="login__input-group">
            <label className="input-label">Correo Electrónico</label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="tu@correo.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Input de Contraseña */}
          <div className="login__input-group">
            <label className="input-label">Contraseña</label>
            <div className="login__password-wrapper">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Tu contraseña "
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                className="login__toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          {/* Opciones extra */}
          <div className="login__options">
            <label className="login__remember">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                disabled={loading}
              />
              <span>No cerrar sesión</span>
            </label>
            <a href="#" className="login__forgot-link">
              Recuperar contraseña
            </a>
          </div>

          {/* Botón de entrar */}
          <button
            className="btn btn--primary btn--full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>

        <div className="login__divider">
          <span>O ingresa con</span>
        </div>

        {/* Redes sociales (solo visual por ahora) */}
        <div className="login__social">
          <button
            className="login__social-btn"
            type="button"
            onClick={() => alert("Próximamente con Google")}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="login__social-icon"
            />
            Google
          </button>
          <button
            className="login__social-btn"
            type="button"
            onClick={() => alert("Próximamente con Facebook")}
          >
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
              className="login__social-icon"
            />
            Facebook
          </button>
        </div>

        <div className="login__footer">
          <button
            className="btn btn--secondary btn--full"
            type="button"
            onClick={() => navigate('/')}
            style={{ marginBottom: '16px' }}
          >
            Volver a Inicio
          </button>

          <p className="login__footer-text">
            ¿Nuevo por aquí?{" "}
            <Link to="/register" className="login__footer-link">
              Créate una cuenta
            </Link>
          </p>



          <p className="login__footer-text" style={{ marginTop: "12px" }}>
            ¿Eres guía?{" "}
            <Link to="/guia/login" className="login__footer-link">
              Ingresa aquí
            </Link>
          </p>

           <p className="login__footer-text" style={{ marginTop: "12px" }}>
            ¿Quieres trabajar como guía?{" "}
            <Link to="/guia/register" className="login__footer-link">
              Registrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
