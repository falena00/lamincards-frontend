import { useEffect, useState } from 'react';

function App() {
  const [series, setSeries] = useState([]);

  // Recupera la lista delle serie dal backend
  useEffect(() => {
    fetch('http://localhost:3001/series')
      .then(res => res.json())
      .then(data => {
        setSeries(data);
      })
      .catch(err => {
        console.error('Errore nel recupero delle serie:', err);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Serie Lamincards</h1>

      {series.length === 0 ? (
        <p className="text-gray-500">Caricamento...</p>
      ) : (
        <ul className="space-y-2">
{series.map(s => (
  <li key={s.setid} className="p-4 bg-white shadow rounded">
    <h2 className="text-xl font-semibold">{s.nomeset}</h2>
    <p className="text-sm text-gray-600">Anno: {s.anno}</p>
    <p className="text-sm text-gray-600">Carte totali: {s.cartetotali}</p>

    {s.imgalbum && (
      <img
        src={`http://localhost:3001/images/${s.imgalbum}`}
        alt={s.nomeset}
        className="mt-2 max-w-xs"
      />
    )}
  </li>
))}


        </ul>
      )}
    </div>
  );
}

export default App;
