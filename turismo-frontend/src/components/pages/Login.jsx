import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false
  });

  const [mensaje, setMensaje] = useState(""); // mensaje de error o éxito
  const [tipoMensaje, setTipoMensaje] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setMensaje("");
    setTipoMensaje("");

    if (!form.email || !form.password) {
      setMensaje("Todos los campos son obligatorios");
      setTipoMensaje("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password
        }
      );

      setMensaje("Inicio de sesión exitoso");
      setTipoMensaje("exito");

      // se guarda el token
      localStorage.setItem("token", response.data.token);

      // redirigimos al dashboard (pantalla blanca)
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Error al iniciar sesión";
      setMensaje(msg);
      setTipoMensaje("error");
    }
  };

  return (
    <div className="login-container">

      <div className="login-wrapper">
        
        <h2 className="login-title">Iniciar Sesión</h2>

        <p className="sub-text">
          ¿No tienes una cuenta? <a href="/register">Regístrate</a>
        </p>


        {mensaje && (
          <div className={`alerta ${tipoMensaje}`}>
            {mensaje}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="ejemplo@gmail.com"
            value={form.email}
            onChange={handleChange}
          />

          <label>Contraseña</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
            />
            <span className="show-icon"
             onClick={() => setShowPassword(!showPassword)}
             >👁️</span>
          </div>

          <div className="options-row">
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              Recuérdame
            </label>
            <a href="#" className="forgot">¿Olvidaste tu contraseña?</a>
          </div>

          <button className="login-btn" type="submit">
            Iniciar sesión
          </button>
        </form>

        <div className="divider">
          <span>O iniciar con</span>
        </div>

        <button className="google-btn">
          <img src="/assets/iconogoogle.png" alt="Google" />
          Continuar con Google
        </button>

        <button className="facebook-btn">
          <img src="/assets/iconofacebook.png" alt="Facebook" />
          Continuar con Facebook
        </button>

      </div>
    </div>
  );
}
