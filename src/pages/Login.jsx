import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/helpers';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
    if (authError) setAuthError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateLoginForm(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setForm({ email: 'demo@travel.com', password: 'demo123' });
    setErrors({});
    setAuthError('');
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__brand">
          <span className="auth__logo">✈</span>
          <span className="auth__brand-name">Wanderlust</span>
        </div>

        <h1 className="auth__title">Welcome back</h1>
        <p className="auth__subtitle">Sign in to view your planned trips</p>

        <div className="auth__demo-banner">
          <span>Demo credentials available</span>
          <button className="auth__demo-btn" onClick={fillDemo} type="button">
            Use Demo Account
          </button>
        </div>

        {authError && (
          <div className="auth__error-banner">
            ⚠ {authError}
          </div>
        )}

        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className={`form-input ${errors.password ? 'form-input--error' : ''}`}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
              autoComplete="current-password"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button type="submit" className="auth__submit" disabled={loading}>
            {loading ? (
              <span className="auth__spinner" />
            ) : 'Sign In'}
          </button>
        </form>

        <p className="auth__switch">
          Don't have an account? <Link to="/register" className="auth__link">Create one →</Link>
        </p>
      </div>

      <div className="auth__visual">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
          alt="Mountains travel"
          className="auth__visual-img"
        />
        <div className="auth__visual-overlay">
          <blockquote className="auth__quote">
            "Not all those who wander are lost."
            <cite>— J.R.R. Tolkien</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Login;
