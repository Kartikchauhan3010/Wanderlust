import { useState, useEffect } from 'react';
import { useTrips } from '../../context/TripContext';
import { validateTripForm, formatDate, getDaysBetween } from '../../utils/helpers';
import './TripModal.css';

const TripModal = ({ isOpen, onClose, destination, tripToEdit }) => {
  const { addTrip, updateTrip } = useTrips();
  const [form, setForm] = useState({
    name: '',
    destination: null,
    startDate: '',
    endDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (tripToEdit) {
      setForm({
        name: tripToEdit.name,
        destination: tripToEdit.destination,
        startDate: tripToEdit.startDate,
        endDate: tripToEdit.endDate,
        notes: tripToEdit.notes || '',
      });
    } else if (destination) {
      setForm((f) => ({ ...f, destination, name: `Trip to ${destination.name}` }));
    }
  }, [tripToEdit, destination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateTripForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    if (tripToEdit) {
      updateTrip(tripToEdit.id, form);
    } else {
      addTrip(form);
    }
    setSaving(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      setForm({ name: '', destination: null, startDate: '', endDate: '', notes: '' });
    }, 800);
  };

  const days = getDaysBetween(form.startDate, form.endDate);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{tripToEdit ? 'Edit Trip' : 'Plan New Trip'}</h2>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        {form.destination && (
          <div className="modal__dest-preview">
            <img
              src={form.destination.image}
              alt={form.destination.name}
              className="modal__dest-img"
            />
            <div>
              <div className="modal__dest-name">{form.destination.name}</div>
              <div className="modal__dest-country">{form.destination.country}</div>
            </div>
          </div>
        )}

        <form className="modal__form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Trip Name</label>
            <input
              className={`form-input ${errors.name ? 'form-input--error' : ''}`}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Summer Europe Adventure"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                className={`form-input ${errors.startDate ? 'form-input--error' : ''}`}
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.startDate && <span className="form-error">{errors.startDate}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                className={`form-input ${errors.endDate ? 'form-input--error' : ''}`}
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                min={form.startDate || new Date().toISOString().split('T')[0]}
              />
              {errors.endDate && <span className="form-error">{errors.endDate}</span>}
            </div>
          </div>

          {form.startDate && form.endDate && days > 0 && (
            <div className="modal__days-badge">
              🗓 {days} day{days !== 1 ? 's' : ''} — {formatDate(form.startDate)} → {formatDate(form.endDate)}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="form-input form-textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Visa requirements, must-see places, budget notes…"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className={`modal__submit ${success ? 'modal__submit--success' : ''}`}
            disabled={saving || success}
          >
            {success ? '✓ Saved!' : saving ? 'Saving…' : tripToEdit ? 'Update Trip' : 'Save Trip'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TripModal;
