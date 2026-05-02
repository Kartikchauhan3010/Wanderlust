import { useNavigate } from 'react-router-dom';
import './DestinationCard.css';

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();

  return (
    <div
      className="dest-card"
      onClick={() => navigate(`/destination/${destination.xid}`, { state: { destination } })}
    >
      <div className="dest-card__image-wrap">
        <img
          src={destination.image}
          alt={destination.name}
          className="dest-card__image"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80';
          }}
        />
        <div className="dest-card__overlay">
          <span className="dest-card__country">{destination.country}</span>
        </div>
        {destination.rating && (
          <div className="dest-card__rating">
            <span>★</span> {destination.rating}
          </div>
        )}
      </div>
      <div className="dest-card__body">
        <h3 className="dest-card__name">{destination.name}</h3>
        <p className="dest-card__desc">
          {destination.description?.slice(0, 110)}
          {destination.description?.length > 110 ? '…' : ''}
        </p>
        {destination.tags && (
          <div className="dest-card__tags">
            {destination.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="dest-card__tag">{tag}</span>
            ))}
          </div>
        )}
        <button className="dest-card__btn">Explore →</button>
      </div>
    </div>
  );
};

export default DestinationCard;
