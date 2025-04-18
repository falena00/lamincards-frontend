// src/pages/Account.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function Account() {
  const { user, setUser } = useUser();
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password && password !== confirmPassword) {
      return setError('Le password non coincidono.');
    }

    try {
      const res = await axios.post('http://localhost:3001/update-user', {
        userid: user.userid,
        email,
        password: password || undefined,
      });
      setMessage('Modifiche salvate con successo.');
      setUser({ ...user, email });
    } catch (err) {
      setError(err.response?.data?.message || 'Errore durante l\'aggiornamento');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <h3>Il mio account</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input className="form-control" value={user?.username || ''} disabled />
          <small className="text-muted">Non può essere modificato</small>
        </div>

        <div className="mb-3">
          <label>Nuova password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Lascia vuoto per non cambiare"
          />
        </div>

        <div className="mb-3">
          <label>Conferma password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {error && <div className="text-danger mb-2">{error}</div>}
        {message && <div className="text-success mb-2">{message}</div>}

        <button type="submit" className="btn btn-primary">Salva modifiche</button>
      </form>
    </div>
  );
}

export default Account;
