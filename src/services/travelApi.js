import { MOCK_DESTINATIONS, MOCK_ATTRACTIONS, MOCK_WEATHER } from '../utils/mockData';

const OTM_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY;
const OWM_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const USE_MOCK = !OTM_KEY || OTM_KEY === 'your_opentripmap_api_key_here';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const searchDestinations = async (query) => {
  if (USE_MOCK || !query) {
    await sleep(400);
    const q = query.toLowerCase();
    return MOCK_DESTINATIONS.filter(
      (d) => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
    );
  }
  try {
    const geoRes = await fetch(
      `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(query)}&apikey=${OTM_KEY}`
    );
    const geo = await geoRes.json();
    if (!geo || geo.error) return [];
    return [
      {
        xid: `otm_${geo.name}`,
        name: geo.name,
        country: geo.country,
        description: `Discover ${geo.name}, a wonderful destination in ${geo.country}.`,
        image: `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80`,
        lat: geo.lat,
        lon: geo.lon,
        rating: (Math.random() * 1 + 4).toFixed(1),
        tags: ['explore', 'travel'],
      },
    ];
  } catch {
    return MOCK_DESTINATIONS.filter((d) =>
      d.name.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const getDestinationDetails = async (destination) => {
  if (USE_MOCK) {
    await sleep(300);
    return destination;
  }
  return destination;
};

export const getAttractions = async (destination) => {
  if (USE_MOCK) {
    await sleep(500);
    return MOCK_ATTRACTIONS[destination.xid] || [];
  }
  try {
    const res = await fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${destination.lon}&lat=${destination.lat}&kinds=interesting_places&limit=6&apikey=${OTM_KEY}`
    );
    const data = await res.json();
    return data.features?.map((f) => ({
      name: f.properties.name || 'Unnamed Place',
      kinds: f.properties.kinds,
      preview: { title: f.properties.name },
    })) || [];
  } catch {
    return MOCK_ATTRACTIONS[destination.xid] || [];
  }
};

export const getWeather = async (destination) => {
  if (USE_MOCK || !OWM_KEY || OWM_KEY === 'your_openweather_api_key_here') {
    await sleep(300);
    return MOCK_WEATHER[destination.xid] || {
      temp: Math.floor(Math.random() * 25 + 10),
      feels_like: Math.floor(Math.random() * 25 + 8),
      description: 'Partly Cloudy',
      humidity: Math.floor(Math.random() * 40 + 50),
      wind: Math.floor(Math.random() * 20 + 5),
      code: 801,
    };
  }
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${destination.lat}&lon=${destination.lon}&units=metric&appid=${OWM_KEY}`
    );
    const data = await res.json();
    return {
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed),
      code: data.weather[0].id,
    };
  } catch {
    return MOCK_WEATHER[destination.xid] || { temp: 20, feels_like: 18, description: 'Clear', humidity: 60, wind: 10, code: 800 };
  }
};
