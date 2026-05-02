import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAttractions, getWeather } from '../services/travelApi';
import { getWeatherIcon, formatDate } from '../utils/helpers';
import TripModal from '../components/common/TripModal';
import { Skeleton } from '../components/common/Skeleton';
import './DestinationDetail.css';

const DestinationDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const destination = location.state?.destination;

  const [attractions, setAttractions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loadingAttr, setLoadingAttr] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!destination) {
      navigate('/search');
      return;
    }
    setLoadingAttr(true);
    setLoadingWeather(true);

    getAttractions(destination).then((data) => {
      setAttractions(data);
      setLoadingAttr(false);
    });

    getWeather(destination).then((data) => {
      setWeather(data);
      setLoadingWeather(false);
    });
  }, [destination, navigate]);

  if (!destination) return null;

  const handlePlanTrip = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setModalOpen(true);
  };

  return (
    <div className="detail">
      <div className="detail__hero">
        {!imgLoaded && (
          <div className="detail__img-placeholder" />
        )}
        <img
          src={destination.image}
          alt={destination.name}
          className="detail__hero-img"
          style={{ opacity: imgLoaded ? 1 : 0 }}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80';
            setImgLoaded(true);
          }}
        />
        <div className="detail__hero-overlay">
          <div className="container">
            <button className="detail__back" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <div className="detail__hero-content">
              <div className="detail__country-badge">{destination.country}</div>
              <h1 className="detail__name">{destination.name}</h1>
              {destination.rating && (
                <div className="detail__rating">
                  {'★'.repeat(Math.round(destination.rating))} {destination.rating} / 5
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="detail__layout">
          <main className="detail__main">
            <section className="detail__section">
              <h2 className="detail__section-title">About {destination.name}</h2>
              <p className="detail__description">{destination.description}</p>
              {destination.tags && (
                <div className="detail__tags">
                  {destination.tags.map((tag) => (
                    <span key={tag} className="detail__tag">{tag}</span>
                  ))}
                </div>
              )}
            </section>

            <section className="detail__section">
              <h2 className="detail__section-title">Top Attractions</h2>
              {loadingAttr ? (
                <div className="detail__attr-grid">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="attr-card">
                      <Skeleton height="1rem" width="60%" style={{ marginBottom: '0.5rem' }} />
                      <Skeleton height="0.8rem" width="80%" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="detail__attr-grid">
                  {attractions.map((attr, i) => (
                    <div key={i} className="attr-card">
                      <div className="attr-card__icon">
                        {getAttractionIcon(attr.kinds)}
                      </div>
                      <div>
                        <div className="attr-card__name">{attr.name}</div>
                        <div className="attr-card__kinds">
                          {attr.kinds?.split(',')[0]?.replace(/_/g, ' ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>

          <aside className="detail__sidebar">
            <div className="detail__weather-card">
              <h3 className="detail__sidebar-title">Current Weather</h3>
              {loadingWeather ? (
                <div>
                  <Skeleton height="3rem" width="50%" style={{ marginBottom: '0.75rem' }} />
                  <Skeleton height="0.9rem" width="70%" style={{ marginBottom: '0.5rem' }} />
                  <Skeleton height="0.9rem" width="60%" />
                </div>
              ) : weather ? (
                <div className="weather">
                  <div className="weather__top">
                    <span className="weather__icon">{getWeatherIcon(weather.code)}</span>
                    <div>
                      <div className="weather__temp">{weather.temp}°C</div>
                      <div className="weather__desc">{weather.description}</div>
                    </div>
                  </div>
                  <div className="weather__grid">
                    <div className="weather__stat">
                      <span className="weather__stat-label">Feels Like</span>
                      <span className="weather__stat-value">{weather.feels_like}°C</span>
                    </div>
                    <div className="weather__stat">
                      <span className="weather__stat-label">Humidity</span>
                      <span className="weather__stat-value">{weather.humidity}%</span>
                    </div>
                    <div className="weather__stat">
                      <span className="weather__stat-label">Wind</span>
                      <span className="weather__stat-value">{weather.wind} km/h</span>
                    </div>
                    <div className="weather__stat">
                      <span className="weather__stat-label">Location</span>
                      <span className="weather__stat-value">{destination.name}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="weather__unavailable">Weather data unavailable</p>
              )}
            </div>

            <div className="detail__trip-card">
              <h3 className="detail__sidebar-title">Plan a Trip Here</h3>
              <p className="detail__trip-text">
                Add {destination.name} to your travel itinerary and start planning your perfect trip.
              </p>
              <button className="detail__plan-btn" onClick={handlePlanTrip}>
                {user ? '+ Plan This Trip' : 'Login to Plan Trip'}
              </button>
            </div>

            <div className="detail__map-card">
              <h3 className="detail__sidebar-title">Location</h3>
              <div className="detail__coords">
                <div>📍 {destination.lat?.toFixed(4)}°N, {destination.lon?.toFixed(4)}°E</div>
                <div className="detail__coords-name">{destination.name}, {destination.country}</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <TripModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        destination={destination}
      />
    </div>
  );
};

const getAttractionIcon = (kinds = '') => {
  if (kinds.includes('museum')) return '🏛';
  if (kinds.includes('temple') || kinds.includes('church') || kinds.includes('shrine')) return '⛩';
  if (kinds.includes('park') || kinds.includes('nature')) return '🌿';
  if (kinds.includes('tower') || kinds.includes('skyscraper')) return '🗼';
  if (kinds.includes('beach')) return '🏖';
  if (kinds.includes('market')) return '🛍';
  if (kinds.includes('food')) return '🍽';
  if (kinds.includes('historic') || kinds.includes('ruin')) return '🏺';
  return '📍';
};

export default DestinationDetail;
