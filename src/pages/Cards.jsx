import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardItem from '../components/CardItem';

function Cards() {
  const { setid } = useParams(); // ✅ solo setid
  const [cards, setCards] = useState([]);
  const [serieInfo, setSerieInfo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/cards/${setid}`)
      .then(res => setCards(res.data))
      .catch(err => console.error('Errore nel recupero carte:', err));

    axios.get(`http://localhost:3001/series/${setid}`)
      .then(res => setSerieInfo(res.data))
      .catch(err => console.error("Errore nel recupero della serie:", err));
  }, [setid]);

  return (
    <div className="container mt-4">
      {serieInfo && (
        <>
          {/* Header serie */}
          <div className="row mb-4 align-items-center">
            <div className="col-md-2 text-center">
              <img
                src={`/img/${serieInfo.imgalbum}`}
                alt={serieInfo.nomeset}
                className="img-fluid rounded"
                style={{ maxHeight: '120px' }}
              />
            </div>
            <div className="col-md-10">
              <h2>{serieInfo.nomeset}</h2>
            </div>
          </div>

          {/* Box descrizione + dati */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="border rounded p-3">
                <strong>Descrizione:</strong><br />
                {serieInfo.descrizioneset || "Nessuna descrizione disponibile."}
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-3">
                <strong>Carte:</strong><br />
                {serieInfo.cartetotali} carte totali<br />
                + {serieInfo.speciali} speciali
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-3">
                <strong>Anno di uscita:</strong><br />
                {serieInfo.anno}
              </div>
            </div>
          </div>

          <h4 className="mb-3">Elenco delle carte</h4>
        </>
      )}

      {/* Griglia carte */}
      <div className="row">
        {cards.map(card => (
          <CardItem key={card.cardid} card={card} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
