export const MOCK_DESTINATIONS = [
  {
    xid: 'mock_paris',
    name: 'Paris',
    country: 'France',
    description:
      "Paris, the City of Light, is France's capital and a global hub of art, fashion, gastronomy, and culture. With iconic landmarks like the Eiffel Tower, the Louvre, and Notre-Dame Cathedral, Paris enchants millions of visitors each year with its unmatched elegance and romance.",
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    lat: 48.8566,
    lon: 2.3522,
    rating: 4.9,
    tags: ['culture', 'art', 'romance', 'food'],
  },
  {
    xid: 'mock_tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description:
      "Tokyo, Japan's bustling capital, mixes ultramodern and traditional elements, from neon-lit skyscrapers and anime shops to historic temples and traditional tea houses. A world-class city that never sleeps, offering extraordinary cuisine, cutting-edge technology, and vibrant pop culture.",
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80',
    lat: 35.6762,
    lon: 139.6503,
    rating: 4.8,
    tags: ['technology', 'culture', 'food', 'urban'],
  },
  {
    xid: 'mock_nyc',
    name: 'New York City',
    country: 'United States',
    description:
      "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial, and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park.",
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    lat: 40.7128,
    lon: -74.006,
    rating: 4.7,
    tags: ['urban', 'culture', 'food', 'art'],
  },
  {
    xid: 'mock_bali',
    name: 'Bali',
    country: 'Indonesia',
    description:
      "Bali is a living postcard—an Indonesian paradise that feels like a fantasy. Aside from a cacophony of sound and color, there's an essence of peaceful harmony that is difficult to describe. From terraced rice fields and volcanic mountains to pristine beaches and coral reefs, Bali is a sensory overload in the best possible way.",
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    lat: -8.4095,
    lon: 115.1889,
    rating: 4.8,
    tags: ['beach', 'nature', 'culture', 'spiritual'],
  },
  {
    xid: 'mock_rome',
    name: 'Rome',
    country: 'Italy',
    description:
      "Rome, Italy's capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture, and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire. The Vatican City, headquarters of the Roman Catholic Church, features St. Peter's Basilica and the Vatican Museums.",
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    lat: 41.9028,
    lon: 12.4964,
    rating: 4.7,
    tags: ['history', 'art', 'food', 'architecture'],
  },
  {
    xid: 'mock_dubai',
    name: 'Dubai',
    country: 'UAE',
    description:
      "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture, and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline. At its foot, the Dubai Fountain system choreographs jets and lights to music. On the coast is Atlantis, The Palm, a resort with a waterpark and a major aquarium.",
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    lat: 25.2048,
    lon: 55.2708,
    rating: 4.6,
    tags: ['luxury', 'shopping', 'modern', 'desert'],
  },
];

export const MOCK_ATTRACTIONS = {
  mock_paris: [
    { name: 'Eiffel Tower', kinds: 'historic,towers', preview: { title: 'Eiffel Tower' } },
    { name: 'The Louvre', kinds: 'museums,art', preview: { title: 'The Louvre' } },
    { name: 'Notre-Dame Cathedral', kinds: 'churches,historic', preview: { title: 'Notre-Dame' } },
    { name: 'Arc de Triomphe', kinds: 'historic,monuments', preview: { title: 'Arc de Triomphe' } },
    { name: 'Musée d\'Orsay', kinds: 'museums,art', preview: { title: 'Musée d\'Orsay' } },
    { name: 'Sacré-Cœur Basilica', kinds: 'churches,panoramas', preview: { title: 'Sacré-Cœur' } },
  ],
  mock_tokyo: [
    { name: 'Senso-ji Temple', kinds: 'temples,historic', preview: { title: 'Senso-ji' } },
    { name: 'Tokyo Skytree', kinds: 'towers,panoramas', preview: { title: 'Tokyo Skytree' } },
    { name: 'Shibuya Crossing', kinds: 'urban,famous_places', preview: { title: 'Shibuya Crossing' } },
    { name: 'teamLab Planets', kinds: 'museums,art', preview: { title: 'teamLab' } },
    { name: 'Meiji Shrine', kinds: 'shrines,nature', preview: { title: 'Meiji Shrine' } },
    { name: 'Tsukiji Fish Market', kinds: 'markets,food', preview: { title: 'Tsukiji Market' } },
  ],
  mock_nyc: [
    { name: 'Statue of Liberty', kinds: 'historic,monuments', preview: { title: 'Statue of Liberty' } },
    { name: 'Central Park', kinds: 'parks,nature', preview: { title: 'Central Park' } },
    { name: 'Empire State Building', kinds: 'towers,panoramas', preview: { title: 'Empire State Building' } },
    { name: 'Metropolitan Museum', kinds: 'museums,art', preview: { title: 'The Met' } },
    { name: 'Brooklyn Bridge', kinds: 'historic,architecture', preview: { title: 'Brooklyn Bridge' } },
    { name: 'Times Square', kinds: 'urban,famous_places', preview: { title: 'Times Square' } },
  ],
  mock_bali: [
    { name: 'Tanah Lot Temple', kinds: 'temples,historic', preview: { title: 'Tanah Lot' } },
    { name: 'Tegallalang Rice Terraces', kinds: 'nature,panoramas', preview: { title: 'Tegallalang' } },
    { name: 'Ubud Monkey Forest', kinds: 'nature,parks', preview: { title: 'Monkey Forest' } },
    { name: 'Kuta Beach', kinds: 'beaches,nature', preview: { title: 'Kuta Beach' } },
    { name: 'Mount Batur', kinds: 'nature,volcanoes', preview: { title: 'Mount Batur' } },
    { name: 'Tirta Empul Temple', kinds: 'temples,spiritual', preview: { title: 'Tirta Empul' } },
  ],
  mock_rome: [
    { name: 'Colosseum', kinds: 'historic,amphitheaters', preview: { title: 'Colosseum' } },
    { name: 'Vatican Museums', kinds: 'museums,art', preview: { title: 'Vatican Museums' } },
    { name: 'Trevi Fountain', kinds: 'historic,fountains', preview: { title: 'Trevi Fountain' } },
    { name: 'Roman Forum', kinds: 'historic,ruins', preview: { title: 'Roman Forum' } },
    { name: 'Pantheon', kinds: 'historic,architecture', preview: { title: 'Pantheon' } },
    { name: 'Borghese Gallery', kinds: 'museums,art', preview: { title: 'Borghese Gallery' } },
  ],
  mock_dubai: [
    { name: 'Burj Khalifa', kinds: 'towers,panoramas', preview: { title: 'Burj Khalifa' } },
    { name: 'Dubai Mall', kinds: 'shopping,urban', preview: { title: 'Dubai Mall' } },
    { name: 'Palm Jumeirah', kinds: 'architecture,famous_places', preview: { title: 'Palm Jumeirah' } },
    { name: 'Desert Safari', kinds: 'nature,adventure', preview: { title: 'Desert Safari' } },
    { name: 'Dubai Frame', kinds: 'architecture,panoramas', preview: { title: 'Dubai Frame' } },
    { name: 'Gold Souk', kinds: 'markets,shopping', preview: { title: 'Gold Souk' } },
  ],
};

export const MOCK_WEATHER = {
  mock_paris: { temp: 18, feels_like: 16, description: 'Partly Cloudy', humidity: 72, wind: 12, code: 801 },
  mock_tokyo: { temp: 22, feels_like: 21, description: 'Clear Sky', humidity: 65, wind: 8, code: 800 },
  mock_nyc: { temp: 15, feels_like: 13, description: 'Light Rain', humidity: 80, wind: 18, code: 500 },
  mock_bali: { temp: 30, feels_like: 34, description: 'Tropical Shower', humidity: 85, wind: 10, code: 521 },
  mock_rome: { temp: 25, feels_like: 24, description: 'Sunny', humidity: 55, wind: 7, code: 800 },
  mock_dubai: { temp: 38, feels_like: 42, description: 'Hot & Clear', humidity: 40, wind: 15, code: 800 },
};
