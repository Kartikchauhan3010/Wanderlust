import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_DESTINATIONS } from '../utils/mockData';
import DestinationCard from '../components/common/DestinationCard';
import { CardSkeleton } from '../components/common/Skeleton';
import './Home.css';

const CATEGORIES = ['All', 'Beach', 'Culture', 'Food', 'Nature', 'Urban', 'History'];

const Home = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDestinations(MOCK_DESTINATIONS);
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter((d) =>
        d.tags?.some((t) => t.toLowerCase() === activeCategory.toLowerCase())
      );

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <div className="hero__badge">✈ Smart Travel Planning</div>
          <h1 className="hero__title">
            Discover the World,<br />
            <span className="hero__title-accent">Plan Your Journey</span>
          </h1>
          <p className="hero__subtitle">
            Explore breathtaking destinations, discover hidden gems, and craft
            perfect itineraries — all in one place.
          </p>
          <div className="hero__actions">
            <button className="hero__btn hero__btn--primary" onClick={() => navigate('/search')}>
              Start Exploring →
            </button>
            <button className="hero__btn hero__btn--secondary" onClick={() => navigate('/dashboard')}>
              My Trips
            </button>
          </div>
          <div className="hero__stats">
            <div className="hero__stat"><strong>150+</strong><span>Destinations</span></div>
            <div className="hero__stat"><strong>10K+</strong><span>Trips Planned</span></div>
            <div className="hero__stat"><strong>4.9★</strong><span>User Rating</span></div>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__img-grid">
            {[
              'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80',
              'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=80',
              'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&q=80',
              'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=300&q=80',
            ].map((src, i) => (
              <img key={i} src={src} alt="" className={`hero__img hero__img--${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="home__featured">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Destinations</h2>
            <button className="section-link" onClick={() => navigate('/search')}>
              View all →
            </button>
          </div>

          <div className="category-filter">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${activeCategory === cat ? 'category-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="dest-grid">
            {loading
              ? Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />)
              : filtered.length > 0
              ? filtered.map((dest) => (
                  <DestinationCard key={dest.xid} destination={dest} />
                ))
              : (
                <div className="home__empty">
                  <p>No destinations found for this category.</p>
                </div>
              )}
          </div>
        </div>
      </section>

      <section className="home__cta">
        <div className="container">
          <div className="cta-card">
            <h2 className="cta-title">Ready for your next adventure?</h2>
            <p className="cta-text">
              Create an account to save your trips, track itineraries, and get personalized recommendations.
            </p>
            <button className="cta-btn" onClick={() => navigate('/register')}>
              Get Started — It's Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
