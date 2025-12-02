import React from 'react';
import { HiLocationMarker, HiStar } from 'react-icons/hi';
import './Card.css';

// Este componente es la tarjetita que usamos para mostrar las experiencias
const Card = ({
    image,
    title,
    location,
    price,
    rating,
    isFree = false,
    onClick
}) => {
    return (
        <div className="card" onClick={onClick}>
            {/* La imagen de fondo de la tarjeta */}
            <div className="card__image">
                <img src={image} alt={title} />
                <div className="card__price">
                    {isFree ? 'GRATIS' : `$${price}`}
                </div>
            </div>

            {/* La info de abajo */}
            <div className="card__content">
                <h3 className="card__title">{title}</h3>
                <div className="card__details">
                    <span className="card__location">
                        <HiLocationMarker className="card__icon" /> {location}
                    </span>
                    {rating && (
                        <span className="card__rating">
                            <HiStar className="card__icon card__icon--star" /> {rating}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
