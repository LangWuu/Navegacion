import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";
import { validateRequired } from "../utils/validateForm";
import Message from "../components/Message";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../imgs/logo.jpg";
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();

  const rolFromUrl = searchParams.get("rol") || "turista";

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const requiredFields = ["email", "password"];
    const errorMsg = validateRequired(requiredFields, form);
    if (errorMsg) {
      setMensaje(errorMsg);
      setTipoMensaje("error");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      const userData = {
        _id: response.data._id,
        nombre: response.data.nombre,
        apellido: response.data.apellido,
        email: response.data.email,
        telefono: response.data.telefono,
        fechaNacimiento: response.data.fechaNacimiento,
        genero: response.data.genero
      };

      login(userData, response.data.token);

      if (form.remember) {
        localStorage.setItem("rememberMe", "true");
      }

      setMensaje("¡Listo! Entrando...");
      setTipoMensaje("success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Algo salió mal, intenta de nuevo";
      setMensaje(errorMsg);
      setTipoMensaje("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Iniciar Sesión" />

      <div className="login">
        <div className="login__container">

          <div className="login__header">
            <div className="login__logo"> <img src={logo} alt="Logo" /> </div>
            <h1 className="login__title">
              {rolFromUrl === "guia"
                ? "Iniciar Sesión como Guía"
                : "Iniciar Sesión como Turista"}
            </h1>
            <p className="login__subtitle">
              {rolFromUrl === "guia"
                ? "¡Qué bueno verte de nuevo! Gestiona tus experiencias"
                : "¡Qué bueno verte otra vez! Continúa explorando"}
            </p>
          </div>

          {mensaje && <Message type={tipoMensaje}>{mensaje}</Message>}

          <form className="login__form" onSubmit={handleSubmit}>
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

            <div className="login__input-group">
              <label className="input-label">Contraseña</label>
              <div className="login__password-wrapper">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Tu contraseña"
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

              <button
                type="button"
                className="login__forgot-link"
                onClick={() =>
                  alert("Funcionalidad próximamente disponible")
                }
                disabled={loading}
              >
                Recuperar contraseña
              </button>
            </div>

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
            <p className="login__footer-text">
              ¿Nuevo por aquí?{" "}
              <Link
                to="/seleccionar-rol?mode=register"
                className="login__footer-link"
              >
                Créate una cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
