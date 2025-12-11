import React from 'react'
import './Input.css'

const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  label,
  error,
  required = false,
  disabled = false,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" />}
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`input ${Icon ? 'input--with-icon' : ''} ${error ? 'input--error' : ''}`}
            {...props}
          />
        ) : type === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`input ${Icon ? 'input--with-icon' : ''} ${error ? 'input--error' : ''}`}
            {...props}
          >
            {props.children}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`input ${Icon ? 'input--with-icon' : ''} ${error ? 'input--error' : ''}`}
            {...props}
          />
        )}
      </div>
      {error && <span className="input-error-message">{error}</span>}
    </div>
  )
}

export default Input
