import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../context/TripContext';
import TripModal from '../components/common/TripModal';
import { formatDate, getDaysBetween } from '../utils/helpers';
import { MOCK_DESTINATIONS } from '../utils/mockData';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { trips, deleteTrip } = useTrips();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTrip, setEditTrip] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleEdit = (trip) => {
    setEditTrip(trip);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteTrip(id);
    setDeleteConfirm(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditTrip(null);
  };

  const upcoming = trips.filter((t) => new Date(t.endDate) >= new Date());
  const past = trips.filter((t) => new Date(t.endDate) < new Date());

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard__header">
          <div>
            <h1 className="dashboard__title">My Trips</h1>
            <p className="dashboard__subtitle">
              Welcome back, {user?.name?.split(' ')[0]}! You have {trips.length} trip{trips.length !== 1 ? 's' : ''} planned.
            </p>
          </div>
          <button className="dashboard__new-btn" onClick={() => setModalOpen(true)}>
            + New Trip
          </button>
        </div>

        <div className="dashboard__stats">
          <div className="stat-card">
            <div className="stat-card__value">{trips.length}</div>
            <div className="stat-card__label">Total Trips</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{upcoming.length}</div>
            <div className="stat-card__label">Upcoming</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">{past.length}</div>
            <div className="stat-card__label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value">
              {trips.reduce((acc, t) => acc + getDaysBetween(t.startDate, t.endDate), 0)}
            </div>
            <div className="stat-card__label">Days Planned</div>
          </div>
        </div>

        {trips.length === 0 ? (
          <div className="dashboard__empty">
            <div className="dashboard__empty-icon">🗺️</div>
            <h3>No trips yet!</h3>
            <p>Start planning your first adventure. Search for a destination and add it to your itinerary.</p>
            <div className="dashboard__empty-actions">
              <button className="dashboard__explore-btn" onClick={() => navigate('/search')}>
                Explore Destinations
              </button>
              <button className="dashboard__new-btn" onClick={() => setModalOpen(true)}>
                + Create Trip
              </button>
            </div>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <section className="dashboard__section">
                <h2 className="dashboard__section-title">Upcoming Trips</h2>
                <div className="trips-grid">
                  {upcoming.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      onEdit={handleEdit}
                      onDelete={(id) => setDeleteConfirm(id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section className="dashboard__section">
                <h2 className="dashboard__section-title">Past Trips</h2>
                <div className="trips-grid">
                  {past.map((trip) => (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      onEdit={handleEdit}
                      onDelete={(id) => setDeleteConfirm(id)}
                      past
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <TripModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        tripToEdit={editTrip}
        destination={editTrip ? null : MOCK_DESTINATIONS[0]}
      />

      {deleteConfirm && (
        <div className="delete-modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Trip?</h3>
            <p>This action cannot be undone. Are you sure you want to delete this trip?</p>
            <div className="delete-modal__actions">
              <button className="delete-modal__cancel" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="delete-modal__confirm" onClick={() => handleDelete(deleteConfirm)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TripCard = ({ trip, onEdit, onDelete, past }) => {
  const days = getDaysBetween(trip.startDate, trip.endDate);
  const dest = trip.destination;

  return (
    <div className={`trip-card ${past ? 'trip-card--past' : ''}`}>
      {dest?.image && (
        <div className="trip-card__img-wrap">
          <img
            src={dest.image}
            alt={dest.name}
            className="trip-card__img"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {past && <div className="trip-card__completed-badge">✓ Completed</div>}
        </div>
      )}
      <div className="trip-card__body">
        <div className="trip-card__header">
          <h3 className="trip-card__name">{trip.name}</h3>
          <div className="trip-card__actions">
            <button className="trip-card__btn trip-card__btn--edit" onClick={() => onEdit(trip)} title="Edit">
              ✏️
            </button>
            <button className="trip-card__btn trip-card__btn--delete" onClick={() => onDelete(trip.id)} title="Delete">
              🗑
            </button>
          </div>
        </div>

        {dest && (
          <div className="trip-card__dest">
            📍 {dest.name}, {dest.country}
          </div>
        )}

        <div className="trip-card__dates">
          <div className="trip-card__date-block">
            <span className="trip-card__date-label">Departure</span>
            <span className="trip-card__date-value">{formatDate(trip.startDate)}</span>
          </div>
          <div className="trip-card__arrow">→</div>
          <div className="trip-card__date-block">
            <span className="trip-card__date-label">Return</span>
            <span className="trip-card__date-value">{formatDate(trip.endDate)}</span>
          </div>
        </div>

        <div className="trip-card__footer">
          <span className="trip-card__days">{days} day{days !== 1 ? 's' : ''}</span>
          {trip.notes && (
            <span className="trip-card__notes" title={trip.notes}>
              📝 Notes
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
