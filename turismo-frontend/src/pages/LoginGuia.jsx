import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function LoginGuia() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!form.email.trim() || !form.password.trim()) {
      setMensaje("Completa los campos");
      setTipoMensaje("error");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/guia/login", {
        email: form.email,
        password: form.password,
      });

      setMensaje("Accediendo...");
      setTipoMensaje("success");

      setTimeout(() => {
        navigate("/guia/dashboard");
      }, 1000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error al iniciar sesión";
      setMensaje(errorMsg);
      setTipoMensaje("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <div className="login__logo">Exp</div>
          <h1 className="login__title">Guía Turístico</h1>
          <p className="login__subtitle">Bienvenido nuevamente</p>
        </div>

        {mensaje && (
          <div className={`login__message login__message--${tipoMensaje}`}>
            {mensaje}
          </div>
        )}

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__input-group">
            <label className="input-label">Correo Electrónico</label>
            <input
              className="input"
              type="email"
              name="email"
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

          <button className="btn btn--primary btn--full" type="submit">
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>

        <div className="login__footer">
          <p className="login__footer-text">
            ¿Aún no estás registrado como guía?{" "}
            <Link to="/guia/register" className="login__footer-link">
              Regístrate aquí
            </Link>
          </p>

          <p className="login__footer-text" style={{ marginTop: "12px" }}>
            ¿Eres turista?{" "}
            <Link to="/login" className="login__footer-link">
              Inicia sesión como usuario
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
