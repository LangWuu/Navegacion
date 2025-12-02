import React from 'react';
import './Button.css';

// Componente reutilizable de botón
// variant puede ser 'primary', 'secondary' o 'outline'
const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    disabled = false
}) => {
    return (
        <button
            type={type}
            className={`btn btn--${variant} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
