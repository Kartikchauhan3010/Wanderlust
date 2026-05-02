import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTrips } from '../../context/TripContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { trips } = useTrips();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          <span className="navbar__logo">✈</span>
          <span className="navbar__brand-text">Wanderlust</span>
        </Link>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <Link
            to="/"
            className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Explore
          </Link>
          <Link
            to="/search"
            className={`navbar__link ${isActive('/search') ? 'navbar__link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Search
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className={`navbar__link ${isActive('/dashboard') ? 'navbar__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              My Trips
              {trips.length > 0 && (
                <span className="navbar__badge">{trips.length}</span>
              )}
            </Link>
          )}
        </div>

        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user">
              <div className="navbar__avatar" title={user.name}>
                {user.avatar}
              </div>
              <div className="navbar__user-info">
                <span className="navbar__user-name">{user.name.split(' ')[0]}</span>
              </div>
              <button className="navbar__logout" onClick={handleLogout} title="Logout">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="navbar__auth">
              <Link to="/login" className="navbar__btn-outline" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="navbar__btn-fill" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
