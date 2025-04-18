import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:3001/register', {
        email,
        username,
        password
      });
      setSuccess('Registrazione avvenuta con successo!');
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Errore nella registrazione');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>Registrazione</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        {error && <div className="text-danger mb-2">{error}</div>}
        {success && <div className="text-success mb-2">{success}</div>}
        <button type="submit" className="btn btn-primary">Registrati</button>
      </form>
    </div>
  );
}

export default Register;
