import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaPlusCircle } from 'react-icons/fa';

function CardItem({ card }) {
  const [owned, setOwned] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleOwned = (e) => {
    e.preventDefault(); // evita il redirect
    setOwned(!owned);
  };

  return (
    <div
      className="col-6 col-sm-4 col-md-3 col-lg-2 mb-2 px-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to={`/carta/${card.cardid}`}
        className="text-decoration-none text-dark"
        style={{ position: 'relative', display: 'block' }}
      >
       <div
		className="card border-0 shadow-sm rounded"
		style={{
		width: '150px',
		height: '260px',
		overflow: 'hidden',
		transition: 'transform 0.2s ease',
		transform: hovered ? 'scale(1.03)' : 'scale(1)',
		backgroundColor: '#f9f9f9',
		padding: '6px'
				}}
		>

          {/* Immagine */}
          <div
            style={{
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <img
              src={`/img/${card.imgfront}`}
              alt={card.cardname}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                transition: 'filter 0.2s ease',
                filter: hovered ? 'brightness(1.1)' : 'none',
              }}
            />
          </div>

          {/* Testo */}
          <div className="bg-dark text-white text-center py-1 px-2">
            <small style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
              #{card.cardid} - {card.cardname}
            </small>
          </div>
        </div>

        {/* Pulsante spunta */}
        {hovered && (
          <button
            className="btn btn-sm position-absolute top-0 end-0 m-1 bg-white rounded-circle shadow"
            onClick={toggleOwned}
            style={{ zIndex: 2 }}
          >
            {owned ? (
              <FaCheckCircle className="text-success" />
            ) : (
              <FaPlusCircle className="text-secondary" />
            )}
          </button>
        )}
      </Link>
    </div>
  );
}

export default CardItem;
