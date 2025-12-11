import React from 'react'
import { HiLocationMarker, HiStar } from 'react-icons/hi'
import './Card.css'

const Card = ({ image, title, location, price, rating, isFree = false, onClick }) => {
  const formattedPrice = !isFree && typeof price === 'number' ? `$${price.toLocaleString('es-CO')}` : 'GRATIS'

  return (
    <div className="card" onClick={onClick}>
      <div className="card__image">
        <img src={image} alt={title} />
        <div className="card__price">{formattedPrice}</div>
      </div>
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <div className="card__details">
          <div className="card__location">
            <HiLocationMarker className="card__icon" />
            <span>{location}</span>
          </div>
          <div className="card__rating">
            <HiStar className="card__icon card__icon--star" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
