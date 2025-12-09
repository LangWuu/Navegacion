import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/reserva.css";

const ReservaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    personas: 1,
    notas: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validarFormulario = () => {
    if (!form.nombre.trim()) {
      toast.error("El nombre no puede estar vacío");
      return false;
    }
    if (!form.fecha) {
      toast.error("Selecciona una fecha");
      return false;
    }
    if (form.personas < 1) {
      toast.error("Debe haber al menos 1 persona");
      return false;
    }
    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validarFormulario()) return;

    toast.success("Reserva enviada correctamente");

    setTimeout(() => navigate("/dashboard"), 1200);
  };

  return (
    <div className="reserva">
      <div className="reserva__container">

        <header className="reserva__header">
          <h1 className="reserva__title">Reserva tu experiencia</h1>
        </header>

        <div className="reserva__info">ID experiencia: {id}</div>

        <form className="reserva__form" onSubmit={handleSubmit}>
          <div className="reserva__input-group">
            <label className="reserva__label">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              className="reserva__input"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="reserva__input-group">
            <label className="reserva__label">Fecha de la experiencia</label>
            <input
              type="date"
              name="fecha"
              className="reserva__input"
              value={form.fecha}
              onChange={handleChange}
            />
          </div>

          <div className="reserva__input-group">
            <label className="reserva__label">Número de personas</label>
            <input
              type="number"
              name="personas"
              min="1"
              className="reserva__input"
              value={form.personas}
              onChange={handleChange}
            />
          </div>

          <div className="reserva__input-group">
            <label className="reserva__label">Notas adicionales</label>
            <textarea
              name="notas"
              className="reserva__textarea"
              placeholder="Detalles importantes..."
              value={form.notas}
              onChange={handleChange}
            />
          </div>

          <button className="reserva__submit" type="submit">
            Confirmar Reserva
          </button>

        </form>
      </div>
    </div>
  );
};

export default ReservaForm;
