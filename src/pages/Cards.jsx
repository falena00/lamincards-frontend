import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CardItem from "../components/CardItem";
import axios from 'axios';

function Cards() {
  const { id } = useParams(); // ID della serie dalla URL
  const cleanId = id.trim(); // <-- rimuove spazi e newline
  console.log("ID RAW:", id);
  console.log("ID CLEAN:", cleanId);
  const [cards, setCards] = useState([]);
  const [serieInfo, setSerieInfo] = useState(null);
  
  // Al caricamento → prendi le carte della serie
useEffect(() => {
  axios.get(`http://localhost:3001/cards/${cleanId}`)
    .then(res => {
      setCards(res.data);
    })
    .catch(err => console.error('Errore nel recupero carte:', err));
	axios.get(`http://localhost:3001/series/${cleanId}`) 
    .then(res => setSerieInfo(res.data))
    .catch(err => console.error("Errore nel recupero della serie:", err));
}, [cleanId]);

  return (
    <div className="container mt-4">
	  
{serieInfo && (
  <div className="d-flex align-items-center mb-4">
    <img
      src={`/img/${serieInfo.imgalbum}`}
      alt={serieInfo.nomeset}
      style={{ height: "100px", marginRight: "20px" }}
    />
    <div>
      <h3>{serieInfo.nomeset}</h3>
      <p>
        Anno: {serieInfo.anno} <br />
        Carte base: {serieInfo.setbase} | Speciali: {serieInfo.speciali}
      </p>
    </div>
  </div>
)}

{/* Mostra le carte della serie */}
<div className="row gx-0">
  {cards.map(c => (
    <div className="col-md-3 mb-4" key={c.cardid}>
      <CardItem card={c} />
    </div>
  ))}
</div>


    </div>
  );
}

export default Cards;
