export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const getDaysBetween = (start, end) => {
  if (!start || !end) return 0;
  const ms = new Date(end) - new Date(start);
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)) + 1);
};

export const generateId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const getWeatherIcon = (code) => {
  if (!code) return '🌤';
  if (code < 300) return '⛈';
  if (code < 400) return '🌦';
  if (code < 600) return '🌧';
  if (code < 700) return '❄';
  if (code < 800) return '🌫';
  if (code === 800) return '☀';
  return '⛅';
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email format';
  if (!password) errors.password = 'Password is required';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
  return errors;
};

export const validateTripForm = ({ name, destination, startDate, endDate }) => {
  const errors = {};
  if (!name || !name.trim()) errors.name = 'Trip name is required';
  if (!destination) errors.destination = 'Destination is required';
  if (!startDate) errors.startDate = 'Start date is required';
  if (!endDate) errors.endDate = 'End date is required';
  if (startDate && endDate && new Date(endDate) < new Date(startDate))
    errors.endDate = 'End date must be after start date';
  return errors;
};
