import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SerieList() {
  const [series, setSeries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [sort, setSort] = useState('');

  // Recupera le serie dal backend
  useEffect(() => {
    axios.get('http://localhost:3001/series')
      .then(res => {
        setSeries(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error('Errore nel recupero delle serie', err));
  }, []);

  // Applica filtri e ordinamenti
  useEffect(() => {
    let result = [...series];

    if (search) {
      result = result.filter(s =>
        s.nomeset.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (year) {
      result = result.filter(s => s.anno === parseInt(year));
    }

    if (sort === 'anno-asc') {
      result.sort((a, b) => a.anno - b.anno);
    } else if (sort === 'anno-desc') {
      result.sort((a, b) => b.anno - a.anno);
    } else if (sort === 'nome-asc') {
      result.sort((a, b) => a.nomeset.localeCompare(b.nomeset));
    } else if (sort === 'nome-desc') {
      result.sort((a, b) => b.nomeset.localeCompare(a.nomeset));
    }

    setFiltered(result);
  }, [search, year, sort, series]);

  return (
    <div className="container mt-4">
      {/* Filtro + Ricerca + Ordina */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          className="form-control flex-grow-1"
          placeholder="Cerca per nome..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: '30%' }}
        />

        <select
          className="form-select"
          value={year}
          onChange={e => setYear(e.target.value)}
          style={{ maxWidth: '20%' }}
        >
          <option value="">Tutti gli anni</option>
          {[...new Set(series.map(s => s.anno))].sort().map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          className="form-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{ maxWidth: '30%' }}
        >
          <option value="">Ordina per...</option>
          <option value="anno-asc">Data di uscita crescente</option>
          <option value="anno-desc">Data di uscita decrescente</option>
          <option value="nome-asc">Nome A-Z</option>
          <option value="nome-desc">Nome Z-A</option>
        </select>
      </div>

      {/* Griglia serie */}
      <div className="row">
        {filtered.map(s => (
          <div className="col-md-3 mb-4" key={s.setid}>
            <Link
              to={`/serie/${s.setid}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                className="card text-center p-3 shadow-sm border rounded"
                style={{
                  height: '100%',
                  cursor: 'pointer',
                  maxWidth: '250px',
                  margin: 'auto'
                }}
              >
                <img
                  src={`/img/${s.imgalbum}`}
                  alt={s.nomeset}
                  className="img-fluid rounded mx-auto d-block mt-3"
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{s.nomeset}</h5>
                  <p className="card-text">
                    Anno: {s.anno} <br />
                    Carte totali: {s.cartetotali}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SerieList;
