import React from 'react'
import './Button.css'

const Button = ({
  children,
  onClick = () => {},
  type = 'button',
  variant = 'primary',
  size,
  fullWidth = false,
  className = '',
  disabled = false,
  icon: Icon,
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    size ? `btn--${size}` : '',
    fullWidth ? 'btn--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {Icon && <Icon className="btn__icon" />}
      {children}
    </button>
  )
}

export default Button
