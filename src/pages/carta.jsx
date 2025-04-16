// src/pages/Carta.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Carta() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    // Recupera dati della carta
    axios.get(`http://localhost:3001/card/${id}`)
      .then(res => setCard(res.data))
      .catch(err => console.error("Errore nel recupero della carta:", err));
  }, [id]);

  useEffect(() => {
    if (card) {
      axios.get(`http://localhost:3001/series/${card.setid}`)
        .then(res => setSeries(res.data))
        .catch(err => console.error("Errore nel recupero della serie:", err));
    }
  }, [card]);

  if (!card || !series) return <div className="text-center mt-5">Caricamento...</div>;

  return (
    <div className="container mt-4">
      <div className="row align-items-start">
        <div className="col-md-4 text-center">
          <img
            src={`/img/${card.imgfront}`}
            alt={card.cardname}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-8">
          <h2>#{card.cardid} - {card.cardname}</h2>
          <p><strong>Set:</strong> {series.nomeset}</p>
          <p><strong>Numero:</strong> {card.numero} / {series.cartetotali}</p>
          <p><strong>Tipo:</strong> {card.paralleldi ? 'Speciale' : 'Base'}</p>
          <p><strong>Parallela:</strong> {card.parallel ? 'Sì' : 'No'}</p>

          <button className="btn btn-outline-success">
            ✅ Ho questa
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carta;
