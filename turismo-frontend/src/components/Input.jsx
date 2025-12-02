import React from 'react';
import './Input.css';

// Componente para los inputs del formulario
const Input = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error,
    disabled = false
}) => {
    return (
        <div className="input-wrapper">
            {label && <label className="input-label">{label}</label>}
            <input
                className={`input ${error ? 'input--error' : ''}`}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />
            {/* Si hay error, lo mostramos aquí abajito */}
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
};

export default Input;
