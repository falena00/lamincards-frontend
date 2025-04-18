import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      setUser(res.data);
      setError('');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Errore nel login');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
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
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        {error && <div className="text-danger mb-2">{error}</div>}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Accedi</button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/register')}>
            Registrati
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
