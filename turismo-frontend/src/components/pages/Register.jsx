import "../styles/register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error en el registro");
        return;
      }

      // registro exitoso
      setSuccess("Registro exitoso. Redirigiendo...");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError("Hubo un error conectando con el servidor.");
    }
  };

  return (
    <div className="register-container">
      <div className="title-box">
        <h1>
          Porque turistear <br />
          no debe ser un <br />
          dolor de cabeza
        </h1>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}

        <label>Nombre:</label>
        <input type="text" name="name" placeholder="First name" onChange={handleChange} />

        <label>E-mail:</label>
        <input type="email" name="email" placeholder="example@email.com" onChange={handleChange} />

        <label>Celular:</label>
        <input type="text" name="phone" placeholder="+57 312 123 1234" onChange={handleChange} />

        <label>Fecha de Nacimiento:</label>
        <input type="date" name="birthDate" onChange={handleChange} />

        <label>Género:</label>
        <input type="text" name="gender" placeholder="Masculino, Femenino..." onChange={handleChange} />

        <label>Contraseña:</label>
        <input type="password" name="password" placeholder="********" onChange={handleChange} />

        <label>Confirmar Contraseña:</label>
        <input type="password" name="confirmPassword" placeholder="********" onChange={handleChange} />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
