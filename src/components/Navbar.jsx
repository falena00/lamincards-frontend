import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/'); // Torna alla home
  };
  const handleMouseEnter = () => setDropdownOpen(true);
  const handleMouseLeave = () => setDropdownOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold text-warning" to="/">Lamincards</Link>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/serie">Serie</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/collezione">Collezione</Link>
          </li>

          {/* Dropdown utente */}
          {user ? (
            <li
              className="nav-item dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="nav-link dropdown-toggle text-white" role="button">
                👤 {user.username}
              </span>
              {dropdownOpen && (
                <div className="dropdown-menu dropdown-menu-end show">
                  <Link className="dropdown-item" to="/account">👤 Account</Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                     🔓 Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
