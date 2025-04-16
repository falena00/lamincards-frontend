// src/pages/Carta.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

function Carta() {
  const { setid, cardid } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [series, setSeries] = useState(null);
  const [cardsInSet, setCardsInSet] = useState([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/cards/${setid}/${cardid}`)
      .then(res => setCard(res.data))
      .catch(err => console.error("Errore nel recupero della carta:", err));
  }, [setid, cardid]);

  useEffect(() => {
    if (card) {
      axios.get(`http://localhost:3001/series/${card.setid}`)
        .then(res => setSeries(res.data))
        .catch(err => console.error("Errore nel recupero della serie:", err));

      axios.get(`http://localhost:3001/cards/${card.setid}`)
        .then(res => setCardsInSet(res.data.sort((a, b) => a.numero - b.numero)))
        .catch(err => console.error("Errore nel recupero carte del set:", err));
    }
  }, [card]);

  if (!card || !series) return <div className="text-center mt-5">Caricamento...</div>;

  const currentIndex = cardsInSet.findIndex(c => c.cardid === card.cardid);
  const prevCard = currentIndex > 0 ? cardsInSet[currentIndex - 1] : null;
  const nextCard = currentIndex < cardsInSet.length - 1 ? cardsInSet[currentIndex + 1] : null;

  const goToCard = (targetCard) => {
    if (targetCard) navigate(`/carta/${targetCard.setid}/${targetCard.cardid}`);
  };

  return (
    <div className="container mt-4">
      <div className="row align-items-start">
        <div 
          className="col-md-4 position-relative text-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={`/img/${card.imgfront}`}
            alt={card.cardname}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />

          {hovered && prevCard && (
            <button
              className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
              style={{ zIndex: 10 }}
              onClick={() => goToCard(prevCard)}
            >
              <FaArrowLeft />
            </button>
          )}

          {hovered && nextCard && (
            <button
              className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
              style={{ zIndex: 10 }}
              onClick={() => goToCard(nextCard)}
            >
              <FaArrowRight />
            </button>
          )}
        </div>

        <div className="col-md-8">
          <h2>#{card.cardid} - {card.cardname}</h2>
          <p><strong>Set:</strong> {series.nomeset}</p>
          <p><strong>Numero:</strong> {card.numero} / {series.cartetotali}</p>
          <p><strong>Tipo:</strong> {card.paralleldi ? 'Speciale' : 'Base'}</p>
          <p><strong>Parallela:</strong> {card.parallel ? 'Sì' : 'No'}</p>

          <button className="btn btn-outline-success">
            <FaCheckCircle /> Ho questa
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carta;
