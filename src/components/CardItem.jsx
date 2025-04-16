import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaPlusCircle } from 'react-icons/fa';

function CardItem({ card }) {
  const [owned, setOwned] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleOwned = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOwned(!owned);
  };

  return (
    <div
      className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 px-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
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

      <Link
        to={`/carta/${card.cardid}`}
        className="text-decoration-none text-dark d-block"
      >
        <div
          className="card border-0 shadow-sm rounded mx-auto"
           style={{
           width: '180px',
           height: '260px',
           overflow: 'hidden',
           position: 'relative',
           transition: 'transform 0.2s ease',
           transform: hovered ? 'scale(1.03)' : 'scale(1)',
           backgroundColor: '#f9f9f9',
           padding: 0,
           margin: 0,
           display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
           }}
        >
          {/* Immagine */}
          <img
            src={`/img/${card.imgfront}`}
            alt={card.cardname}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: hovered ? 'brightness(1.1)' : 'none',
              transition: 'filter 0.2s ease',
            }}
          />

          {/* Overlay con il titolo */}
          <div
            className="position-absolute bottom-0 w-100 text-center bg-dark text-white"
            style={{
              padding: '4px 6px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
          >
            <small style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
              #{card.cardid} - {card.cardname}
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardItem;
