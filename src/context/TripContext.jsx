import { createContext, useContext, useState, useEffect } from 'react';
import { generateId } from '../utils/helpers';

const TripContext = createContext(null);

const AUTH_KEY = 'stp_user';
const storageKey = (userId) => `stp_trips_${userId}`;

const getCurrentUserId = () => {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) return JSON.parse(stored)?.id || null;
  } catch {}
  return null;
};

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [userId, setUserId] = useState(() => getCurrentUserId());

  useEffect(() => {
    const interval = setInterval(() => {
      const id = getCurrentUserId();
      setUserId((prev) => (prev !== id ? id : prev));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!userId) {
      setTrips([]);
      return;
    }
    try {
      const stored = localStorage.getItem(storageKey(userId));
      setTrips(stored ? JSON.parse(stored) : []);
    } catch {
      setTrips([]);
    }
  }, [userId]);

  const persist = (data) => {
    const id = getCurrentUserId();
    if (id) localStorage.setItem(storageKey(id), JSON.stringify(data));
  };

  const addTrip = (tripData) => {
    const newTrip = { id: generateId(), ...tripData, createdAt: new Date().toISOString() };
    const updated = [newTrip, ...trips];
    setTrips(updated);
    persist(updated);
    return newTrip;
  };

  const updateTrip = (id, tripData) => {
    const updated = trips.map((t) =>
      t.id === id ? { ...t, ...tripData, updatedAt: new Date().toISOString() } : t
    );
    setTrips(updated);
    persist(updated);
  };

  const deleteTrip = (id) => {
    const updated = trips.filter((t) => t.id !== id);
    setTrips(updated);
    persist(updated);
  };

  const getTripById = (id) => trips.find((t) => t.id === id);

  return (
    <TripContext.Provider value={{ trips, addTrip, updateTrip, deleteTrip, getTripById }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrips must be used inside TripProvider');
  return ctx;
};
